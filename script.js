const taskList = [];

function addTask() {
  const title = document.querySelector(".input-title").value.trim();

  if (title === "") {
    alert("Поле задачи не может быть пустым");
    return;
  }
  const newTask = { name: title, completed: false, title: title };
  taskList.push(newTask);

  document.querySelector(".input-title").value = "";
  showTasks();
}

function deleteTask() {
  const title = document.querySelector(".input-delete").value.trim();
  const index = taskList.findIndex((task) => task.title === title);
  if (index !== -1) {
    taskList.splice(index, 1);
  } else {
    alert("Задача не найдена");
  }

  document.querySelector(".input-delete").value = "";
  showTasks();
}

function toggleTaskCompletion(title) {
  const task = taskList.find((task) => task.title === title);
  if (task) {
    task.completed = !task.completed;
  } else {
    alert("Задача не найдена");
  }
}

let buttonClicked = "";

function showTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";

  taskList.forEach((task) => {
    if (
      (buttonClicked === "completed" && !task.completed) ||
      (buttonClicked === "incomplete" && task.completed)
    ) {
      return;
    }

    const newLi = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;
    checkBox.addEventListener("change", function () {
      toggleTaskCompletion(task.title);
      showTasks();
    });

    newLi.appendChild(checkBox);
    newLi.appendChild(document.createTextNode(task.title));

    if (task.completed) {
      newLi.style.textDecoration = "line-through";
    }

    newLi.addEventListener("dblclick", function () {
      const newTitle = prompt("Введите новое имя для задачи");
      if (newTitle) {
        task.title = newTitle;
        showTasks();
      }
    });

    taskContainer.appendChild(newLi);
  });
}

document.getElementById("btn-show-all").addEventListener("click", function () {
  buttonClicked = "all";
  showTasks();
});

document
  .getElementById("btn-show-completed")
  .addEventListener("click", function () {
    buttonClicked = "completed";
    showTasks();
  });

document
  .getElementById("btn-show-incomplete")
  .addEventListener("click", function () {
    buttonClicked = "incomplete";
    showTasks();
  });
