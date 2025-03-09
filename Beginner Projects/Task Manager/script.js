// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasks(); // Call the function to load tasks
});

// Function to load tasks from localStorage and display them
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks or initialize an empty array
    const taskList = document.getElementById('taskList'); // Get the task list element
    taskList.innerHTML = ''; // Clear the current task list
    
    // Iterate over each task and create a list item
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.completed); // Create a task element
        taskList.appendChild(li); // Append the task element to the task list
    });
}

// Function to create a task list item with buttons for editing, completing, and deleting
function createTaskElement(taskText, completed) {
    const li = document.createElement('li'); // Create a new list item
    li.textContent = taskText; // Set the text of the list item
    if (completed) {
        li.classList.add('completed'); // Add completed class if the task is completed
    }

    // Create an edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit'; // Set button text
    editBtn.addEventListener('click', function() {
        const taskInput = document.getElementById('taskInput'); // Get the input field
        taskInput.value = taskText; // Set input value to the task text
        li.remove(); // Remove the task from the list for editing
        updateLocalStorage(); // Update local storage after removal
    });

    // Create a mark as complete/incomplete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = completed ? 'Make Incomplete' : 'Make Complete'; // Set button text based on completion status
    completeBtn.addEventListener('click', function() {
        li.classList.toggle('completed'); // Toggle the completed class
        completeBtn.textContent = li.classList.contains('completed') ? 'Make Incomplete' : 'Make Complete'; // Update button text
        updateLocalStorage(); // Update local storage
    });

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete'; // Set button text
    deleteBtn.addEventListener('click', function() {
        li.remove(); // Remove the task from the list
        updateLocalStorage(); // Update local storage
    });

    // Append buttons to the list item
    li.appendChild(editBtn);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    return li; // Return the created list item
}

// Function to update localStorage with the current tasks
function updateLocalStorage() {
    const taskList = document.getElementById('taskList'); // Get the task list element
    const tasks = []; // Initialize an array to hold tasks
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent, // Get the task text
            completed: li.classList.contains('completed') // Check if the task is completed
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to localStorage
}

// Add event listener to the "Add Task" button
document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput'); // Get the input field
    const taskText = taskInput.value.trim(); // Get the trimmed input value

    // If the input is not empty, create a new task
    if (taskText) {
        const li = createTaskElement(taskText, false); // Create a new task element
        document.getElementById('taskList').appendChild(li); // Append the new task to the list
        updateLocalStorage(); // Update local storage
        taskInput.value = ''; // Clear input
    }
});
