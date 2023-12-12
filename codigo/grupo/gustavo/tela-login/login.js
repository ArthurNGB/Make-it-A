// Função para autenticar o usuário
function autenticarUsuario(email, senha) {
    // Obter usuários do localStorage (supondo que estejam armazenados como um array)
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar se o usuário existe
    var usuarioAutenticado = usuarios.find(function (usuario) {
        return usuario.email === email && usuario.senha === senha;
    });

    return usuarioAutenticado;
}

// Função para lidar com o envio do formulário de login
function handleLoginSubmit(event) {
    event.preventDefault();

    // Obter os valores do formulário
    var email = document.querySelector('input[name="email"]').value;
    var senha = document.querySelector('input[name="senha"]').value;

    // Autenticar o usuário
    var usuarioAutenticado = autenticarUsuario(email, senha);

    // Verificar se a autenticação foi bem-sucedida
    if (usuarioAutenticado) {
        alert('Login bem-sucedido!');

        // Armazenar o ID do usuário autenticado no localStorage
        localStorage.setItem('authenticatedUserID', usuarioAutenticado.id);

        // Redirecionar ou realizar outras ações necessárias após o login
        window.location.href = '/html/index.html';
    } else {
        alert('Credenciais inválidas. Por favor, tente novamente.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Adicionar ouvinte de evento para o envio do formulário
    var form = document.querySelector('form');
    form.addEventListener('submit', handleLoginSubmit);
});
