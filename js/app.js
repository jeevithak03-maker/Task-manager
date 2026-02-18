let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addTask(taskInput.value);
    taskInput.value = "";
});

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    showTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    showTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    showTasks();
}

function setFilter(filter) {
    currentFilter = filter;
    showTasks();
}

function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter(task => !task.completed);
    }
    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }
    return tasks;
}

function showTasks() {
    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks();

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span onclick="toggleTask(${task.id})">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function updateStats() {
    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent =
        tasks.filter(task => task.completed).length;
    document.getElementById("activeTasks").textContent =
        tasks.filter(task => !task.completed).length;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

showTasks();
