window.addEventListener("load", main)

async function main() {
    const form = document.getElementById("mudar-nome")

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const novoNome = document.getElementById("novo-nome").value
        const senha = document.getElementById("senha").value

        const response = await fetch("api/usuario/atualizar/nome", {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ token: token, novoNome: novoNome, senha: senha})
        })
        const result = await response.json()
        alert(result.message)        

        if(response.ok) {
            sessionStorage.setItem('token', result.token)
            window.location.href = "usuario.html"
        } else if (response.status == 401) {
            sessionStorage.removeItem('token')
            location.href = 'minhaconta.html'
        }
    })
}