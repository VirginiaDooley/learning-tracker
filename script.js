const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        if (task.completed) {
            li.classList.add('completed');
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
}


function addTask(taskName) {
    tasks.push({ name: taskName, completed: false });
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
