// Function to add a new task
function addTask(event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  const taskInput = document.getElementById('task-input');
  const taskDate = document.getElementById('task-date');
  const taskTime = document.getElementById('task-time');
  const taskPriority = document.getElementById('task-priority');
  const taskList = document.getElementById('task-list');
  const taskText = taskInput.value.trim();
  const taskDateValue = taskDate.value;
  const taskTimeValue = taskTime.value;
  const taskPriorityValue = taskPriority.value;

  if (taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const dot = document.createElement('span');
    dot.className = 'priority-dot';
    dot.style.backgroundColor = getPriorityColor(taskPriorityValue);
    li.appendChild(dot);

    const span = document.createElement('span');
    span.className = 'task-item-text';
    span.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-delete-button';
    deleteButton.textContent = '🗑️';
    deleteButton.onclick = function() {
      taskList.removeChild(li);
      removeTaskFromLocalStorage(taskText); // Remove task from localStorage
    };

    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';

    const dateTimeBox = document.createElement('div');
    dateTimeBox.className = 'date-time-box';

    const formattedDateTime = formatDate(taskDateValue) + ' ' + formatTime(taskTimeValue);

    const dateTimeText = document.createElement('span');
    dateTimeText.textContent = formattedDateTime;

    dateTimeBox.appendChild(dateTimeText);
    taskDetails.appendChild(dateTimeBox);

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(taskDetails);
    taskList.appendChild(li);

    taskInput.value = '';
    taskDate.value = '';
    taskTime.value = '';
    taskPriority.value = 'low';

    saveTaskToLocalStorage(taskText, taskDateValue, taskTimeValue, taskPriorityValue);
  } else {
    alert('Please enter a task!');
  }
}


// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Function to format time
function formatTime(timeString) {
  const time = new Date('1970-01-01T' + timeString);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Function to get color based on priority
function getPriorityColor(priority) {
  switch (priority) {
    case 'high':
      return 'red';
    case 'medium':
      return 'yellow';
    case 'low':
      return 'green';
    default:
      return 'pink';
  }
}

// Function to save task to localStorage
function saveTaskToLocalStorage(taskText, taskDate, taskTime, taskPriority) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, date: taskDate, time: taskTime, priority: taskPriority });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Function to remove task from localStorage
function removeTaskFromLocalStorage(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1); // Remove task at the specified index
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks from localStorage
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear previous tasks
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task, index) => { // Use forEach with index
    const li = document.createElement('li');
    li.className = 'task-item';

    const dot = document.createElement('span');
    dot.className = 'priority-dot';
    dot.style.backgroundColor = getPriorityColor(task.priority);
    li.appendChild(dot);

    const span = document.createElement('span');
    span.className = 'task-item-text';
    span.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-delete-button';
    deleteButton.textContent = '🗑️';
    deleteButton.onclick = function(event) {
      event.stopPropagation(); // Stop event propagation
      taskList.removeChild(li);
      removeTaskFromLocalStorage(index); // Remove task at the index
      renderTasks(); // Update tasks after deletion
    };
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';

    const dateTimeBox = document.createElement('div');
    dateTimeBox.className = 'date-time-box';

    const formattedDateTime = formatDate(task.date) + ' ' + formatTime(task.time);

    const dateTimeText = document.createElement('span');
    dateTimeText.textContent = formattedDateTime;

    dateTimeBox.appendChild(dateTimeText);
    taskDetails.appendChild(dateTimeBox);

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(taskDetails);
    taskList.appendChild(li);
  });
}

// Initial rendering of tasks
renderTasks();

// Bind the addTask() function to the form submission event
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', addTask);
