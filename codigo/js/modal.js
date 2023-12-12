window.onload = function () {
    const taskForm = document.querySelector('.task-modal');
    const taskButton = document.querySelector('.task-button');
    // Horário único ou horário intervalado
    const singleOpt = document.querySelector('.single-opt');
    const singleTime = document.querySelector('.single-time');
    const intervalOpt = document.getElementById('interval-time');
    const startTime = document.getElementById('start-time');
    const endTime = document.getElementById('end-time');

    intervalOpt.addEventListener('change', () => {
        if (intervalOpt.checked) {
            startTime.style.display = 'block'
            endTime.style.display = 'block'
            singleTime.style.display = 'none';
        }
    });

    singleOpt.addEventListener('change', () => {
        if (singleOpt.checked) {
            startTime.style.display = 'none'
            endTime.style.display = 'none'
            singleTime.style.display = 'block';
        }
    });

    // Enviando tarefas
    const createTask = () => {
        const taskName = document.querySelector('.task-name').value;
        const taskDate = document.querySelector('.task-date').value;
        // singleTime, startTime, endTime (já decladrada)

        if (taskName == '') {
            alert('A tarefa precisa de um nome');
            return;
        }

        const task = {
            name: taskName,
            singleTime: singleTime.value,
            startTime: startTime.value,
            endTime: endTime.value,
            date: taskDate,
            check: false
        }

        const taskStorage = JSON.parse(localStorage.getItem('task')) || [];
        taskStorage.push(task)

        localStorage.setItem('task', JSON.stringify(taskStorage));
    }

    taskButton.addEventListener('click', e => {
        e.preventDefault();
        createTask();
        window.open('/codigo/html/index.html', '_self');
    });

}