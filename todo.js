document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <span>${task.name}</span>
                <div>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                    <button onclick="toggleTask(${index})">${task.completed ? 'Unmark' : 'Mark'}</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };
    addTaskBtn.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            tasks.push({ name: taskName, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    window.editTask = (index) => {
        const newName = prompt('Edit Task:', tasks[index].name);
        if (newName) {
            tasks[index].name = newName;
            saveTasks();
            renderTasks();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };
    renderTasks();
});
