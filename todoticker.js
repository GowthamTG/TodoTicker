tasks = JSON.parse(localStorage.getItem("TODO"));
if (tasks === null) {
  localStorage.setItem("TODO", JSON.stringify([]));
}
const form = document.getElementById("form");

editButtonCreator = (id) => {
  const editButton = document.createElement("button");
  editButton.classList.add("button-logo", "button-edit");
  editButton.setAttribute("id", "edit" + id);
  editButton.onclick = function () {
    onEdit(id.toString());
  };

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pencil");

  editButton.appendChild(editIcon);
  return editButton;
};

removeButtonCreator = (id) => {
  const removeButton = document.createElement("button");
  removeButton.classList.add("button-logo", "button-remove");
  removeButton.setAttribute("id", "remove" + id);
  removeButton.onclick = function () {
    onRemove(id.toString());
  };

  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fa-solid", "fa-trash");

  removeButton.appendChild(removeIcon);
  return removeButton;
};

const editButtonTable = (id) => {
  const tableBodyItemEdit = document.createElement("td");
  tableBodyItemEdit.classList.add("table-body-item");

  const editButton = editButtonCreator(id);
  tableBodyItemEdit.appendChild(editButton);

  return tableBodyItemEdit;
};

const removeButtonTable = (id) => {
  const tableBodyItemRemove = document.createElement("td");
  tableBodyItemRemove.classList.add("table-body-item");

  const removeButton = removeButtonCreator(id);
  tableBodyItemRemove.appendChild(removeButton);

  return tableBodyItemRemove;
};

const getProgressButtonGenerator = (id) => {
  const progressButton = document.createElement("button");
  progressButton.classList.add("button", "button-inprogress");
  progressButton.innerText = "In Progress";
  progressButton.setAttribute("id", "progress" + id);
  return progressButton;
};
const getCompletedButtonGenerator = (id) => {
  const completedButton = document.createElement("button");
  completedButton.classList.add("button", "button-completed");
  completedButton.innerText = "Completed";
  completedButton.setAttribute("id", "progress" + id);
  return completedButton;
};
const getTodoButtonGenerator = (id) => {
  const todoButton = document.createElement("button");
  todoButton.classList.add("button", "button-todo");
  todoButton.innerText = "Todo";
  todoButton.setAttribute("id", "progress" + id);
  return todoButton;
};

const getProgressButtonTable = (id) => {
  const progress = document.createElement("td");
  progress.classList.add("table-body-item");

  progress.appendChild(getProgressButtonGenerator(id));
  return progress;
};

const getCompletedButtonTable = (id) => {
  const completed = document.createElement("td");
  completed.classList.add("table-body-item");

  completed.appendChild(getCompletedButtonGenerator(id));
  return completed;
};

const getTodoButtonTable = (id) => {
  const todo = document.createElement("td");
  todo.classList.add("table-body-item");

  todo.appendChild(getTodoButtonGenerator(id));
  return todo;
};

const getProgressGenerator = (val, id) => {
  if (val === "inprogress") {
    return getProgressButtonGenerator(id);
  } else if (val === "todo") {
    return getTodoButtonGenerator(id);
  }
  return getCompletedButtonGenerator(id);
};

const getProgressTable = (val, id) => {
  if (val === "inprogress") {
    return getProgressButtonTable(id);
  } else if (val === "todo") {
    return getTodoButtonTable(id);
  }
  return getCompletedButtonTable(id);
};

const displayTasksMobile = () => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
  const insertTag = document.getElementById("mobile-insert-area");
  insertTag.innerHTML = "";
  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index];
    id = task.taskNo;
    const card = document.createElement("div");
    card.classList.add("card");
    const cardGroup1 = document.createElement("div");
    cardGroup1.classList.add("card-group");
    const cardSubGroup1 = document.createElement("div");
    cardSubGroup1.classList.add("card-sub-group");
    const cardHeading = document.createElement("h4");
    cardHeading.setAttribute("id", "taskid" + id);
    cardHeading.classList.add("card-heading");
    cardHeading.innerText = id;
    cardSubGroup1.appendChild(cardHeading);
    cardGroup1.appendChild(cardSubGroup1);

    const cardSubGroup2 = document.createElement("div");
    cardSubGroup2.appendChild(editButtonCreator(id));
    cardSubGroup2.appendChild(removeButtonCreator(id));
    cardGroup1.appendChild(cardSubGroup2);

    const cardGroup2 = document.createElement("div");
    cardGroup2.classList.add("card-group");
    const taskName = document.createElement("p");
    taskName.innerHTML = task.taskName;
    taskName.setAttribute("id", "taskName" + id);
    taskName.classList.add("card-heading");

    cardGroup2.appendChild(taskName);

    const cardGroup3 = document.createElement("div");
    cardGroup3.classList.add("card-group");
    cardGroup3.appendChild(getProgressGenerator(task.progress, id));

    card.appendChild(cardGroup1);
    card.appendChild(cardGroup2);
    card.appendChild(cardGroup3);

    insertTag.appendChild(card);
  }
};

const displayTasksDesktop = () => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
  const insertTag = document.getElementById("desktop-insert-area");
  insertTag.innerHTML = "";
  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index];
    id = task.taskNo;
    const tableBodyRow = document.createElement("tr");
    const tableBodyItemTaskId = document.createElement("td");
    const tableBodyItemTaskName = document.createElement("td");
    const tableBodyItemProgress = getProgressTable(task.progress, id);
    const editButtonItem = editButtonTable(id);
    const removeButtonItem = removeButtonTable(id);
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
  tasks = JSON.parse(localStorage.getItem("TODO"));
  console.log(tasks);
  const noDataInsertLocation = document.getElementById("no-data-section");
  noDataInsertLocation.innerHTML = "";
  if (tasks.length === 0) {
    const noDataTag = document.createElement("div");
    noDataTag.classList.add("no-data");
    noDataTag.innerHTML = "No Data Available";
    noDataInsertLocation.appendChild(noDataTag);
  }
  displayTasksMobile();
  displayTasksDesktop();
};

window.addEventListener("load", () => {
  const form = document.getElementById("form");
  document.getElementById("sort-" + "taskNo" + "-desc").style.display = "none";
  document.getElementById("sort-" + "taskName" + "-desc").style.display =
    "none";
  document.getElementById("sort-" + "progress" + "-desc").style.display =
    "none";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
  });
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchTasks();
  });
  // searchForm.addEventListener("reset", (event) => {
  //   event.preventDefault();
  //   onSearchReset();
  // });
  // const mainTask = JSON.parse(localStorage.getItem("MAIN-TODO"));
  // const tasks = JSON.parse(localStorage.getItem("TODO"));
  // localStorage.setItem("MAIN-TODO", JSON.stringify(tasks));

  displayTasks();
  onReset();
  form.reset();
  searchForm.reset();
});

const addTask = () => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
  if (tasks.length === 0) tasks = [];
  taskNo = document.getElementById("taskNo").value;
  taskName = document.getElementById("taskName").value;
  statusType = document.getElementById("status").value;
  for (const task of tasks) {
    console.log(task.taskName.toLowerCase());
    if (task.taskName.toLowerCase().includes(taskName.toLowerCase())) {
      alert("Task Name " + taskName + " Already Exists");
      return;
    }
  }
  if (taskNo === "") {
    taskNo = (tasks.length + 1).toString();
  }
  tasks.sort((a, b) => {
    return a.taskNo - b.taskNo;
  });

  for (const task of tasks) {
    if (task.taskNo === taskNo) {
      taskNo = (+taskNo + 1).toString();
    }
  }
  tasks.push({ taskNo: taskNo, taskName: taskName, progress: statusType });
  localStorage.setItem("TODO", JSON.stringify(tasks));
  localStorage.setItem("MAIN-TODO", JSON.stringify(tasks));

  displayTasks();
  const form = document.getElementById("form");
  form.reset();
};

const onEdit = (id) => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
  id = +id.replace(/[^0-9]/g, "");
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  const taskNoInputBox = document.getElementById("taskNo");
  // taskNoInputBox.style.display = "none";
  taskNoInputBox.disabled = true;
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
    console.log(tasks);
    localStorage.setItem("TODO", JSON.stringify(tasks));
    localStorage.setItem("MAIN-TODO", JSON.stringify(tasks));
    displayTasks();
  }
};

const onReset = () => {
  const taskNoInputBox = document.getElementById("taskNo");
  // taskNoInputBox.style.display = "none";
  taskNoInputBox.disabled = false;
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
  const taskNoInput = document.getElementById("taskNo").value;
  const taskNameInput = document.getElementById("taskName").value;
  const taskStatusInput = document.getElementById("status").value;
  for (const task of tasks) {
    console.log(task.taskName.toLowerCase());
    if (task.taskName.toLowerCase().includes(taskNameInput.toLowerCase())) {
      alert("Task Name " + taskNameInput + " Already Exists");
      return;
    }
  }

  let foundObj = tasks.find((task) => {
    if (taskNoInput === task.taskNo) {
      task.taskName = taskNameInput;
      task.progress = taskStatusInput;
      console.log(task);
    }
  });

  console.log(tasks);

  localStorage.setItem("TODO", JSON.stringify(tasks));
  localStorage.setItem("MAIN-TODO", JSON.stringify(tasks));

  displayTasks();
};

const searchTasks = () => {
  tasks = JSON.parse(localStorage.getItem("TODO"));
  localStorage.setItem("MAIN-TODO", JSON.stringify(tasks));
  const searchOption = +document.getElementById("search-option").value;
  const searchCriteria = document.getElementById("search-criteria").value;
  let tempTasks = [];
  if (searchOption === "taskno") {
    if (+searchCriteria - 1 < tasks.length) {
      tempTasks.appendChild(tasks[+searchCriteria - 1]);
    } else {
      alert("Task Id :" + searchCriteria + "no found !");
    }
  } else {
    tempTasks = tasks.filter(function (task) {
      return task.taskName.toLowerCase().includes(searchCriteria.toLowerCase());
    });
  }
  tasks = tempTasks;
  localStorage.setItem("TODO", JSON.stringify(tasks));
  displayTasks();
};

const onSearchReset = () => {
  tasks = JSON.parse(localStorage.getItem("MAIN-TODO"));
  localStorage.setItem("TODO", JSON.stringify(tasks));
  displayTasks();
};

const sortTasks = (value, desc) => {
  // if(value)
  const ascField = document.getElementById("sort-" + value + "-asc");
  const descField = document.getElementById("sort-" + value + "-desc");

  if (desc) {
    ascField.style.display = "none";
    descField.style.display = "inline";
  } else {
    ascField.style.display = "inline";
    descField.style.display = "none";
  }
  tasks = JSON.parse(localStorage.getItem("TODO"));
  console.log(tasks[0][value]);
  if (!desc) {
    tasks.sort((a, b) =>
      a[value] > b[value] ? 1 : b[value] > a[value] ? -1 : 0
    );
  } else {
    tasks.sort((a, b) =>
      b[value] > a[value] ? 1 : a[value] > b[value] ? -1 : 0
    );
  }

  localStorage.setItem("TODO", JSON.stringify(tasks));
  displayTasks();
};
