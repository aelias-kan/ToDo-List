// Retrieve tasks from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addTaskButton = document.getElementById("addTaskButton");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addTaskButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

// Add a new task
function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask) {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  } else {
    alert("Task cannot be empty!");
  }
}

// Display tasks
function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const taskElement = document.createElement("div");
    taskElement.className = "todo-container";
    taskElement.innerHTML = `
      <input type="checkbox" id="checkbox-${index}" ${
      item.disabled ? "checked" : ""
    } />
      <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}">
        ${item.text}
      </p>
    `;
    taskElement
      .querySelector(`#checkbox-${index}`)
      .addEventListener("change", () => toggleTask(index));
    taskElement
      .querySelector(`#todo-${index}`)
      .addEventListener("click", () => editTask(index));
    todoList.appendChild(taskElement);
  });
  todoCount.textContent = todo.length;
}

// Edit a task
function editTask(index) {
  const newText = prompt("Edit your task:", todo[index].text);
  if (newText !== null && newText.trim()) {
    todo[index].text = newText.trim();
    saveToLocalStorage();
    displayTasks();
  }
}

// Toggle task completion
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

// Delete all tasks
function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todo = [];
    saveToLocalStorage();
    displayTasks();
  }
}

// Save tasks to local storage
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
