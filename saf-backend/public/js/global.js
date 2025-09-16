window.addEventListener('load', main);

token = sessionStorage.getItem('token')

function main() {
    atualizeUser()
}

function atualizeUser() {
    if (token) {
        username = decodificarToken(token).username
        userimgidentify = document.getElementById('userimgidentify')
        useridentify = document.getElementById('useridentify')
        useridentify.textContent = username
        userimgidentify.href = "usuario.html"
        useridentify.href = "usuario.html"
    }
}

function decodificarToken(token) {
    try {
      const partes = token.split('.');
      const payloadBase64 = partes[1].replace(/-/g, '+').replace(/_/g, '/');
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload;
    } catch (error) {
      console.error('Erro ao decodificar JWT:', error);
      return null;
    }
}