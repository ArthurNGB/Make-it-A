// Mode escuro/claro
const inputcontainer = document.querySelector("input");
const rootElement = document.documentElement;
const darkTheme = {
    '--background-color': '#343434',
    '--text-color': '#ffffff',
    '--card-color': '#242424',
    '--form-buttons': '#868686',
    '--button-hover': '#1f1e1e',
}

const lightTheme = {
    '--background-color': ' #ffff',
    '--text-color': '#000',
    '--card-color': '#ccc',
    '--form-buttons': '#000',
    '--button-hover': '#1f1e1e',
}
inputcontainer.addEventListener('change', function () {
    const isChecked = inputcontainer.checked
    if (isChecked) {
        changeTheme(lightTheme)
    } else {
        changeTheme(darkTheme)
    }
    isChecked ? changeTheme(lightTheme) : changeTheme(darkTheme)
})

function changeTheme(theme) {
    for (let prop in theme) {
        changeProperty(prop, theme[prop])
    }
    saveThemeToLocalStorage(theme)
}
function changeProperty(property, value) {
    rootElement.style.setProperty(property, value)
}
function saveThemeToLocalStorage(theme) {
    localStorage.setItem('theme', JSON.stringify(theme))

}

function getThemeFromLocalStorage() {
    const theme = JSON.parse(localStorage.getItem('theme'))
    if (isThemeEqual(theme, lightTheme)) inputcontainer.checked = true
    changeTheme(theme)
}
function isThemeEqual(firstTheme, secondTheme) {
    for (let prop in firstTheme) {
        if (firstTheme[prop] != secondTheme[prop]) return false
    }
    return true
}

// Navegação para tela principal
const openMain = document.querySelector('.account');

openMain.addEventListener('click', () => {
    window.open('/codigo/html/index.html', '_self');
});

// Navegação para deslogar
const openLogin = document.querySelector('.logout');

openLogin.addEventListener('click', () => {
    window.open('/codigo/html/login.html', '_self');
});

// Função para preencher os campos do formulário com dados do localStorage
function fillFormFields() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (!Array.isArray(usuarios)) {
        usuarios = [];
    }

    const nome = document.querySelector('.nome');
    const sobrenome = document.querySelector('.sobrenome');
    const email = document.querySelector('.email');
    const senha = document.querySelector('.senha');

    usuarios.forEach((user) => {
        nome.textContent = `Nome: ${user.nome}`
        sobrenome.textContent = `Sobrenome: ${user.sobrenome}`
        email.textContent = `Email: ${user.email}`
        senha.textContent = `Senha: ${user.senha}`
    })

}
fillFormFields();

// Alterar os dados do usuário
function changeUserDatas() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (!Array.isArray(usuarios)) {
        usuarios = [];
    }

    const salvarButton = document.querySelector('.change-user-data');
    salvarButton.addEventListener('click', function (event) {
        event.preventDefault();

        const novoNome = document.querySelector('.new-nome').value;
        const novoSobrenome = document.querySelector('.new-sobrenome').value;
        const novoEmail = document.querySelector('.new-email').value;
        const novaSenha = document.querySelector('.new-senha').value;

        if (novoNome != '') {
            usuarios.forEach((user) => {
                user.nome = novoNome;
                alert('Dado alterado com sucesso');
            })
        } else if (novoSobrenome != '') {
            usuarios.forEach((user) => {
                user.sobrenome = novoSobrenome;
                alert('Dado alterado com sucesso');
            })
        } else if (novoEmail != '') {
            usuarios.forEach((user) => {
                user.email = novoEmail;
                alert('Dado alterado com sucesso');
            })
        } else if (novaSenha != '') {
            usuarios.forEach((user) => {
                user.senha = novaSenha;
                alert('Dado alterado com sucesso');
            })
        } else {
            alert('Para alterar os seus dados é preciso preencher o campo desejado');
        }

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

    });

}
changeUserDatas();

function deleteAccount() {
    const btnDeleteAcc = document.querySelector('.delete-acc');

    btnDeleteAcc.addEventListener("click", () => {
        confirm('Ao clicar em "Sim" todos os seus dados no Make It serão apagados. Você tem certeza que deseja continuar?');

        localStorage.removeItem('usuarios');
        localStorage.removeItem('task');
        localStorage.removeItem('authenticatedUserID');
        window.open('/codigo/html/registro.html', '_self');
    });
}
deleteAccount();