
let tasks = [];

function renderTasks() {
    const taskContainer = document.getElementById('list');
    taskContainer.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
       
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;


        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed;
        taskCheckbox.addEventListener('change', () => toggleTask(index));

        const taskDescription = document.createElement('span');
        taskDescription.textContent = task.description;

        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'material-symbols-outlined';
        deleteIcon.textContent = 'delete';
        deleteIcon.addEventListener('click', () => deleteTask(index));

        // Append elements to task item
        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(deleteIcon);

        // Append task item to container
        taskContainer.appendChild(taskItem);
    });
}

// Function to add a new task
function addTask(description) {
    if (description) {
        tasks.push({ description, completed: false });
        renderTasks();
    }
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    tasks.sort((a, b) => a.completed - b.completed); // Sort completed tasks to end
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Event listener for Enter key on input field
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const inputValue = this.value.trim();
        if (inputValue) { // Only add non-empty tasks
            addTask(inputValue);
            this.value = ''; // Clear input field
        }
    }
});

// Event listener for click on the add task icon
document.getElementById('addTaskIcon').addEventListener('click', function() {
    const input = document.getElementById('taskInput');
    const inputValue = input.value.trim();
    if (inputValue) { // Only add non-empty tasks
        addTask(inputValue);
        input.value = ''; // Clear input field
    }
});

// Initial render to show any pre-existing tasks (empty on first load)
renderTasks();
