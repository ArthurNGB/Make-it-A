window.onload = function () {
    // Exibição de tarefas
    let taskStorage = JSON.parse(localStorage.getItem('task'));

    if (!Array.isArray(taskStorage)) {
        taskStorage = [];
    }

    const taskList = document.querySelector('.task-list');

    function displayTasks() {
        taskList.innerHTML = '';

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
                taskItem.style.backgroundColor = 'green';
                check.style.color = '#fff';
            });

            const edit = document.createElement("i");
            edit.classList.add("bi", "bi-pencil-fill");
            edit.addEventListener('click', () => {
                editTask(index);
            });

            const trash = document.createElement("i");
            trash.classList.add("bi", "bi-trash3-fill");
            trash.addEventListener('click', () => {
                taskStorage.splice(index, 1); // Remove the task from the array
                localStorage.setItem('task', JSON.stringify(taskStorage)); // Update local storage
                displayTasks(); // Update the displayed tasks
            });

            containerIcons.appendChild(check);
            containerIcons.appendChild(edit);
            containerIcons.appendChild(trash);
            taskItem.appendChild(containerIcons);

            taskList.appendChild(taskItem);
        });
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
                    date: ''
                };

                taskStorage.push(newTask);

                localStorage.setItem('task', JSON.stringify(taskStorage));

                inputTask.value = '';

                displayTasks();
            }
        }
    });
}
