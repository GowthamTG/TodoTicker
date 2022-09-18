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
    onedit(id.toString());
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
  progressButton.setAttribute("id", "process" + id);
  progress.appendChild(progressButton);
  return progress;
};

const getCompletedButton = (id) => {
  const completed = document.createElement("td");
  const completedButton = document.createElement("button");
  completed.classList.add("table-body-item");
  completedButton.classList.add("button", "button-completed");
  completedButton.innerText = "Completed";
  completedButton.setAttribute("id", "process" + id);
  completed.appendChild(completedButton);
  return completed;
};

const todoButton = (id) => {
  const todo = document.createElement("td");
  const todoButton = document.createElement("button");
  todo.classList.add("table-body-item");
  todoButton.classList.add("button", "button-todo");
  todoButton.innerText = "Todo";
  todoButton.setAttribute("id", "process" + id);
  todo.appendChild(todoButton);
  return todo;
};
const addTask = () => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
  console.log("FHSDHFHJHSDFj");
  if (tasks.length === 0) tasks = [];
  console.log(tasks);
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
    console.log(task.taskName);
    id = index + 1;
    const tableBodyRow = document.createElement("tr");
    const tableBodyItemTaskId = document.createElement("td");
    const tableBodyItemTaskName = document.createElement("td");
    const tableBodyItemProgress = getProgress(task.progress, id);
    const editButtonItem = editButton(id);
    const removeButtonItem = removeButton(id);
    console.log(editButtonItem);
    console.log(removeButtonItem);
    tableBodyRow.classList.add("table-body-row");

    tableBodyItemTaskId.classList.add("table-body-item");
    tableBodyItemTaskId.setAttribute("id", "taskid" + id);
    tableBodyItemTaskId.innerHTML = id;

    tableBodyItemTaskName.classList.add("table-body-item");
    tableBodyItemTaskName.setAttribute("id", "taskName" + id);
    tableBodyItemTaskName.innerHTML = task.taskName;

    // tableBodyItemProgress.classList.add("table-body-item");
    // tableBodyItemProgress.setAttribute("id", "progress" + id);
    // tableBodyItemProgress.appendChild(getProgress(task.progress));

    console.log(getProgress(task.progress));
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
    // tasks = JSON.parse(localStorage.getItem("TODO"));
    addTask();
  });
});

const onEdit = (id) => {
  tasks = JSON.parse(localStorage.getItem("TODO"));

  id = +id.replace(/[^0-9]/g, "");
  const taskNameInput = document.getElementById("taskName");
  taskNameInput.value = document
    .getElementById("taskName" + id)
    .innerHTML.trim();
  const taskStatusInput = document.getElementById("status");
  taskStatusInput.value = document
    .getElementById("progress" + id)
    .innerHTML.replace(/\s/g, "")
    .toLowerCase();
};

const onRemove = (id) => {
  tasks = JSON.parse(localStorage.getItem("TODO"));

  id = +id.replace(/[^0-9]/g, "");
  confirm("Do you want to delete the task with ID " + id);
  tasks = JSON.parse(localStorage.getItem("TODO"));
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  localStorage.setItem("TODO", JSON.stringify(tasks));
  displayTasks();
};
// displayTasks();
