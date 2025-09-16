import {db} from '../database/db.js'

async function obterLancamentos(req, res) {
    const filmes = await db.all('SELECT * FROM filmes ORDER BY data_adicao DESC LIMIT 6');
    for (const filme of filmes) {
        if (filme.nota == 0) filme.nota = '-'; 
    }
    return res.status(200).json(filmes);
}

async function obterRaking(req, res) {
    const limite = req.params.limite
    const filmes = await db.all('SELECT * FROM filmes ORDER BY nota DESC, qt_avaliacoes DESC LIMIT 10');
    for (let x = 0; x < filmes.length; x++) {
        if (filmes[x].nota == 0) filmes[x].nota = '-'; 
        filmes[x] = await carregarGenero(filmes[x]);
    }

    return res.status(200).json(filmes);
}

async function carregarGenero(filme) {
    const dados = await db.all(`SELECT nomegenero from genero_filme WHERE idfilme = ?`, [filme.id])
    let generos = dados.map(i => i.nomegenero)
    generos = generos.join(", ")
    filme.genero = generos
    return filme
}

async function obterFilme(req, res) {
    const id = req.params.id;
    let filme = await db.get(`SELECT * FROM filmes WHERE id = ?`, [id]);
    if (filme.nota == 0) filme.nota = '-'; 
    filme = await carregarGenero(filme)
    return res.status(200).json(filme);
}

async function obterCategoria(req, res) {
    const categoria = req.params.categoria
    const filmes = await db.all(`SELECT id, img, titulo, nota, nomegenero FROM filmes INNER JOIN genero_filme ON idfilme = filmes.id WHERE nomegenero = ?`, [categoria])
    for (const filme of filmes) {
        if (filme.nota == 0) filme.nota = '-'; 
    }
    return res.status(200).json(filmes)
}

async function avaliarFilme(req, res) {
    const {userid, filmeId, nota, comentario} = req.body
    
    const atualizarFilmeAvaliado = async function () {
        const pesquisaMedia = await db.get('SELECT avg(nota) as media FROM avaliacoes WHERE id_filme = ?', [filmeId])
        const media = pesquisaMedia.media.toFixed(1)
        const qt = await db.get('SELECT count(id_filme) as qt FROM avaliacoes WHERE id_filme = ?', [filmeId])
        await db.run('UPDATE filmes SET nota = ?, qt_avaliacoes = ? WHERE id = ?', [media, qt.qt, filmeId])
    }

    const insert = await db.run('INSERT OR IGNORE INTO avaliacoes (id_filme, id_usuario, nota, comentario) VALUES (?, ?, ?, ?)', [filmeId, userid, nota, comentario])
    if (insert.changes) {
        atualizarFilmeAvaliado()
        return res.status(201).json({message: 'Avaliado com sucesso!'})
    } else {
        await db.run('UPDATE avaliacoes SET nota = ?, comentario = ? WHERE id_filme = ? AND id_usuario = ?', [nota, comentario, filmeId, userid])
        atualizarFilmeAvaliado()
        return res.status(200).json({message: 'Avaliação atualizada!'})
    }   
}

async function buscarFilmes(req, res) {
    const titulo = req.params.titulo
    const filmes = await db.all(`SELECT id, img, titulo, nota FROM filmes WHERE titulo LIKE ?`, [`%${titulo}%`])
    return res.status(200).json(filmes)
}

async function obterComentarios(req, res) {
    const idFilme = req.params.id;
    
    const comentarios = await db.all(`SELECT u.nome, a.nota, a.comentario FROM avaliacoes as a INNER JOIN usuarios as u ON a.id_usuario = u.id WHERE id_filme = ?`, [idFilme]);    

    if(comentarios.length) {
        return res.status(200).json(comentarios)
    } else {
        return res.status(200).json({ message: "Sem avaliações"})
    }
}

export {
    obterLancamentos, obterRaking, obterFilme, obterCategoria, avaliarFilme, buscarFilmes, obterComentarios
};