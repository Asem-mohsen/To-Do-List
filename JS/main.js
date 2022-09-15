let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let TaskDiv = document.querySelector(".tasks");

//Empty Array to store the Tasks
let ArrayOfTasks = [];

//Check If There Is Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  ArrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

GetData();

// ADD Task
submit.onclick = function () {
  if (input.value !== "") {
    AddTaskToArray(input.value); //Add Task to array of Tasks
    input.value = ""; //Empty input field
  }
};
//Click on task element
TaskDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    //Remove element form page
    e.target.parentElement.remove();
    //Remove elemnt from local storage
    DeleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  //Task element
  if (e.target.classList.contains("task")) {
    //Toggle completed
    ToggleStatuesTaskWith(e.target.getAttribute("data-id"));
    //Toggele Done class
    e.target.classList.toggle("TaskDone");
  }
});

function AddTaskToArray(TaskText) {
  //Task Data
  const Task = {
    id: Date.now(),
    title: TaskText,
    Completed: false,
  };
  //Push Task to Array of Tasks
  ArrayOfTasks.push(Task);

  //Add Tasks to Page
  AddElementsToPageFrom(ArrayOfTasks);

  // Add Tasks to Local storage
  AddDataToLocalStorage(ArrayOfTasks);
}


function AddElementsToPageFrom(ArrayOfTasks) {
  //Empty Task Div
  TaskDiv.innerHTML = "";
  //Looping On Array OF Tasks
  ArrayOfTasks.forEach((Task) => {
    let div = document.createElement("div");
    div.className = "task";
    //Check if task is done
    if (Task.Completed === true) {
      div.className = "TaskDone";
    }

    div.setAttribute("data-id", Task.id);
    div.appendChild(document.createTextNode(Task.title));

    //Create Delete Button
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));

    div.appendChild(span);

    //Add Tasks div to the main Task div
    TaskDiv.appendChild(div);
  });

}

function AddDataToLocalStorage(ArrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(ArrayOfTasks));
}
function GetData() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let Tasks = JSON.parse(data);
    AddElementsToPageFrom(Tasks);
  }
}

function DeleteTaskWith(TaskID) {
  ArrayOfTasks = ArrayOfTasks.filter((Task) => Task.id != TaskID);
  AddDataToLocalStorage(ArrayOfTasks);
}

function ToggleStatuesTaskWith(TaskID) {
  for (let i = 0; i < ArrayOfTasks.length; i++) {
    if (ArrayOfTasks[i].id == TaskID) {
      ArrayOfTasks[i].Completed == false
        ? (ArrayOfTasks[i].Completed = true)
        : (ArrayOfTasks[i].Completed = false);
    }
  }
  AddDataToLocalStorage(ArrayOfTasks);
}
