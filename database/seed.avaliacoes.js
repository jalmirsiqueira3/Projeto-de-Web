import { db } from "./db.js";

const avaliacoes = [
    { id_filme: 5, id_usuario: 11, nota: 4, comentario: 'Um bom filme.' },
    {
      id_filme: 15,
      id_usuario: 12,
      nota: 4,
      comentario: 'Tem um roteiro interessante.'
    },
    {
      id_filme: 11,
      id_usuario: 12,
      nota: 5,
      comentario: 'Uma obra prima, aguardei ansiosamente para ver esse filme.'
    },
    {
      id_filme: 9,
      id_usuario: 12,
      nota: 4,
      comentario: 'Gostei bastante. Um filme longo mais com um roteiro que prende bastante a nossa atenção.'
    },
    {
      id_filme: 12,
      id_usuario: 12,
      nota: 2,
      comentario: 'Só assisti para fazer companhia a meu filho, mas não gosto, os personagens gritam mais do que lutam. kkk'
    },
    {
      id_filme: 14,
      id_usuario: 12,
      nota: 1,
      comentario: 'Não curto esse tipo de história, tentei assistir esse filme, mas é uma história que foge muito da realidade. Prefiro coisas mais próximas da realidade.'
    },
    {
      id_filme: 10,
      id_usuario: 12,
      nota: 3,
      comentario: 'Os atores poderiam interpretar melhor.'
    },
    {
      id_filme: 15,
      id_usuario: 11,
      nota: 5,
      comentario: 'Amo os filmes da Marvel, gosto muito do personagem Capitão America. É um filme fantástico.'
    },
    {
      id_filme: 29,
      id_usuario: 11,
      nota: 4,
      comentario: 'O filme foi legal até, mas eu esperava bem mais. A Marvel já foi bem mais do que isso, acho que todos concordam'
    },
    {
      id_filme: 26,
      id_usuario: 11,
      nota: 5,
      comentario: 'Esse foi o último trabalho do grande Akira Toriyama, é uma honra assistir, também posso afirmar que é muito superior a Dragon Ball Super.'
    },
    {
      id_filme: 12,
      id_usuario: 11,
      nota: 5,
      comentario: 'Um dos melhores filmes da história, apenas.'
    },
    { id_filme: 1, id_usuario: 11, nota: 4, comentario: '' },
    {
      id_filme: 23,
      id_usuario: 11,
      nota: 3,
      comentario: 'Alien já foi bem mais do que isso!'
    },
    {
      id_filme: 6,
      id_usuario: 11,
      nota: 4,
      comentario: 'Um verdadeiro clássico dos filmes de terror'
    },
    {
      id_filme: 8,
      id_usuario: 7,
      nota: 5,
      comentario: 'Um dos melhores filmes brasileiros da história, sempre me tira várias risadas, muito bom kkk'
    },
    {
      id_filme: 15,
      id_usuario: 7,
      nota: 4,
      comentario: 'chorei igual criança kkkk'
    },
    {
      id_filme: 2,
      id_usuario: 7,
      nota: 5,
      comentario: 'Romance de qualidade e história com viagem no tempo. Genial'
    },
    {
      id_filme: 1,
      id_usuario: 7,
      nota: 4,
      comentario: 'Aquiiiiii é clásico meus amigos'
    },
    { id_filme: 16, id_usuario: 7, nota: 4, comentario: '' },
    {
      id_filme: 14,
      id_usuario: 7,
      nota: 5,
      comentario: 'Essa trilogia é lendária demais, esse foi o que mais me marcou, que filme senhores!'
    },
    { id_filme: 22, id_usuario: 7, nota: 4, comentario: '' },
    {
      id_filme: 21,
      id_usuario: 7,
      nota: 4,
      comentario: 'clássico demais'
    },
    { id_filme: 24, id_usuario: 7, nota: 5, comentario: 'filmaço' },
    {
      id_filme: 27,
      id_usuario: 7,
      nota: 3,
      comentario: 'filme bom pra passsar o tempo'
    },
    {
      id_filme: 27,
      id_usuario: 8,
      nota: 5,
      comentario: 'filme de macho esse aqui'
    },
    {
      id_filme: 28,
      id_usuario: 8,
      nota: 1,
      comentario: 'nao gosto de desenho'
    },
    {
      id_filme: 25,
      id_usuario: 8,
      nota: 3,
      comentario: 'o primeiro era muito melhor'
    },
    { id_filme: 29, id_usuario: 8, nota: 4, comentario: 'é bom' },
    {
      id_filme: 17,
      id_usuario: 8,
      nota: 4,
      comentario: 'bom demais esse filme do palhaço'
    },
    {
      id_filme: 7,
      id_usuario: 8,
      nota: 2,
      comentario: 'não gosto mt de filmes de romance'
    },
    {
      id_filme: 8,
      id_usuario: 8,
      nota: 5,
      comentario: 'esse joão grilo mente demais hahaha'
    },
    { id_filme: 0, id_usuario: 8, nota: 5, comentario: 'topado demais' },
    {
      id_filme: 12,
      id_usuario: 9,
      nota: 4,
      comentario: 'Esse é um filme excelente, porém não é o auge da franquia, considero o mais fraco da trilogia, principalmente na parte da ação'
    },
    {
      id_filme: 14,
      id_usuario: 9,
      nota: 5,
      comentario: 'O melhor da trilogia, um dos filmes mais bem produzidos da história, esse merece nota máxima!'
    },
    {
      id_filme: 26,
      id_usuario: 9,
      nota: 3,
      comentario: 'muitas pessoas estão colocando lá em cima por causa do saudosismo, poderia ser melhor!'
    },
    {
      id_filme: 29,
      id_usuario: 9,
      nota: 2,
      comentario: 'Nada demais, os filmes da marvel já não mostram muita qualidade faz um tempo...'
    },
    {
      id_filme: 28,
      id_usuario: 9,
      nota: 5,
      comentario: 'Visualmente é fenomenal, o cinema está precisando desse tipo de coisa, uma fuga dos padrões.'
    },
    {
      id_filme: 24,
      id_usuario: 9,
      nota: 4,
      comentario: 'É um filme muito interesssante sobre um período da história que precisa ser falado!'
    },
    {
      id_filme: 7,
      id_usuario: 9,
      nota: 4,
      comentario: 'um bom filme para o que se propõe.'
    },
    { id_filme: 10, id_usuario: 9, nota: 4, comentario: '' },
    {
      id_filme: 4,
      id_usuario: 9,
      nota: 5,
      comentario: 'Esse filme é um absurdo, que direção genial e abordagem de temas incríveis, mas que quase nunca são feitas.'
    },
    {
      id_filme: 9,
      id_usuario: 9,
      nota: 5,
      comentario: 'Christopher Nolan é genial.'
    },
    { id_filme: 5, id_usuario: 9, nota: 5, comentario: '' },
    {
      id_filme: 18,
      id_usuario: 9,
      nota: 3,
      comentario: 'um bom filme, mas poderia ter adaptado melhor.'
    },
    {
      id_filme: 11,
      id_usuario: 9,
      nota: 4,
      comentario: 'Um clássico das animações.'
    },
    {
      id_filme: 2,
      id_usuario: 9,
      nota: 4,
      comentario: 'Essa animação é excelente, raro de se encontrar toda essa qualidade atualmente.'
    },
    {
      id_filme: 20,
      id_usuario: 9,
      nota: 4,
      comentario: 'Dos filmes de heróis que já assisti, esse foi o melhor, não é um absurdo, mas entrega muito.'
    },
    {
      id_filme: 19,
      id_usuario: 9,
      nota: 4,
      comentario: 'Um filme muito bom e tendo uma das atuações mais incríveis que já vi, Heath Ledger fez história!'
    },
    {
      id_filme: 13,
      id_usuario: 9,
      nota: 4,
      comentario: 'Excelente, da trilogia esse filmes talvez tenha as melhores cenas de ação, além de que a história flui muito bem, era um filme impressionante naquela época e até hoje. '
    },
    {
      id_filme: 23,
      id_usuario: 9,
      nota: 3,
      comentario: 'não é como os clássicos...'
    },
    {
      id_filme: 17,
      id_usuario: 9,
      nota: 4,
      comentario: 'Uma boa adaptação.'
    },
    {
      id_filme: 8,
      id_usuario: 9,
      nota: 4,
      comentario: 'Acima da maioria dos filmes brasileiros, além de ter ótimas piadas, Ariano Suassuna era um gênio...'
    },
    { id_filme: 3, id_usuario: 9, nota: 4, comentario: '' },
    { id_filme: 16, id_usuario: 9, nota: 3, comentario: '' },
    { id_filme: 21, id_usuario: 9, nota: 4, comentario: '' },
    {
      id_filme: 0,
      id_usuario: 9,
      nota: 5,
      comentario: 'excelente clássico...'
    },
    { id_filme: 7, id_usuario: 10, nota: 4, comentario: '' },
    { id_filme: 22, id_usuario: 10, nota: 4, comentario: '' },
    { id_filme: 20, id_usuario: 10, nota: 5, comentario: '' },
    { id_filme: 10, id_usuario: 10, nota: 3, comentario: '' },
    { id_filme: 1, id_usuario: 10, nota: 4, comentario: '' },
    { id_filme: 19, id_usuario: 10, nota: 4, comentario: '' },
    {
      id_filme: 15,
      id_usuario: 10,
      nota: 5,
      comentario: 'chorei tanto vendo esse filme, que história...'
    },
    { id_filme: 2, id_usuario: 10, nota: 4, comentario: '' },
    {
      id_filme: 12,
      id_usuario: 10,
      nota: 3,
      comentario: 'a história é muito longa e cansativa... mas até que é bom.'
    },
    {
      id_filme: 14,
      id_usuario: 10,
      nota: 5,
      comentario: 'Esse foi o que mais gostei da trilogia.'
    },
    {
      id_filme: 4,
      id_usuario: 10,
      nota: 5,
      comentario: 'Não gosto tanto de astronomia, mas esse filmes mesmo assim chamou minha atenção... gostei kkk'
    },
    { id_filme: 23, id_usuario: 10, nota: 4, comentario: 'é legal' },
    {
      id_filme: 28,
      id_usuario: 10,
      nota: 4,
      comentario: 'Achei MUITO fofo kkkk, adoro gatos.'
    },
    {
      id_filme: 11,
      id_usuario: 10,
      nota: 4,
      comentario: 'gosto bastante, me faz lembrar da minha infância...'
    },
    {
      id_filme: 27,
      id_usuario: 10,
      nota: 3,
      comentario: 'não gosto desse tipo de filme...'
    },
    {
      id_filme: 25,
      id_usuario: 10,
      nota: 4,
      comentario: 'foi divertido de se assistir, mas o primeiro é melhor.'
    }
]

for(const avaliacao of avaliacoes) {
    await db.run(`INSERT INTO avaliacoes (id_filme, id_usuario, nota, comentario) VALUES(?, ?, ?, ?)`, [avaliacao.id_filme, avaliacao.id_usuario, avaliacao.nota, avaliacao.comentario])
    const pesquisaMedia = await db.get('SELECT avg(nota) as media FROM avaliacoes WHERE id_filme = ?', [avaliacao.id_filme])
    const media = pesquisaMedia.media.toFixed(1)
    const qt = await db.get('SELECT count(id_filme) as qt FROM avaliacoes WHERE id_filme = ?', [avaliacao.id_filme])
    await db.run('UPDATE filmes SET nota = ?, qt_avaliacoes = ? WHERE id = ?', [media, qt.qt, avaliacao.id_filme])
}
console.log('avaliações inserirdas');
