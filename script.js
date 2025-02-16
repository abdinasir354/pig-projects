document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function(task) {
            createTaskElement(task.text, task.isDone);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(function(li) {
            tasks.push({
                text: li.querySelector("span").textContent,
                isDone: li.querySelector("span").classList.contains("done")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Create a new task element
    function createTaskElement(taskText, isDone) {
        const li = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        if (isDone) {
            taskSpan.classList.add("done");
        }

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "✓";
        doneBtn.classList.add("done-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✗";
        deleteBtn.classList.add("delete-btn");

        li.appendChild(taskSpan);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        doneBtn.addEventListener("click", function() {
            taskSpan.classList.toggle("done");
            taskSpan.style.transition = "color 0.3s ease, text-decoration 0.3s ease";
            saveTasks();
        });

        deleteBtn.addEventListener("click", function() {
            li.classList.add("fade-out");
            li.addEventListener("transitionend", function() {
                li.remove();
                saveTasks();
            });
        });
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        createTaskElement(taskText, false);
        saveTasks();
        taskInput.value = "";
    }

    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
