// Function to add a new task
function addTask(event) {
  event.preventDefault(); // Prevent form submission from refreshing the page
  
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const taskText = taskInput.value.trim();
  
  if (taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';

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

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = '';

    saveTaskToLocalStorage(taskText); // Save task to localStorage
  } else {
    alert('Please enter a task!');
  }
}

// Bind the addTask() function to the form submission event
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', addTask);

// Function to save task to localStorage
function saveTaskToLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove task from localStorage
function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const index = tasks.indexOf(taskText);
  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Function to render tasks from localStorage
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear previous tasks
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskText => {
    const li = document.createElement('li');
    li.className = 'task-item';

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

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Initial rendering of tasks
renderTasks();

// Function to handle language selection
document.getElementById('language-select').addEventListener('change', function() {
  var language = this.value;
  var placeholderText = getPlaceholderText(language);
  document.getElementById('task-input').placeholder = placeholderText;
});

function getPlaceholderText(language) {
  switch (language) {
      case 'en':
          return 'Enter a new task...';
      case 'fr':
          return 'Entrez une nouvelle tâche...';
      case 'es':
          return 'Ingrese una nueva tarea...';
      case 'de':
          return 'Geben Sie eine neue Aufgabe ein...';
      case 'it':
          return 'Inserisci un nuovo compito...';
      // Add more cases for additional languages
      default:
          return 'Enter a new task...';
  }
}

// Function to navigate back to the landing page
function goToHomePage() {
  window.location.href = "landing.html";
}

// Add event listener to the task list
document.getElementById('task-list').addEventListener('click', function(event) {
  // Check if the clicked element is a task item
  if (event.target.classList.contains('task-item')) {
      // Toggle the clicked class on the clicked task item
      event.target.classList.toggle('clicked');
  }
});

// Function to handle dropdown toggle
document.querySelector('.dropdown-toggle').addEventListener('click', function() {
  // Toggle the dropdown menu visibility
  document.querySelector('.dropdown-menu').classList.toggle('show');
});

// Add event listener to the "How it works" link
document.querySelector('.dropdown-item:nth-child(1)').addEventListener('click', function(event) {
  event.preventDefault();
  // Add your functionality for "How it works" here
});

// Add event listener to the "About Us" link
document.querySelector('.dropdown-item:nth-child(2)').addEventListener('click', function(event) {
  event.preventDefault();
  // Add your functionality for "About Us" here
});
