
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// used to access the 3 numbers in html
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");


const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");

// 1. Load tasks saved in the browser
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// If this is the first visit, use the original HTML tasks
if (tasks.length === 0) {
    const oldTasks = Array.from(taskList.children);

    tasks = oldTasks.map(function (li) {
        return {
            text: li.textContent.trim(),
            completed: false
        };
    });
}

// 2. Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 3. Display tasks on the webpage
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
       taskText.textContent = task.text;

       const taskDetails = document.createElement("small");

        taskDetails.textContent =
       "Due: " + (task.dueDate || "No date") +
       " | Priority: " + (task.priority || "Medium");

        taskDetails.className = "task-details";
           taskText.className = "task-text";

        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Mark task complete or incomplete
        taskText.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
   
        });

            // Update task counters
    totalTasks.textContent = tasks.length;

    const completedCount = tasks.filter(function (task) {
        return task.completed;
    }).length;

    completedTasks.textContent = completedCount;
    pendingTasks.textContent = tasks.length - completedCount;

        // Create Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

       li.appendChild(taskText);
       li.appendChild(taskDetails);
       li.appendChild(deleteBtn);
       
        taskList.appendChild(li);
    });
}

// 4. Add a new task
addTaskBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
    text: text,
    completed: false,
    dueDate: taskDate.value,
    priority: taskPriority.value
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskPriority.value = "Medium";
});

// 5. Save the initial tasks and display them
saveTasks();
displayTasks();
