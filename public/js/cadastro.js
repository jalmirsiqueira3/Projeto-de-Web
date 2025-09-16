if (token) {
    window.location.href = 'minhaconta.html'
}

window.addEventListener("load", main)

async function main() {
    await cadastrar()
}

async function cadastrar() {
    const form = document.getElementById("form");

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const usuario = document.getElementById('usuario')
        const email = document.getElementById('email')
        const senha = document.getElementById('senha');

        if(compararSenha()) {
            const data = {
                usuario: usuario.value,
                email: email.value,
                senha: senha.value
            };
            
            const response = await fetch('/api/usuario/adicionar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()
            alert(result.message)

            if(response.ok) {
                window.location.href = "minhaconta.html"
            } else {
                usuario.value = ""
                email.value = ""
                senha.value = ""
                document.getElementById("confirmar-senha").value = ""
            }
        }
    })

    const confirmarSenha = document.getElementById("confirmar-senha");
        confirmarSenha.addEventListener('input', function () {
            confirmarSenha.style.border = "";
            confirmarSenha.setCustomValidity("");
        });
} 

function compararSenha() {
    const senha = document.getElementById("senha")
    const confirmarSenha = document.getElementById("confirmar-senha")

    if(confirmarSenha.value != senha.value) {
        confirmarSenha.value = "";
        confirmarSenha.style.border = "2px solid red";
        confirmarSenha.setCustomValidity("As senhas não correspondem!");
        confirmarSenha.reportValidity();
        return false;
    } else {
        confirmarSenha.style.border = "";
        confirmarSenha.setCustomValidity("");
        confirmarSenha.reportValidity();
        return true;
    }
}