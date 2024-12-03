const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateProgressBar() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}% completed`;
}

function renderTasks() {
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        if (task.completed) {
            li.classList.add('completed');
            li.style.animation = 'celebrate 0.5s ease';
        }

        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleTaskCompletion(${index})">${task.completed ? 'Undo' : 'Mark as Done'}</button>
            </div>
        `;
        taskList.appendChild(li);
    });

	updateProgressBar();
}


function addTask(taskName) {
    tasks.push({ name: taskName, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

addTaskButton.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
        addTask(taskName);
        taskInput.value = '';
    }
});

renderTasks();
