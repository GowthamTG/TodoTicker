tasks = JSON.parse(localStorage.getItem("TODO"));
if (tasks === null) {
  localStorage.setItem("TODO", []);
}
const form = document.getElementById("form");
const editButton = (id) => {
  const tableBodyItemEdit = document.createElement("td");
  tableBodyItemEdit.classList.add("table-body-item");

  const editButton = document.createElement("button");
  editButton.classList.add("button-logo", "button-edit");
  editButton.setAttribute("id", "edit" + id);
  editButton.onclick = function () {
    onEdit(id.toString());
  };

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pencil");

  editButton.appendChild(editIcon);
  tableBodyItemEdit.appendChild(editButton);

  return tableBodyItemEdit;
};
const removeButton = (id) => {
  const tableBodyItemRemove = document.createElement("td");
  tableBodyItemRemove.classList.add("table-body-item");

  const removeButton = document.createElement("button");
  removeButton.classList.add("button-logo", "button-remove");
  removeButton.setAttribute("id", "remove" + id);
  removeButton.onclick = function () {
    onRemove(id.toString());
  };

  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fa-solid", "fa-trash");

  removeButton.appendChild(removeIcon);
  tableBodyItemRemove.appendChild(removeButton);

  return tableBodyItemRemove;
};

const getProgress = (val, id) => {
  if (val === "inprogress") {
    return getProgressButton(id);
  } else if (val === "todo") {
    return todoButton(id);
  }
  return getCompletedButton(id);
};

const getProgressButton = (id) => {
  const progress = document.createElement("td");
  const progressButton = document.createElement("button");
  progress.classList.add("table-body-item");
  progressButton.classList.add("button", "button-inprogress");
  progressButton.innerText = "In Progress";
  progressButton.setAttribute("id", "progress" + id);
  progress.appendChild(progressButton);
  return progress;
};

const getCompletedButton = (id) => {
  const completed = document.createElement("td");
  const completedButton = document.createElement("button");
  completed.classList.add("table-body-item");
  completedButton.classList.add("button", "button-completed");
  completedButton.innerText = "Completed";
  completedButton.setAttribute("id", "progress" + id);
  completed.appendChild(completedButton);
  return completed;
};

const todoButton = (id) => {
  const todo = document.createElement("td");
  const todoButton = document.createElement("button");
  todo.classList.add("table-body-item");
  todoButton.classList.add("button", "button-todo");
  todoButton.innerText = "Todo";
  todoButton.setAttribute("id", "progress" + id);
  todo.appendChild(todoButton);
  return todo;
};
const addTask = () => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
  if (tasks.length === 0) tasks = [];
  taskName = document.getElementById("taskName").value;
  statusType = document.getElementById("status").value;
  tasks.push({ taskName: taskName, progress: statusType });
  localStorage.setItem("TODO", JSON.stringify(tasks));
  displayTasks();
};

const displayTasksMobile = () => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
};

const displayTasksDesktop = () => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
  const insertTag = document.getElementById("desktop-insert-area");
  insertTag.innerHTML = "";
  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index];
    id = index + 1;
    const tableBodyRow = document.createElement("tr");
    const tableBodyItemTaskId = document.createElement("td");
    const tableBodyItemTaskName = document.createElement("td");
    const tableBodyItemProgress = getProgress(task.progress, id);
    const editButtonItem = editButton(id);
    const removeButtonItem = removeButton(id);
    tableBodyRow.classList.add("table-body-row");

    tableBodyItemTaskId.classList.add("table-body-item");
    tableBodyItemTaskId.setAttribute("id", "taskid" + id);
    tableBodyItemTaskId.innerHTML = id;

    tableBodyItemTaskName.classList.add("table-body-item");
    tableBodyItemTaskName.setAttribute("id", "taskName" + id);
    tableBodyItemTaskName.innerHTML = task.taskName;

    tableBodyRow.appendChild(tableBodyItemTaskId);
    tableBodyRow.appendChild(tableBodyItemTaskName);
    tableBodyRow.appendChild(tableBodyItemProgress);
    tableBodyRow.appendChild(editButtonItem);
    tableBodyRow.appendChild(removeButtonItem);
    insertTag.appendChild(tableBodyRow);
  }
};

const displayTasks = () => {
  // displayTasksMobile();
  displayTasksDesktop();
};

window.addEventListener("load", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
  });
  displayTasks();
  onReset();
});

const onEdit = (id) => {
  tasks = JSON.parse(localStorage.getItem("TODO"));

  id = +id.replace(/[^0-9]/g, "");
  const taskNoInputBox = document.getElementById("task-no-box");
  taskNoInputBox.style.display = "flex";
  const editTaskButton = document.getElementById("edit-task");
  editTaskButton.style.display = "flex";
  const resetFormButton = document.getElementById("reset-form");
  resetFormButton.style.display = "flex";
  const addTaskButton = document.getElementById("add-task");
  addTaskButton.style.display = "none";
  const taskNoInput = document.getElementById("taskNo");
  taskNoInput.value = id;
  const taskNameInput = document.getElementById("taskName");
  taskNameInput.value = document
    .getElementById("taskName" + id)
    .innerText.trim();
  const taskStatusInput = document.getElementById("status");
  taskStatusInput.value = document
    .getElementById("progress" + id)
    .innerText.replace(/\s/g, "")
    .toLowerCase();
};

const onRemove = (id) => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
  id = +id.replace(/[^0-9]/g, "");
  const deleteOrNot = confirm("Do you want to delete the task with ID " + id);
  console.log(deleteOrNot);
  if (deleteOrNot) {
    tasks = JSON.parse(localStorage.getItem("TODO"));
    tasks.splice(id - 1, 1);
    localStorage.setItem("TODO", JSON.stringify(tasks));
    displayTasks();
  }
};

const onReset = () => {
  const taskNoInputBox = document.getElementById("task-no-box");
  taskNoInputBox.style.display = "none";
  const editTaskButton = document.getElementById("edit-task");
  editTaskButton.style.display = "none";
  const resetFormButton = document.getElementById("reset-form");
  resetFormButton.style.display = "none";
  const addTaskButton = document.getElementById("add-task");
  addTaskButton.style.display = "flex";
};

const onSubmitEdit = () => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
  console.log(tasks);
  const taskNoInput = +document.getElementById("taskNo").value;
  const taskNameInput = document.getElementById("taskName").value;
  const taskStatusInput = document.getElementById("status").value;
  console.log(taskNoInput);
  console.log(taskNameInput);
  console.log(taskStatusInput);
  tasks[taskNoInput - 1].taskName = taskNameInput;
  tasks[taskNoInput - 1].progress = taskStatusInput;
  localStorage.setItem("TODO", JSON.stringify(tasks));
  displayTasks();
};
