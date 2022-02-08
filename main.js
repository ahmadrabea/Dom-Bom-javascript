let tasksbox = document.querySelector(".tasks");

let landing = document.createElement("div");
landing.style.height = "70px";
landing.style.width = "80%";
landing.style.backgroundColor = "RGB(238, 238, 240)";
landing.style.display = "flex";
landing.style.justifyContent = "space-evenly";
landing.style.alignItems = "center";
landing.style.margin = "auto";
landing.style.marginTop = "50px";
landing.style.marginBottom = "50px";
landing.style.borderRadius = "5px";
document.body.prepend(landing);

let textInput = document.createElement("input");
textInput.style.width = "80%";
textInput.style.height = "30px";
textInput.style.borderRadius = "5px";
textInput.style.borderStyle = "none";
textInput.style.fontSize = "20px";
textInput.placeholder = "Tasks will be saved automaticly";

let btn = document.createElement("button");
btn.style.height = "30px";
btn.style.width = "70px";
btn.style.background = "RGB(255, 84, 53)";
btn.style.borderRadius = "5px";
btn.style.borderStyle = "none";
btn.innerHTML = "Add Task";
btn.style.padding = "0";
btn.style.color = "white";
btn.style.transition = "0.3s";
btn.onmouseenter = (_) => {
  btn.style.backgroundColor = "rgb(187 48 23)";
};
btn.onmouseleave = (_) => {
  btn.style.backgroundColor = "RGB(255, 84, 53)";
};

landing.appendChild(textInput);
landing.appendChild(btn);

let clearCache = document.createElement("button");
clearCache.style.height = "40px";
clearCache.style.width = "90px";
clearCache.style.background = "RGB(255, 84, 53)";
clearCache.style.borderRadius = "5px";
clearCache.style.borderStyle = "none";
clearCache.innerHTML = "Clear cache";
clearCache.style.padding = "0";
clearCache.style.color = "white";
clearCache.style.marginTop = "30px";
clearCache.style.marginBottom = "50px";
clearCache.style.position = " relative";
clearCache.style.left = "49%";
clearCache.style.transition = "0.3s";
clearCache.onmouseenter = (_) => {
  clearCache.style.backgroundColor = "rgb(187 48 23)";
};
clearCache.onmouseleave = (_) => {
  clearCache.style.backgroundColor = "RGB(255, 84, 53)";
};

document.body.appendChild(clearCache);

clearCache.addEventListener("click", (_) => {
  if (confirm("your tasks will be deleted are you sure ? ")) {
    window.localStorage.clear();
    window.location.reload();
  } else {
  }
});

if (window.localStorage.getItem("Tasks") == null) {
  //checks if there is any key in local storage
  console.log("first session");
  tasksList = [];
  var tasksCounter = 0;
} else {
  tasksList = JSON.parse(localStorage.getItem("Tasks")); // get the key and convert it to arr
  console.log("previous session founded");
  var tasksCounter = tasksList.length; //setting the counter based on the founded key
  restoreTasksFromPreviousSession(tasksList);
}

btn.addEventListener("click", (_) => {
  let { task, deleteBtn } = generateNewTask();
});

function generateNewTask() {
  taskIndex = tasksCounter;
  tasksCounter++;
  let task = document.createElement("div");
  task.style.height = "70px";
  task.style.width = "80%";
  task.style.backgroundColor = "RGB(238, 238, 240)";
  task.style.display = "flex";
  task.style.justifyContent = "space-evenly";
  task.style.alignItems = "center";
  task.style.margin = "auto";
  task.style.borderRadius = "5px";
  tasksbox.appendChild(task);

  let taskText = document.createElement("p");
  taskText.style.width = "80%";
  taskText.innerHTML = textInput.value;
  task.appendChild(taskText);

  let deleteBtn = removeTask();
  deleteBtn.setAttribute("data-index", taskIndex); // every "delete" button has its own index that point on its task box **
  task.appendChild(deleteBtn);
  textInput.value = "";
  textInput.focus();
  tasksList.push(taskText.innerHTML); //push the task details into the list
  localStorage.setItem("Tasks", JSON.stringify(tasksList)); // updatign the key after adding the task
  return { task, deleteBtn };
}

function removeTask() {
  let deleteBtn = document.createElement("button");
  deleteBtn.style.height = "30px";
  deleteBtn.style.width = "70px";
  deleteBtn.style.background = "RGB(255, 84, 53)";
  deleteBtn.style.borderRadius = "5px";
  deleteBtn.style.borderStyle = "none";
  deleteBtn.innerHTML = "Delete";
  deleteBtn.style.padding = "0";
  deleteBtn.style.color = "white";
  deleteBtn.style.transition = "0.3s";
  deleteBtn.onmouseenter = (_) => {
    deleteBtn.style.backgroundColor = "rgb(187 48 23)";
  };
  deleteBtn.onmouseleave = (_) => {
    deleteBtn.style.backgroundColor = "RGB(255, 84, 53)";
  };
  deleteBtn.addEventListener("click", (_) => {
    tasksList[deleteBtn.getAttribute("data-index")] = ""; //accessing the task via the 'delete button' attribute(data-index) which discused above(**)
    console.log(deleteBtn.getAttribute("data-index"));
    localStorage.setItem("Tasks", JSON.stringify(tasksList)); // Updating the key after removing the task
    deleteBtn.parentNode.remove();
  });
  return deleteBtn;
}

function restoreTasksFromPreviousSession(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== "") {
      // checks the key elemnts to avoid appearing empty tasks
      let task = document.createElement("div");
      task.style.height = "70px";
      task.style.width = "80%";
      task.style.backgroundColor = "RGB(238, 238, 240)";
      task.style.display = "flex";
      task.style.justifyContent = "space-evenly";
      task.style.alignItems = "center";
      task.style.margin = "auto";
      task.style.borderRadius = "5px";
      tasksbox.appendChild(task);

      let taskText = document.createElement("p");
      taskText.style.width = "80%";
      taskText.innerHTML = list[i]; // set the tasks content
      task.appendChild(taskText);

      let deleteBtn = removeTask();
      deleteBtn.setAttribute("data-index", i); // set the 'data-index' attribite to be compatible with the other functions criteria
      task.appendChild(deleteBtn);
      textInput.value = "";
      textInput.focus();
    }
  }
}

//done
//programed with love : Ahmad <3
