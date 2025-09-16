window.addEventListener("load", main);

const filmeId = new URLSearchParams(window.location.search).get('id')



function main() {
    document.getElementsByClassName('estrelas')[0].addEventListener('click', () => {
        const botao = document.getElementsByTagName('button')[0]
        botao.style = 'background-color: #101a72; cursor: pointer;'
        botao.removeAttribute('title')
        botao.disabled = false
    })

    carregarFilme()

    enviarAvaliacao()
    
    carregarComentarios()

}

async function carregarFilme() {
    const local = document.getElementById("filme-avaliado");

    const response = await fetch(`/api/filme/${filmeId}`);
    const dado = await response.json();

    const filme = dado;

    renderizarFilme(local, filme);

    tituloPagina(filme);

    const qt = document.getElementById('qtcoment')
    qt.textContent = filme.qt_avaliacoes
}

function renderizarFilme(local, filme) {
    const divFilme = document.createElement("div");
    const imgCapa = document.createElement("img");
    const divTextos = document.createElement("div");
    const titulo = document.createElement("h1");
    const divInformacoes = document.createElement("div");
    const divInfo1 = document.createElement("div");
    const genero = document.createElement("p");
    const direcao = document.createElement("p");
    const avaliacoes = document.createElement("p");
    const nota = document.createElement("p");
    const estrelas = renderizarEstrelas(filme.nota);
    const divSinopse = document.createElement("div");
    const labelSinopse = document.createElement("p");
    const sinopse = document.createElement("p");

    divFilme.id = `filme-${filme.id}`;
    imgCapa.src = filme.img; imgCapa.alt = "capa do filme";
    titulo.textContent = filme.titulo;
    genero.textContent = `Genero: ${filme.genero}`;
    direcao.textContent = `Direção: ${filme.direcao}`;
    avaliacoes.textContent = `Avaliações: ${filme.qt_avaliacoes}`;
    nota.textContent = `Nota: ${filme.nota}`;
    labelSinopse.textContent = "Sinopse:";
    sinopse.textContent = filme.sinopse;

    divFilme.classList.add("filme");
    imgCapa.classList.add("capa");
    divTextos.classList.add("textos");
    divInformacoes.classList.add("informacoes");
    divInfo1.classList.add("dados");
    divSinopse.classList.add("sinopse");

    divSinopse.appendChild(labelSinopse);
    divSinopse.appendChild(sinopse);
    divInfo1.appendChild(genero)
    divInfo1.appendChild(direcao)
    divInfo1.appendChild(avaliacoes)
    divInfo1.appendChild(nota)
    divInfo1.appendChild(estrelas)
    divInformacoes.appendChild(divInfo1)
    divInformacoes.appendChild(divSinopse)
    divTextos.appendChild(titulo)
    divTextos.appendChild(divInformacoes)
    divFilme.appendChild(imgCapa)
    divFilme.appendChild(divTextos)

    local.appendChild(divFilme)
}

function enviarAvaliacao() {
    const form = document.getElementById("form-avalia")
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const campoNota = document.querySelector('input[name = nota]:checked')
        
        if (campoNota) {
            if (token) {
                const userid = decodificarToken(token).userid
                const nota = campoNota.value
                const comentario = document.getElementById('texto-comentario').value
                
                
                const response = await fetch('/api/filme/avalia', {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({'userid': userid, 'filmeId': filmeId, 'nota': nota, 'comentario': comentario})
                })
                
                const result = await response.json()
                
                alert(result.message)
                
                window.location.reload()
                
            } else {
                if (confirm('Precisa está logado para avaliar!\nDeseja logar agora?')) {
                    window.location.href = `minhaconta.html?url=${window.location.href.split('/')[3]}`
                }
            }
        } else {

        }
    })
}

function tituloPagina(filme) {  
    const titulo =`SAF: ${filme.titulo}`
    document.title = titulo;
}

async function carregarComentarios() {
    const local = document.getElementById("comentarios");

    const response = await fetch(`/api/filme/comentarios/${filmeId}`)
    const dado = await response.json();

    const comentarios = dado;

    if (comentarios.length) {
        for (const comentario of comentarios) {
            renderizarComentarios(local, comentario)
        }
    } else {
        const divComentario = document.createElement("div");
        const qComentario = document.createElement("q");

        qComentario.textContent = comentarios.message;
        qComentario.style = 'margin: 0;padding: 10px; text-align: center;'
        divComentario.style = 'align-items: center;justify-content: center;'

        divComentario.classList.add("comentario");

        divComentario.appendChild(qComentario);

        local.appendChild(divComentario);
    }

}

function renderizarComentarios(local, comentario) {
    const divComentario = document.createElement("div");
    const divUser = document.createElement("div");
    const imgUser = document.createElement("img");
    const h2User = document.createElement("h2");
    const estrelas = renderizarEstrelas(comentario.nota);
    const qComentario = document.createElement("q");

    imgUser.id = "icon-user"; imgUser.src = "img/avaliacao/user.png";
    h2User.textContent = `${comentario.nome}:`;
    qComentario.textContent = comentario.comentario;

    divComentario.classList.add("comentario");
    divUser.classList.add("user");
    estrelas.classList.add("stars-coment")

    divUser.appendChild(imgUser);
    divUser.appendChild(h2User);
    divComentario.appendChild(divUser);
    divComentario.appendChild(estrelas);
    divComentario.appendChild(qComentario);

    local.appendChild(divComentario);
}

function renderizarEstrelas(nota) {
    const divEstrelas = document.createElement("div");
    
    divEstrelas.classList.add("stars");

    for(let i = 1; i <= 5; i++) {
        const estrela = document.createElement("div")
        estrela.classList.add("estrela")

        const estrelaCheia = document.createElement("div")
        estrelaCheia.classList.add("estrela-cheia")
        
        if(i <= Math.floor(nota)) {
            estrelaCheia.style.width = "100%";
        } else if (i == Math.ceil(nota)) {            
            estrelaCheia.style.width = `${(nota - Math.floor(nota)) * 100}%`
        } else {
            estrelaCheia.style.width = "0%";
        }

        estrela.appendChild(estrelaCheia)
        divEstrelas.appendChild(estrela)
    }

    return divEstrelas;
}