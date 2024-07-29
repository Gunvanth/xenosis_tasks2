document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const newTaskInput = document.getElementById('new-task');
    const taskDateInput = document.getElementById('task-date');
    const addTaskButton = document.getElementById('add-task-button');
    const clearCompletedButton = document.getElementById('clear-completed-button');
    const taskList = document.getElementById('task-list');
    const completedTaskList = document.getElementById('completed-task-list');
    const warningMessage = document.getElementById('warning-message');
    const warningText = document.getElementById('warning-text');
    const warningOkButton = document.getElementById('warning-ok-button');
    const noActiveTasksMessage = document.getElementById('no-active-tasks');
    const noCompletedTasksMessage = document.getElementById('no-completed-tasks');

    // Load tasks from local storage or initialize an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to set today's date as the default date in the date input field
    const setTodayAsDefaultDate = () => {
        const today = new Date().toISOString().split('T')[0];
        taskDateInput.setAttribute('min', today); // Set the minimum date to today
        if (!taskDateInput.value) {
            taskDateInput.value = today; // Set default date to today if not already provided
        }
    };

    // Function to sort tasks by date in ascending order
    const sortTasksByDate = (tasks) => {
        return tasks.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB; // Sort in ascending order
        });
    };

    // Function to render tasks in the DOM
    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear the active tasks list
        completedTaskList.innerHTML = ''; // Clear the completed tasks list
        let hasActiveTasks = false;
        let hasCompletedTasks = false;

        // Sort tasks by date
        const sortedTasks = sortTasksByDate(tasks);

        sortedTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="task-details">
                    <span class="task-text">${task.text}</span>
                    <span class="task-datetime">${task.date}</span>
                </div>
                <div class="task-buttons">
                    ${task.completed ? '' : '<button class="complete-task-button" title="Task Completed"><i class="fa-solid fa-check"></i></button>'}
                    <button class="delete ${task.completed ? 'completed-delete' : ''}" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
                    ${task.completed ? '' : '<button class="edit" title="Edit Task"><i class="fa-solid fa-edit"></i></button>'}
                </div>
            `;

            if (task.completed) {
                completedTaskList.appendChild(li);
                hasCompletedTasks = true;
            } else {
                taskList.appendChild(li);
                hasActiveTasks = true;

                // Handle edit button click
                li.querySelector('.edit').addEventListener('click', () => {
                    const spanText = li.querySelector('.task-text');
                    const spanDate = li.querySelector('.task-datetime');
                    const currentText = spanText.textContent;
                    const currentDate = spanDate.textContent;

                    // Convert task text and date into input fields for editing
                    spanText.innerHTML = `<input type="text" value="${currentText}">`;
                    spanDate.innerHTML = `<input type="date" value="${currentDate}">`;

                    const inputText = spanText.querySelector('input');
                    const inputDate = spanDate.querySelector('input');
                    const editButton = li.querySelector('.edit');
                    editButton.textContent = 'Save';
                    editButton.classList.add('save');
                    editButton.classList.remove('edit');

                    // Disable the complete task button while editing
                    const completeButton = li.querySelector('.complete-task-button');
                    completeButton.disabled = true;
                    completeButton.classList.add('disabled');

                    // Function to save the edited task
                    const saveEdit = () => {
                        const newText = inputText.value.trim();
                        const newDate = inputDate.value;

                        if (newText && newDate) {
                            tasks[index].text = newText;
                            tasks[index].date = newDate;
                            saveTasks();
                            renderTasks();
                        } else {
                            warningText.textContent = 'Please enter valid text and date.';
                            warningMessage.style.display = 'block'; // Show warning message if input is invalid
                        }
                    };

                    // Save edited task on click or Enter key press
                    editButton.addEventListener('click', saveEdit);
                    inputText.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            saveEdit();
                        }
                    });
                    inputDate.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            saveEdit();
                        }
                    });

                    // Re-enable the complete task button after saving
                    editButton.addEventListener('click', () => {
                        completeButton.disabled = false;
                        completeButton.classList.remove('disabled');
                    });
                });

                // Handle complete button click
                li.querySelector('.complete-task-button').addEventListener('click', () => {
                    task.completed = true;
                    saveTasks();
                    renderTasks();
                });
            }

            // Handle delete button click
            li.querySelector('.delete').addEventListener('click', () => {
                tasks.splice(index, 1); // Remove the task from the array
                saveTasks();
                renderTasks();
            });
        });

        // Show or hide messages based on whether there are active or completed tasks
        noActiveTasksMessage.style.display = hasActiveTasks ? 'none' : 'block';
        noCompletedTasksMessage.style.display = hasCompletedTasks ? 'none' : 'block';

        // Initialize Intersection Observer for scroll to reveal effect
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal'); // Add reveal effect when element comes into view
                    observer.unobserve(entry.target); // Stop observing after it has been revealed
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        document.querySelectorAll('.task-item').forEach(item => {
            observer.observe(item); // Observe each task item
        });
    };

    // Add a new task
    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        const taskDate = taskDateInput.value;

        if (taskText && taskDate) {
            tasks.push({ text: taskText, date: taskDate, completed: false });
            newTaskInput.value = '';
            taskDateInput.value = ''; // Clear date input after adding
            warningMessage.style.display = 'none'; // Hide warning message
            saveTasks();
            renderTasks();
        } else {
            warningText.textContent = 'Please enter valid text and date.';
            warningMessage.style.display = 'block'; // Show warning message if input is invalid
        }
    });

    // Hide the warning message when OK button is clicked
    warningOkButton.addEventListener('click', () => {
        warningMessage.style.display = 'none'; // Hide warning message
    });

    // Clear all completed tasks
    clearCompletedButton.addEventListener('click', () => {
        const incompleteTasks = tasks.filter(task => !task.completed); // Filter out completed tasks
        tasks.length = 0; // Clear the current tasks array
        tasks.push(...incompleteTasks); // Add only incomplete tasks back to the array
        saveTasks();
        renderTasks();
    });

    // Set today's date as the default value for the date input
    setTodayAsDefaultDate();
    // Render tasks on page load
    renderTasks();
});
