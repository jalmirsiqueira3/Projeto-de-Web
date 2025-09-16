async function pesquisar(info) {
    const local = document.getElementById("secao");
    while(local.children.length != 0) {
        local.removeChild(local.children[0])
    }

    const conteudo = document.getElementById("nome-pesquisado")
    conteudo.textContent = `Busca por: "${info}"`

    const response = await fetch(`/api/filmes/busca/${info}`);
    const dado = await response.json()

    if(dado == "") {
        const texto = document.createElement("h1")

        texto.textContent = `Nenhum resultado para a pesquisa: "${info}"`

        local.appendChild(texto)

        local.style ="justify-content: center"
    }

    const filmes = dado

    for (const filme of filmes) {
        renderizarFilmes(local, filme);
    }

    console.log("renderizando");
}

function renderizarFilmes(local, filme) {
    const divFilme = document.createElement("div");
    const avaliacao = document.createElement("a");
    const img = document.createElement("img");
    const titulo = document.createElement("h2");
    const nota_titulo = document.createElement("h3");
    const nota = document.createElement("h3");
    const estrelas = renderizarEstrelas(filme.nota);

    divFilme.id = `filme-${filme.id}`;
    avaliacao.href = `avaliacao.html?id=${filme.id}`;
    img.src = filme.img; img.alt = "capa do filme";
    titulo.textContent = filme.titulo;
    nota_titulo.textContent = "Nota:";
    nota.textContent = filme.nota;
    
    divFilme.classList.add("filme");
    estrelas.classList.add("stars");

    divFilme.appendChild(avaliacao);
    avaliacao.appendChild(img);
    divFilme.appendChild(titulo);
    divFilme.appendChild(nota_titulo);
    divFilme.appendChild(nota);
    divFilme.appendChild(estrelas);

    local.appendChild(divFilme);
}

window.addEventListener('load', main)

function main() {
    const params = new URLSearchParams(window.location.search)
    const info = params.get('s')
    if (info) {
       pesquisar(info) 
    }
    
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