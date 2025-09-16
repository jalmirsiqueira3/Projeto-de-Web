if (!token) {
    window.location.href = 'minhaconta.html'
}

window.addEventListener("load", main);

async function main() {
    const usuario = document.getElementById("usuario")
    const user = decodificarToken(token)

    renderizarUsuario(usuario, user);

    tituloPagina(user)

    const avalia = document.getElementById("avaliacoes");

    const response = await fetch(`/api/usuario/avaliacoes/${user.userid}`)
    
    const qtdAvaliacoes = document.getElementById("qtdAvaliacoes")
    
    if (response.status == 200) {
        const dados = await response.json();
        const avaliacoes = dados;
        qtdAvaliacoes.textContent = avaliacoes.length
        
        const avaliados = document.createElement("div")
        
        avaliados.id = "avaliados"
        avalia.appendChild(avaliados)
        
        
        for (const avaliacao of avaliacoes) {
            renderizarAvaliados(avaliados, avaliacao)
        }
        
        
    }
    const encerrar = document.getElementById("encerrar")
    renderizarEncerrar(encerrar, user)
}

function renderizarUsuario(local, usuario) {
    const divUsuario = document.createElement("div")
    const imgUser = document.createElement("img")
    const divInformacoes = document.createElement("div")
    const nomeUsuario = document.createElement("h1")
    const emailUsuario = document.createElement("h3")
    const divBotoes = document.createElement("div")
    const formBotoes = document.createElement("form")
    const altSenha = document.createElement("button");
    const altNome = document.createElement("button");
    const logout = document.createElement("button")

    divUsuario.id = `usuario-${usuario.userid}`
    imgUser.src = "img/user/profile.png", imgUser.alt = "Usuário"
    nomeUsuario.textContent = usuario.username;
    emailUsuario.textContent = usuario.useremail
    altSenha.textContent = "Alterar senha"
    altSenha.type = "button"
    altNome.textContent = "Alterar nome"
    altNome.type = "button"
    logout.textContent = "Sair"
    logout.type = "button"

    altSenha.addEventListener('click', () =>{
        window.location.href = 'mudarsenha.html'
    })
    altNome.addEventListener('click', () =>{
        window.location.href = 'mudarnome.html'
    })
    logout.addEventListener('click', () => {
        const resposta = confirm("Deseja realmente sair do seu usuário?")

        if(resposta) {
            sessionStorage.removeItem('token')
            window.location.href = 'index.html'
        }
    })
    
    divUsuario.classList.add("user")
    imgUser.classList.add("user-img")
    divInformacoes.classList.add("informacoes")
    nomeUsuario.classList.add("user-nome");
    divBotoes.classList.add("botoes")

    divInformacoes.appendChild(nomeUsuario)
    divInformacoes.appendChild(emailUsuario)
    divBotoes.appendChild(formBotoes)
    formBotoes.appendChild(altNome)
    formBotoes.appendChild(altSenha)
    formBotoes.appendChild(logout)
    divUsuario.appendChild(imgUser)
    divUsuario.appendChild(divInformacoes)
    divUsuario.appendChild(divBotoes)

    local.appendChild(divUsuario);
}

function tituloPagina(usuario) {  
    const titulo =`SAF: ${usuario.username}`
    document.title = titulo;
}

function renderizarAvaliados(local, avaliacao) {
    const divFilme = document.createElement("div");
    const linkAvaliacao = document.createElement("a");
    const img = document.createElement("img");
    const dados = document.createElement("div");
    const TituloAvaliacao = document.createElement("a");
    const titulo = document.createElement("h2");
    const valores = document.createElement("div")
    const nota = document.createElement("h3");
    const estrelas = renderizarEstrelas(avaliacao.nota);

    linkAvaliacao.href = `avaliacao.html?id=${avaliacao.id}`;
    TituloAvaliacao.href = `avaliacao.html?id=${avaliacao.id}`;
    img.src = avaliacao.img; img.alt = "capa do filme";
    titulo.textContent = avaliacao.titulo;
    nota.textContent = `Nota: ${avaliacao.nota}`;

    divFilme.classList.add("filme");
    dados.classList.add("dados");
    valores.classList.add("valores")
    estrelas.classList.add("stars");

    linkAvaliacao.appendChild(img);
    TituloAvaliacao.appendChild(titulo)
    dados.appendChild(TituloAvaliacao)
    valores.appendChild(nota)
    valores.appendChild(estrelas)
    dados.appendChild(valores)
    divFilme.appendChild(linkAvaliacao);
    divFilme.appendChild(dados)

    local.appendChild(divFilme);
}

function renderizarEncerrar(local, usuario) {
    const divEncerrar = document.createElement("div")
    const h1Encerrar = document.createElement("h1")
    const botaoExcluir = document.createElement("button")

    divEncerrar.id = `usuario-${usuario.userid}`
    h1Encerrar.textContent = "Caso deseje encerrar com nossos serviços:"
    botaoExcluir.textContent = "Excluir Dados"
    botaoExcluir.type = "button"
    botaoExcluir.addEventListener("click", async () => {
        const resposta = confirm("Isso irá excluir sua conta. Quer continuar?")

        if(resposta) {
            const response = await fetch("/api/usuario/delete", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: usuario.userid }),
            })

            const result = await response.json()
            alert(result.message);

            sessionStorage.removeItem("token")
            window.location.href = "index.html"
        }
    })

    divEncerrar.classList.add("encerrar")

    divEncerrar.appendChild(h1Encerrar)
    divEncerrar.appendChild(botaoExcluir)

    local.appendChild(divEncerrar)
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