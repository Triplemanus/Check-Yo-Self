// ---------------Query-selectors-------  -------------------//
var createTaskList = document.querySelector(".add-task-card");
var taskList = document.querySelector(".task-list");
var sectionRight = document.querySelector(".section-right");
var listEntry = document.querySelector(".input-task-items-list");
var createTaskItem = document.querySelector(".btn-add-item");
var cardTaskList = document.querySelector(".task-list");
var deleteButton = document.querySelector(".delete-card-btn");
var checkTask = document.querySelector(".checkbox-img");
var clearListItems = document.querySelector(".btn-input-clear");
var taskCardArray = [];
var taskItemArray = [];
let toDolist = new ToDoList ();
var taskArrayIdx = 0;
var isChecked = false;

// ---------------Event-listeners---------------------------//
window.addEventListener('load', setup(), true);
createTaskList.addEventListener('submit', addTaskCard);
createTaskItem.addEventListener('click', addTaskItem);
sectionRight.addEventListener('click', deleteCard);
sectionRight.addEventListener('click', flipCheckbox);
sectionRight.addEventListener('click', deleteTaskItemList);






//-----------------Functions-------------------------------//
function addTaskCard (e) {
  e.preventDefault();
  console.log(e);
  const taskTitle = (this.querySelector('[name=task-title]')).value;
  // const taskItem = (this.querySelector('[name=task-item]')).value;
  var cardID = Date.now();
  indexCntr = 0;

  toDoList = new ToDoList(cardID, taskTitle, false, taskItemArray);
 taskCardArray[taskArrayIdx] = toDoList;

  // console.log(toDoList);
  this.reset();
  // taskItemArray.push(task);
  // createTaskCard(taskItemArray, taskList);
  createTaskCard(toDoList, indexCntr);
  addTaskItems2Card(toDoList, indexCntr);
  deleteTaskItemList();
  storeCards(taskCardArray);
  taskArrayIdx++;
}

function addTaskItem(e) {
  console.log(e);
  e.preventDefault();
  const taskItem = (document.querySelector('[name=task-item]')).value;
  // var taskItem = taskItem.value;
  console.log(taskItem);
  const item = {
    content: taskItem, 
    done: false
  };
  taskItemArray.push(item);
  console.log(taskItemArray);
  document.querySelector('[name=task-item]').value = '';
  createTaskItemList(item);
}

function storeCards(objTaskList){
  toDolist.saveToStorage(objTaskList);
}
 function createTaskItemList(itemList) {
   listEntry.innerHTML += `
    <li class="list-entry">
      <img class="checkbox-img" src="assets/delete.svg">
      <p class="task-content">${itemList.content}</p>
    </li>
   `
 }
 function deleteTaskItemList() {
   listEntry.innerHTML = ``;
 }
  function createTaskCard(taskList, index) {
    console.log(taskList);
    var taskItems = addTaskItems2Card(taskList, index);
  sectionRight.innerHTML = `
  <aside class="card" data-cardIdentifier="${taskList.id}">
  <p class="card-title-text">${taskList.title}
  </p>
    <div class="card-body">
      <ul class="task-list">
        ${taskItems}
      </ul>
   </div>
   <div class="card-footer">
      <img class="urgent-flash-btn" src="assets/urgent.svg" alt="filter by urgent task">
      <h2>Fuck:<span class="send-a-message">Off</span></h2>
      <img class="delete-card-btn" src="assets/delete.svg" alt="delete task card">
    </div>
  </aside>
   `  + sectionRight.innerHTML; 
}

function deleteCard(e) {
  // console.log(e);
  if (e.target.className === "delete-card-btn") { 
    alert('Fuck off!');
    var card = e.target.closest(".card");
    var rtrndArray = toDoList.deleteFromStorage(card.dataset.cardidentifier);
  //  console.log('cardArray after deleteCard function: ' + cardArray);
    e.target.closest(".card").remove();
  }
};

function flipCheckbox(e) {
  if(e.target.className === "checkbox-img") {
    alert('Fuck off Checkbox Style!');
    var checkBox = e.target.id;
 console.log(checkBox);

    (isChecked) ? e.target.src = "assets/checkbox.svg" : e.target.src = "assets/checkbox-active.svg";
    (isChecked) ? isChecked = false : isChecked = true;
  }
}

function addTaskItems2Card(items2Add, index){
  var idCntr = 0;
  var taskListHTML = items2Add.tasks.map((tasks, i) => {
    idCntr++;
    index = items2Add.id + idCntr.toString();
    return `
   <li class="list-item" data-index=${index}li id=${index}li>
     <img class="checkbox-img" src="assets/checkbox.svg" data-index=${index}img  id="item${index}img" alt="card checkbox">
     <input type="checkbox"  class="hidden task-checkbox" data-index=${index}cbx  id="item${index}cbx"${items2Add.tasks.done ? 'chcecked' : ''} 
     <label for="">${items2Add.tasks[idCntr - 1].content}</label>
   </li>
   `;
  }).join('');
  return taskListHTML;
}

function checkTaskInputs () {
  var titleInput = cardTitleInput.value;
  var bodyInput = cardBodyInput.value;
  if (titleInput === "" || bodyInput === "") {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

  function setup() {
    if(localStorage.getItem('cardArray')){
      var getTaskArray = localStorage.getItem('cardArray');
      var currentTaskInfo = JSON.parse(getTaskArray);
      currentTaskInfo.forEach(function(toDoList){
        createTaskCard(toDoList);  
        // cardArray.push(idea);
        toDoList = new ToDoList(toDoList.id, toDoList.title, toDoList.false, toDoList.tasks);
        taskCardArray[taskArrayIdx] = toDoList;
        taskArrayIdx++;
      });
    }

  }




  // <li>
  // <img class="checkbox-img" src="assets/checkbox.svg" alt="card checkbox">
  // <input type="checkbox" class="hidden" data-index=${index} id="item-${index}" ${taskList.completed ? 'checked' : ''} 
  // <label for="item${index}">${taskList.tasks}</label>
  // </li>

  // function addTaskCard (e) {
//   e.preventDefault();
//   const taskTitle = (this.querySelector('[name=task-title]')).value;
//   const taskItem = (this.querySelector('[name=task-item]')).value;
  
//   const task = {
//     taskTitle,
//     taskItem,
//     completed: false
//   };

//   console.log(task);
//   this.reset();
//   taskItemArray.push(task);
//   createTaskCard(taskItemArray, taskList);
// }

// function createTaskCard(taskArray, taskList) {