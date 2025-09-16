if (token) {
    window.location.href = 'usuario.html'
}

window.addEventListener('load', main)
    
async function main() {
    ativarFormulario()

    const botao = document.getElementById("cadastro")
    botao.addEventListener("click", () => {
        window.location.href = "cadastro.html"
    })
}

function ativarFormulario() {
    const form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        logar()
    })
}

async function logar() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
        
    const response = await fetch('/api/usuario/logar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({usuario: usuario, senha: senha}),
    });
    
    const result = await response.json();

    if (response.ok) {
        sessionStorage.setItem('token', result.token)
        const url = new URLSearchParams(window.location.search).get('url')
        if (url) {
            window.location.href = url
        } else {
            window.location.href = 'usuario.html'
        }
    } else {
        alert(result.message)
    }
    
}