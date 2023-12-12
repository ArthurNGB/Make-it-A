function registrarUsuario() {
    var email = document.querySelector('.email').value;
    var nome = document.querySelector('.nome').value;
    var sobrenome = document.querySelector('.sobrenome').value;
    var senha = document.querySelector('.senha').value;

    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    var novoUsuario = {
        id: Date.now(),
        email: email,
        nome: nome,
        sobrenome: sobrenome,
        senha: senha,
        tarefas: [],
        darkMode: false
    };

    usuarios.push(novoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    window.open('/codigo/html/login.html', '_self');
}

const form = document.querySelector('.register-form');

form.addEventListener('submit', e => {
    e.preventDefault();
    alert("Seu cadastro foi feito com sucesso!");
    registrarUsuario();
});
