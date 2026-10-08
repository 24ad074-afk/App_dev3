// ---------------------------------------
// Get HTML Elements
// ---------------------------------------

const taskInput =
    document.getElementById("taskInput");

const addTaskButton =
    document.getElementById("addTaskButton");

const taskList =
    document.getElementById("taskList");

const emptyMessage =
    document.getElementById("emptyMessage");

const totalTasks =
    document.getElementById("totalTasks");

const pendingTasks =
    document.getElementById("pendingTasks");

const completedTasks =
    document.getElementById("completedTasks");

const filterButtons =
    document.querySelectorAll(".filter");


// ---------------------------------------
// Store Tasks
// ---------------------------------------

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// ---------------------------------------
// Display Tasks
// ---------------------------------------

function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;


    // Apply filter
    if (currentFilter === "pending") {

        filteredTasks =
            tasks.filter(
                task => !task.completed
            );

    }


    if (currentFilter === "completed") {

        filteredTasks =
            tasks.filter(
                task => task.completed
            );

    }


    // Empty message
    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    // Create task elements
    filteredTasks.forEach(task => {

        const taskItem =
            document.createElement("div");

        taskItem.classList.add("task-item");


        // Add completed class
        if (task.completed) {

            taskItem.classList.add("completed");

        }


        // Checkbox
        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add(
            "task-checkbox"
        );

        checkbox.checked = task.completed;


        // Complete task
        checkbox.addEventListener(
            "change",
            function () {

                toggleTask(task.id);

            }
        );


        // Task text
        const taskText =
            document.createElement("span");

        taskText.classList.add("task-text");

        taskText.textContent =
            task.text;


        // Edit button
        const editButton =
            document.createElement("button");

        editButton.textContent = "Edit";

        editButton.classList.add("edit-btn");


        editButton.addEventListener(
            "click",
            function () {

                editTask(task.id);

            }
        );


        // Delete button
        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add(
            "delete-btn"
        );


        deleteButton.addEventListener(
            "click",
            function () {

                deleteTask(task.id);

            }
        );


        // Add elements
        taskItem.appendChild(checkbox);

        taskItem.appendChild(taskText);

        taskItem.appendChild(editButton);

        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);

    });


    updateStatistics();

}


// ---------------------------------------
// Add Task
// ---------------------------------------

function addTask() {

    const text =
        taskInput.value.trim();


    // Check empty task
    if (text === "") {

        alert("Please enter a task.");

        return;

    }


    // Create task object
    const newTask = {

        id: Date.now(),

        text: text,

        completed: false

    };


    // Add task
    tasks.push(newTask);


    // Save task
    saveTasks();


    // Clear input
    taskInput.value = "";


    // Display tasks
    displayTasks();

}


// ---------------------------------------
// Edit Task
// ---------------------------------------

function editTask(id) {

    const task =
        tasks.find(
            task => task.id === id
        );


    const newText =
        prompt(
            "Edit your task:",
            task.text
        );


    if (
        newText !== null &&
        newText.trim() !== ""
    ) {

        task.text =
            newText.trim();

        saveTasks();

        displayTasks();

    }

}


// ---------------------------------------
// Delete Task
// ---------------------------------------

function deleteTask(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (confirmDelete) {

        tasks =
            tasks.filter(
                task => task.id !== id
            );


        saveTasks();

        displayTasks();

    }

}


// ---------------------------------------
// Complete / Uncomplete Task
// ---------------------------------------

function toggleTask(id) {

    const task =
        tasks.find(
            task => task.id === id
        );


    task.completed =
        !task.completed;


    saveTasks();

    displayTasks();

}


// ---------------------------------------
// Update Statistics
// ---------------------------------------

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    totalTasks.textContent =
        total;

    pendingTasks.textContent =
        pending;

    completedTasks.textContent =
        completed;

}


// ---------------------------------------
// Save Tasks to Local Storage
// ---------------------------------------

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ---------------------------------------
// Filter Tasks
// ---------------------------------------

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            // Remove active class
            filterButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );


            // Add active class
            button.classList.add("active");


            // Get filter
            currentFilter =
                button.dataset.filter;


            displayTasks();

        }
    );

});


// ---------------------------------------
// Button Event
// ---------------------------------------

addTaskButton.addEventListener(
    "click",
    addTask
);


// ---------------------------------------
// Press Enter to Add Task
// ---------------------------------------

taskInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// ---------------------------------------
// Load Tasks When Page Opens
// ---------------------------------------

displayTasks();