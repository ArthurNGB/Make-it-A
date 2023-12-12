window.onload = function () {
    // Exibição de tarefas
    let taskStorage = JSON.parse(localStorage.getItem('task'));

    if (!Array.isArray(taskStorage)) {
        taskStorage = [];
    }

    const taskLate = document.querySelector('.late');
    const taskToday = document.querySelector('.today');
    const taskTomorrow = document.querySelector('.tomorrow');
    const taskList = document.querySelector('.all');
    const taskChecked = document.querySelector('.checked');

    function displayTasks() {
        taskList.innerHTML = '';
        taskLate.innerHTML = '';
        taskToday.innerHTML = '';
        taskTomorrow.innerHTML = '';
        taskChecked.innerHTML = '';
    
        const teste = new Date();
        const brazilTimezoneOffset = -3 * 60; // Fuso horário de Brasília é UTC-3
        const brazilTime = new Date(teste.getTime() + brazilTimezoneOffset * 60000);
        
        const currentDate = brazilTime.toISOString().split('T')[0];
    
        taskStorage.forEach((taskObj, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task');
            taskItem.textContent = `
                ${taskObj.name}
                ${taskObj.singleTime === '00:00' ? '' : taskObj.singleTime}
                ${taskObj.startTime === '00:00' ? '' : `${taskObj.startTime} -> ${taskObj.endTime}`}
                ${taskObj.date ? taskObj.date.replace(/-/g, '/') : ''}
            `;
    
            const containerIcons = document.createElement('div');
    
            const check = document.createElement("i");
            check.classList.add("bi-check-lg");
            check.addEventListener('click', () => {
                if (taskObj.check) {
                    taskObj.check = false;
                } else {
                    taskObj.check = true;
                    taskItem.style.backgroundColor = 'green';
                    check.style.color = '#fff';
                }
    
                localStorage.setItem('task', JSON.stringify(taskStorage));
    
                updateTaskDisplay(taskObj, taskItem);
            });
    
            const edit = document.createElement("i");
            edit.classList.add("bi", "bi-pencil-fill");
            edit.addEventListener('click', () => {
                editTask(index);
            });
    
            const trash = document.createElement("i");
            trash.classList.add("bi", "bi-trash3-fill");
            trash.addEventListener('click', () => {
                taskStorage.splice(index, 1);
                localStorage.setItem('task', JSON.stringify(taskStorage));
                displayTasks();
            });
    
            containerIcons.appendChild(check);
            containerIcons.appendChild(edit);
            containerIcons.appendChild(trash);
            taskItem.appendChild(containerIcons);
    
            // Adicionar lógica para categorizar a tarefa com base na data
            if (taskObj.check) {
                taskChecked.appendChild(taskItem);
            } else {
                const taskDate = taskObj.date ? taskObj.date : taskList.appendChild(taskItem);
    
                if (taskDate < currentDate) {
                    taskLate.appendChild(taskItem);
                    taskItem.style.backgroundColor = 'red';
                } else if (taskDate === currentDate) {
                    taskToday.appendChild(taskItem);
                } else {
                    // Adiciona apenas tarefas para o próximo dia em taskTomorrow
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate());
                    const tomorrowDate = tomorrow.toISOString().split('T')[0];
    
                    if (taskDate === tomorrowDate) {
                        taskTomorrow.appendChild(taskItem);
                    } else {
                        taskList.appendChild(taskItem);
                    }
                }
            }
        });
    }

    // Adiciona uma função para atualizar o display da tarefa com base no estado do check
    function updateTaskDisplay(taskObj, taskItem) {
        if (taskObj.check) {
            taskItem.style.backgroundColor = 'green';
            check.style.color = '#fff';
        } else {
            taskItem.style.backgroundColor = '';
            check.style.color = '';
        }
    }

    function editTask(index) {
        const taskObj = taskStorage[index];

        const newName = prompt('Edit task name:', taskObj.name);
        if (newName !== null) {
            taskObj.name = newName;
        }

        const newTime = prompt('Edit task time:', taskObj.singleTime);
        if (newTime !== null) {
            taskObj.singleTime = newTime;
        }

        const newDate = prompt('Edit task date:', taskObj.date);
        if (newDate !== null) {
            taskObj.date = newDate.replace(/\//g, '-');
        }

        localStorage.setItem('task', JSON.stringify(taskStorage));
        displayTasks();
    }


    displayTasks();

    // Tarefa rápida
    const inputTask = document.querySelector('.input-task');

    inputTask.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
            const newTaskName = inputTask.value.trim();
            if (newTaskName !== '') {
                const newTask = {
                    name: newTaskName,
                    singleTime: '00:00',
                    startTime: '00:00',
                    endTime: '00:00',
                    date: '',
                    check: false
                };

                taskStorage.push(newTask);

                localStorage.setItem('task', JSON.stringify(taskStorage));

                inputTask.value = '';

                displayTasks();
            }
        }
    });

    // Abre modal para criar tarefas
    const openModal = document.querySelector(".custom-task");

    openModal.addEventListener('click', () => {
        window.open('/codigo/html/modal.html', '_self');
    });

    // Abre tela da conta
    const openAccount = document.querySelector(".account");
    const openAccountImg = document.querySelector(".account-img");

    openAccount.addEventListener('click', () => {
        window.open('/codigo/html/conta.html', '_self');
    });
    openAccountImg.addEventListener('click', () => {
        window.open('/codigo/html/conta.html', '_self');
    });

    // Abre a tela semanal
    const openWeek = document.querySelector(".my-week");

    openWeek.addEventListener('click', () => {
        window.open('/codigo/html/semana.html', '_self');
    });

}

// Modo escuro/claro
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
    '--background-color':' #ffff',
    '--text-color':'#000',
    '--card-color': '#ccc',
    '--form-buttons': '#000',
    '--button-hover': '#1f1e1e',
}
inputcontainer.addEventListener('change', function() {
    const isChecked = inputcontainer.checked
    if (isChecked){
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
function changeProperty(property, value){
    rootElement.style.setProperty(property, value)
}
function saveThemeToLocalStorage(theme){
    localStorage.setItem('theme', JSON.stringify(theme))

}

function getThemeFromLocalStorage(){
    const theme = JSON.parse(localStorage.getItem('theme'))
    if(isThemeEqual(theme, lightTheme)) inputcontainer.checked = true
    changeTheme(theme)
}
function isThemeEqual(firstTheme, secondTheme){
    for(let prop in firstTheme){
        if (firstTheme[prop] != secondTheme[prop]) return false
    }
    return true
}