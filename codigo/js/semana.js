const inputcontainer = document.querySelector("input");
const rootElement = document.documentElement;
const darkTheme = {
    '--background-color': '#343434',
    '--text-color': '#ffffff',
    '--card-color': '#242424',
    '--form-buttons': '#868686',
    '--button-hover': '#1f1e1e',
}
window.onload = getThemeFromLocalStorage;

const lightTheme = {
    '--background-color': ' #ffff',
    '--text-color': '#000',
    '--card-color': '#ccc',
    '--form-buttons': '#000',
    '--button-hover': '#1f1e1e',
}
inputcontainer.addEventListener('change', function () {
    const isChecked = inputcontainer.checked
    changeTheme(isChecked ? lightTheme : darkTheme);
});

function changeTheme(theme) {
    for (let prop in theme) {
        changeProperty(prop, theme[prop]);
    }
    saveThemeToLocalStorage(theme);
}

function changeProperty(property, value) {
    rootElement.style.setProperty(property, value);
}

function saveThemeToLocalStorage(theme) {
    localStorage.setItem('theme', JSON.stringify(theme));
}

function getThemeFromLocalStorage() {
    const theme = JSON.parse(localStorage.getItem('theme'))
    if (isThemeEqual(theme, lightTheme)) inputcontainer.checked = true;
    changeTheme(theme);
}

function isThemeEqual(firstTheme, secondTheme) {
    for (let prop in firstTheme) {
        if (firstTheme[prop] !== secondTheme[prop]) return false;
    }
    return true;
}

// Ir para home
const homeButton = document.querySelector('.home-button');
homeButton.addEventListener("click", () => {
    window.open('/codigo/html/index.html', '_self');
});

// Ir para tela de conta
const openAccount = document.querySelector('.account');
const openAccountImage = document.querySelector('.perfil-image');

openAccount.addEventListener("click", () => {
    window.open('/codigo/html/conta.html', '_self');
});
openAccountImage.addEventListener("click", () => {
    window.open('/codigo/html/conta.html', '_self');
});

// Exibição de tarefas
let taskStorage = JSON.parse(localStorage.getItem('task'));

if (!Array.isArray(taskStorage)) {
    taskStorage = [];
}

const domingo = document.querySelector('.segunda');

function displayWeeklyTasks() {
    const daysOfWeek = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

    // Mapear as tarefas para os dias da semana
    const tasksByDay = daysOfWeek.reduce((acc, day) => {
        acc[day] = [];
        return acc;
    }, {});

    // Adicionar tarefas aos dias correspondentes
    taskStorage.forEach(taskObj => {
        // Extrair o dia da semana diretamente da string da data (assumindo o formato 'AAAA-MM-DD')
        const date = new Date(taskObj.date + 'T00:00:00'); // Adiciona o horário para garantir a consistência do fuso horário
    
        // Ajusta para o fuso horário do Brasil (Horário de Brasília)
        date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    
        const dayOfWeekString = daysOfWeek[date.getDay()];
    
        if (tasksByDay[dayOfWeekString]) {
            tasksByDay[dayOfWeekString].push(taskObj);
        }
    });

    // Função para exibir as tarefas do dia correto
    function displayDailyTasks(day, container) {
        container.innerHTML = '';

        tasksByDay[day].forEach(taskObj => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task');
            taskItem.textContent = `
                ${taskObj.name}
                ${taskObj.singleTime === '00:00' ? '' : taskObj.singleTime}
                ${taskObj.startTime === '00:00' ? '' : `${taskObj.startTime} -> ${taskObj.endTime}`}
                ${taskObj.date ? taskObj.date.replace(/-/g, '/') : ''}
            `;

            container.appendChild(taskItem);
        });
    }

    // Exibir as tarefas para cada dia da semana
    daysOfWeek.forEach(day => {
        const dayContainer = document.querySelector(`.${day}`);
        displayDailyTasks(day, dayContainer);
    });
}

// Chame a função para exibir as tarefas da semana
displayWeeklyTasks();