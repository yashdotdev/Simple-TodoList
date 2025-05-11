let input = document.querySelector("input");
let addTask = document.querySelector(".add");
let ul = document.querySelector("ul");

const emptyMessage = document.createElement("h3");
emptyMessage.innerText = "Todo list is empty!";
emptyMessage.classList.add("empty-message");

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll("ul li").forEach((li) => {
    const span = li.querySelector("span");
    const completed = li.classList.contains("completed");
    tasks.push({ text: span.textContent, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task.text, task.completed);
  });
  // No empty message when the user loads it for the first time
}

function createTaskElement(taskValue, isCompleted = false) {
  const li = document.createElement("li");
  if (isCompleted) li.classList.add("completed");

  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = "<i class='bx bx-check-circle'></i>";
  checkBtn.classList.add("check");

  const taskText = document.createElement("span");
  taskText.innerText = taskValue;

  const buttonGroup = document.createElement("div");

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "<i class='bx bxs-pencil'></i>";
  editBtn.classList.add("edit");

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "<i class='bx bxs-trash-alt'></i>";
  delBtn.classList.add("delete");

  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(delBtn);

  li.appendChild(checkBtn);
  li.appendChild(taskText);
  li.appendChild(buttonGroup);

  ul.appendChild(li);
}

// add task event listener
addTask.addEventListener("click", function () {
  if (input.value.trim() === "") {
    alert("Input field can't be empty!");
    return;
  }

  createTaskElement(input.value);
  input.value = "";

  saveTasksToLocalStorage();

  if (ul.contains(emptyMessage)) {
    ul.removeChild(emptyMessage);
  }
});

// input event listener
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (input.value.trim() === "") {
      alert("Input field can't be empty!");
      return;
    }

    createTaskElement(input.value);
    input.value = "";

    saveTasksToLocalStorage();

    if (ul.contains(emptyMessage)) {
      ul.removeChild(emptyMessage);
    }
  }
});

ul.addEventListener("click", function (event) {
  const target = event.target;
  const deleteBtn = target.closest(".delete");
  const editBtn = target.closest(".edit");
  const checkBtn = target.closest(".check");

  if (deleteBtn) {
    const li = deleteBtn.closest("li");
    li.remove();
    saveTasksToLocalStorage();

    if (ul.children.length === 0) {
      ul.appendChild(emptyMessage);
    }
  }

  if (editBtn) {
    const li = editBtn.closest("li");
    const taskSpan = li.querySelector("span");

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskSpan.textContent;
    editInput.classList.add("editable");

    li.replaceChild(editInput, taskSpan);
    editInput.focus();

    const saveEdit = () => {
      taskSpan.textContent = editInput.value;
      li.replaceChild(taskSpan, editInput);
      saveTasksToLocalStorage();
    };

    editInput.addEventListener("blur", saveEdit);
    editInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") saveEdit();
    });
  }

  if (checkBtn) {
    const li = checkBtn.closest("li");
    li.classList.toggle("completed");
    saveTasksToLocalStorage();
  }
});

loadTasksFromLocalStorage();
