const cabecalho = document.getElementById('cabecalho')

// primera div
const divlogo = document.createElement('div')

const logolink1 = document.createElement('a')
const logoimg = document.createElement('img')
const logolink2 = document.createElement('a')
const logotitulo1 = document.createElement('h1')
const logotitulo2 = document.createElement('h1')

divlogo.classList.add('logo')
logotitulo1.id = "sigla" 
logolink1.href='index.html'
logolink2.href='index.html'

logoimg.src = "img/logo.png"; logoimg.alt = "logo-do-site"
logotitulo1.textContent = "SAF -"
logotitulo2.textContent = "Sistema de Avaliação de Filmes"

logolink1.appendChild(logoimg)
logolink2.appendChild(logotitulo1)
logolink2.appendChild(logotitulo2)

divlogo.appendChild(logolink1)
divlogo.appendChild(logolink2)

cabecalho.appendChild(divlogo)

// segunda div
const divnavegacao = document.createElement('div')

const barra = document.createElement('input')
const nav = document.createElement('nav')

const ul = document.createElement('ul')
const li1 = document.createElement('li')
const li2 = document.createElement('li')
const li3 = document.createElement('li')
const li4 = document.createElement('li')

const navlink1 = document.createElement('a')
const navlink2 = document.createElement('a')
const navlink3 = document.createElement('a')
const navlink4 = document.createElement('a')

divnavegacao.classList.add('navegacao')
barra.id = 'barra-pesquisa'

barra.type = 'text'; barra.placeholder = 'Pesquisar'
navlink1.href = 'index.html'; navlink1.textContent = 'Início'
navlink2.href = 'categorias.html'; navlink2.textContent = 'Categorias'
navlink3.href = 'ranking.html'; navlink3.textContent = 'Ranking'
navlink4.href = 'sobre.html'; navlink4.textContent = 'Sobre'

li1.appendChild(navlink1)
li2.appendChild(navlink2)
li3.appendChild(navlink3)
li4.appendChild(navlink4)

ul.appendChild(li1)
ul.appendChild(li2)
ul.appendChild(li3)
ul.appendChild(li4)

nav.appendChild(ul)

divnavegacao.appendChild(barra)
divnavegacao.appendChild(nav)

cabecalho.appendChild(divnavegacao)

// terceira div
const divlogin = document.createElement('div')

const loginlink1 = document.createElement('a')
const loginlink2 = document.createElement('a')

const loginimg = document.createElement('img')

divlogin.classList.add('login')
loginlink1.id = 'userimgidentify'
loginlink2.id = 'useridentify'

loginimg.src = "img/conta.png"; loginimg.alt = "icone-usuario"

loginlink1.href = 'minhaconta.html'
loginlink2.href = 'minhaconta.html'; loginlink2.textContent = 'Minha conta'

loginlink1.appendChild(loginimg)

divlogin.appendChild(loginlink1)
divlogin.appendChild(loginlink2)

cabecalho.appendChild(divlogin)

// evento pesquisar
const barrapesquisa = document.getElementById('barra-pesquisa')
barrapesquisa.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && barrapesquisa.value != '') {
        window.location.href = `pesquisar.html?s=${barrapesquisa.value}`
    }
});