window.addEventListener("load", main);

async function main() {
    const conteudo = document.getElementsByClassName("conteudo")[0];

    const response = await fetch("/api/filmes/ranking")
    const dados = await response.json()

    const filmes = dados;

    for (let x = 0; x < filmes.length; x++) {
        renderizarFilmes(conteudo, filmes[x], (x+1))
    }

    console.log("renderizando...")
}

function renderizarFilmes(local, filme, posicao) {
    const div = document.createElement("div");
    const colocacao = document.createElement("h3");
    const avaliacao1 = document.createElement("a")
    const capa = document.createElement("img");
    const avaliacao2 = document.createElement("a")
    const titulo = document.createElement("h1");
    const textos = document.createElement("div");
    const informacoes = document.createElement("div")
    const dados = document.createElement("div")
    const genero = document.createElement("p")
    const direcao = document.createElement("p")
    const avaliacoes = document.createElement("p")
    const nota = document.createElement("p")
    const estrelas = renderizarEstrelas(filme.nota)
    const botao = document.createElement("button");
    const divSinopse = document.createElement("div")
    const labelSinopse = document.createElement("p")
    const sinopse = document.createElement("p");

    div.id = `filme-${filme.id}`
    colocacao.textContent = posicao;
    capa.src = filme.img; capa.alt = "capa do filme";
    titulo.textContent = filme.titulo;
    textos.id = "textos"
    genero.textContent = `Gênero: ${filme.genero}`;
    direcao.textContent = `Direção: ${filme.direcao}`;
    avaliacoes.textContent = `Avaliações: ${filme.qt_avaliacoes} `;
    nota.textContent = `Nota: ${filme.nota}`;
    botao.textContent = "Avaliar"
    labelSinopse.textContent = "Sinopse:";
    sinopse.textContent = `${filme.sinopse}`;
    
    div.classList.add("filme")
    capa.classList.add("capa")
    titulo.classList.add("titulo")
    informacoes.classList.add("informacoes")
    dados.classList.add("dados")
    estrelas.classList.add("estrelas");
    divSinopse.classList.add("sinopse")

    div.appendChild(colocacao)
    div.appendChild(avaliacao1)
    div.appendChild(textos);
    avaliacao1.appendChild(capa);
    avaliacao2.appendChild(titulo);
    textos.appendChild(avaliacao2)
    textos.appendChild(informacoes);
    informacoes.appendChild(dados)
    informacoes.appendChild(divSinopse);
    dados.appendChild(genero)
    dados.appendChild(direcao)
    dados.appendChild(avaliacoes)
    dados.appendChild(nota)
    dados.appendChild(estrelas)
    dados.appendChild(botao);
    divSinopse.appendChild(labelSinopse)
    divSinopse.appendChild(sinopse);

    botao.addEventListener("click", () => {
        window.location.assign(`avaliacao.html?id=${filme.id}`)
    })

    local.appendChild(div);
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