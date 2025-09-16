window.addEventListener("load", main)

async function main() {
    const form = document.getElementById("mudar-senha")
    const usuario = decodificarToken(token);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        const senhaAntiga = document.getElementById("senha-antiga")
        const novaSenha = document.getElementById("nova-senha")
        const confirmarSenha = document.getElementById("confirmar-nova-senha");
        
        if(compararSenha()) {
            const data = {
                id: usuario.userid,
                senhaAntiga: senhaAntiga.value,
                novaSenha: novaSenha.value
            }
            
            const response = await fetch("/api/usuario/atualizar/senha", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            
            const result = await response.json()
            alert(result.message);
            
            if(response.ok) {
                window.location.href = "usuario.html"
            } else {
                senhaAntiga.value = "";
                senhaAntiga.style.border = "2px solid red";
                novaSenha.value = "";
                confirmarSenha.value = "";
            }
        }
    })
    const confirmarSenha = document.getElementById("confirmar-nova-senha");
    confirmarSenha.addEventListener('input', function () {
        confirmarSenha.style.border = "";
        confirmarSenha.setCustomValidity("");
    });
}

function compararSenha() {
    const senha = document.getElementById("nova-senha")
    const confirmarSenha = document.getElementById("confirmar-nova-senha")

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