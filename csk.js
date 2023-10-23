const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('addTask');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to display tasks
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
<input type="checkbox" ${task.completed ? 'checked' : ''}>
<span>${task.text}</span>
<button class="edit">Edit</button>
<button data-index="${index}">Delete</button>
`;
        li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });
        li.querySelector('.edit').addEventListener('click', () => {
            const newText = prompt('Edit task:', task.text);
            if (newText !== null) {
                tasks[index].text = newText;
                saveTasks();
                displayTasks();
            }
        });
        li.querySelector('button[data-index]').addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });
        taskList.appendChild(li);
    });
}

// Add a new task
addTaskButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({
            text,
            completed: false
        });
        taskInput.value = '';
        saveTasks();
        displayTasks();
    }
});

// Initial display
displayTasks();