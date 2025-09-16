window.addEventListener("load", main);

const params = new URLSearchParams(window.location.search)
const categoria = params.get('categoria')

async function main() {
    const local = document.getElementById("secao");

    const response = await fetch(`/api/filmes/categoria/${categoria}`);
    const dado = await response.json()
    const filmes = dado

    genero(local, filmes)

    const divFilmes = document.createElement("div");

    divFilmes.id = "filmes"

    local.appendChild(divFilmes)

    for (const filme of filmes) {
        renderizarFilmes(divFilmes, filme);
    }

    console.log("renderizando");

    tituloPagina(filmes)
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

function genero(local, filmes) {
    const divGenero = document.createElement("div")
    const genero = document.createElement("span")
    const h1 = document.createElement("h1");

    genero.id = "categoria"
    genero.textContent = filmes[0].nomegenero;
    h1.textContent = "Categoria: "

    divGenero.classList.add("categoria")

    h1.appendChild(genero)
    divGenero.appendChild(h1);

    local.appendChild(divGenero);
}

function tituloPagina(filmes) {
    const titulo =`SAF: ${filmes[0].nomegenero}`
    document.title = titulo;
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