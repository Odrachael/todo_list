// Function to add a new task
function addTask(event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  const taskInput = document.getElementById('task-input');
  const taskDate = document.getElementById('task-date');
  const taskPriority = document.getElementById('task-priority');
  const taskList = document.getElementById('task-list');
  const taskText = taskInput.value.trim();
  const taskDateValue = taskDate.value;
  const taskPriorityValue = taskPriority.value;

  if (taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.date = taskDateValue;
    li.dataset.priority = taskPriorityValue;

    const span = document.createElement('span');
    span.className = 'task-item-text';
    span.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-delete-button';
    deleteButton.textContent = '❌';
    deleteButton.onclick = function() {
      taskList.removeChild(li);
      removeTaskFromLocalStorage(taskText); // Remove task from localStorage
    };

    // Set background color based on priority
    switch (taskPriorityValue) {
      case 'high':
        li.style.backgroundColor = 'red';
        break;
      case 'medium':
        li.style.backgroundColor = 'yellow';
        break;
      case 'low':
        li.style.backgroundColor = 'green';
        break;
      default:
        li.style.backgroundColor = 'white';
        break;
    }

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = '';
    taskDate.value = ''; // Clear the calendar input
    taskPriority.value = 'low'; // Reset priority to low

    saveTaskToLocalStorage(taskText, taskDateValue, taskPriorityValue); // Save task to localStorage
  } else {
    alert('Please enter a task!');
  }
}

// Bind the addTask() function to the form submission event
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', addTask);

// Function to save task to localStorage
function saveTaskToLocalStorage(taskText, taskDate, taskPriority) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, date: taskDate, priority: taskPriority });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove task from localStorage
function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks from localStorage
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear previous tasks
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.date = task.date;
    li.dataset.priority = task.priority;

    const span = document.createElement('span');
    span.className = 'task-item-text';
    span.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-delete-button';
    deleteButton.textContent = '❌';
    deleteButton.onclick = function() {
      taskList.removeChild(li);
      removeTaskFromLocalStorage(task.text); // Remove task from localStorage
    };

    // Set background color based on priority
    switch (task.priority) {
      case 'high':
        li.style.backgroundColor = 'red';
        break;
      case 'medium':
        li.style.backgroundColor = 'yellow';
        break;
      case 'low':
        li.style.backgroundColor = 'green';
        break;
      default:
        li.style.backgroundColor = 'white';
        break;
    }

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Initial rendering of tasks
renderTasks();
