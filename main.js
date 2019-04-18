// ---------------Query-selectors-------  -------------------//
var createTaskList = document.querySelector(".add-task-card");
var taskList = document.querySelector(".task-list");
var sectionRight = document.querySelector(".section-right");
var sectionLeft = document.querySelector(".section-left");
var listEntry = document.querySelector(".input-task-items-list");
var createTaskItem = document.querySelector(".btn-add-item");
var cardTaskList = document.querySelector(".task-list");
var deleteButton = document.querySelector(".delete-card-btn");
var checkTask = document.querySelector(".checkbox-img");
var clearListItems = document.querySelector(".btn-input-clear");
var makeCardButton = document.querySelector(".submit-make-list");
var inputCardTitle = document.querySelector("#input-labels-task-title-input");
var inputTaskItem = document.querySelector("#input-item");
var searchBox = document.querySelector("#search-input");
var deleteTaskButton = document.querySelector(".checkbox-image")
var buttonFilterUrgent = document.querySelector(".btn-filter-urgent");

var taskCardArray = [];
var taskItemArray = [];
var toDolist = new ToDoList();
var taskArrayIdx = 0;
var isChecked = false;

// ---------------Event-listeners---------------------------//
window.addEventListener('load', setup(), true);
createTaskList.addEventListener('submit', addTaskCard);
createTaskItem.addEventListener('click', addTaskItem);
sectionRight.addEventListener('click', deleteCard);
sectionRight.addEventListener('click', flipCheckbox);
clearListItems.addEventListener('click', deleteTaskItemList);
inputCardTitle.addEventListener('keyup', checkCardInputs);
inputTaskItem.addEventListener('keyup', checkCardInputs);
searchBox.addEventListener('keyup', searchRealtime);
listEntry.addEventListener('click', deleteTaskItem);
buttonFilterUrgent.addEventListener('click', filterByUrgent);


//-----------------Functions-------------------------------//
function addTaskCard (e) {
  if (e.target.className === "add-task-card") {
  e.preventDefault();
  const taskTitle = (this.querySelector('[name=task-title]')).value;
  var cardID = Date.now();
  var taskStatus = true;
  indexCntr = 0;
  toDoList = new ToDoList(cardID, taskTitle, taskStatus, taskItemArray);
  taskCardArray[taskArrayIdx] = toDoList;
  this.reset();
  if (e.target.className !== "btn-input-clear") {
  createTaskCard(toDoList, indexCntr);
  addTaskItems2Card(toDoList, indexCntr);
  deleteTaskItemList();
  storeCards(taskCardArray);
  taskArrayIdx++;
  checkCardInputs();
  checkItemLists();
}
}
}

function addTaskItem(e) {
  if (e.target.className === "btn-add-item")
  e.preventDefault();
  if (inputTaskItem.value !== '') {
  const taskItem = (document.querySelector('[name=task-item]')).value;
  const item = {
    content: taskItem, 
    done: false
  };
  taskItemArray.push(item);
  document.querySelector('[name=task-item]').value = '';
  createTaskItemList(item);
  checkItemLists();
}
else {
  alert('Task list cannot be empty!');
}
}

function storeCards(objTaskList){
  toDolist.saveToStorage(objTaskList);
}

 function createTaskItemList(itemList) {
   listEntry.innerHTML += `
    <div class="list-entry">
      <img class="checkbox-img" src="assets/delete.svg">
      <p class="task-content">${itemList.content}</p>
    </div>
   `
   checkCardInputs();
 }

 function deleteTaskItemList() {
   listEntry.innerHTML = ``;
   taskItemArray = [];
   checkItemLists();
   checkCardInputs();
 }

  function createTaskCard(taskList, index) {
    console.log(taskList);
    var taskItems = addTaskItems2Card(taskList, index);
  sectionRight.innerHTML = `
  <aside class="card" data-cardIdentifier="${taskList.id}">
  <p class="card-title-text">${taskList.title}</p>
    <div class="card-body">
      <p class="task-list">
        
      </p><p>${taskItems}</p>
   </div>
   <div class="card-footer">
      <div class="card-footer-btn-container">
        <img class="urgent-flash-btn" src="${taskList.urgent ? 'assets/urgent-active.svg' : 'assets/urgent.svg'}" alt="filter by urgent task">
        <p class="card-footer-text">URGENT</p>
      </div>
      <div class="card-footer-btn-container">
        <img class="delete-card-btn" src="assets/delete.svg" alt="delete task card">
        <p class="card-footer-text">DELETE</p>
      </div>
    </div>
  </aside>
   `  + sectionRight.innerHTML;
}


function deleteCard(e) {
  if (e.target.className === "delete-card-btn") { 
    var card = e.target.closest(".card");
   toDoList.deleteFromStorage(card.dataset.cardidentifier);
    e.target.closest(".card").remove();
  } else if (e.target.className === "urgent-flash-btn") {
    var card = e.target.closest(".card")
    toDolist.updateToDo(card.dataset.cardidentifier);
  }
};

function deleteTaskItem(e) {
  if(e.target.className === "checkbox-img") {
  var listItem = e.target.closest(".list-entry");
  e.target.closest(".list-entry").remove();
  }
};

function filterByUrgent () {
  if (e.target.className === "btn-filter-urgent") {
  console.log('Yeah baby!');
  if(buttonFilterUrgent.style.background == '#1F1F3D') {
    buttonFilterUrgent.style.background='#EF4A23';
    buttonFilterUrgent.style.color='#ffffff';
  } else {
    buttonFilterUrgent.style.background='#1F1F3D';
    buttonFilterUrgent.style.color='#FFFFFF';
  }
}
}

function makeFakeCard() {
  toDolist = new ToDoList();
}

function flipCheckbox(e) {
  if(e.target.className === "checkbox-img") {
    var checkBox = e.target.id;
    var listItem = e.target.closest(".list-item");
    console.log(listItem.dataset.index);
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
   <div class="list-item" data-index=${index}li id=${index}li>
     <img class="checkbox-img" src="${items2Add.tasks[idCntr-1].done ? 'assets/checkbox-active.svg' : 'assets/checkbox.svg'}" data-index=${index}img  id="${index}img" alt="card checkbox">
     <input type="checkbox"  class="hidden task-checkbox" data-index=${index}cbx  id="${index}cbx"${items2Add.tasks.done ? 'checked' : ''} 
     <label for="">${items2Add.tasks[idCntr - 1].content}</label>
   </div>
   `;
  }).join('');
  return taskListHTML;
}

function checkCardInputs () {
  var titleInput = inputCardTitle.value;
  var taskItems = document.querySelector('.list-entry');
  if (titleInput === "" ||  taskItems === null) {
    makeCardButton.disabled = true;
    makeCardButton.style.background='lightgrey';
  } else {
    makeCardButton.disabled = false;
    makeCardButton.style.background='#1F1F3D';
  }
}

  function checkItemLists () {
    var titleInput = inputCardTitle.value;
    var taskItems = document.querySelector('.list-entry');
    if (taskItems === null) {

      clearListItems.disabled = true;
      clearListItems.style.background='lightgrey';
    } else {
      clearListItems.disabled = false;
      clearListItems.style.background='#1F1F3D';
  }
}

function searchRealtime(subStrInput){
  var subString = searchBox.value;
  var searchArray = taskCardArray;
  var arrayTitle = searchArray.filter(search => search.title.toLowerCase().includes(subString.toLowerCase()));
  sectionRight.innerHTML = '';
  arrayTitle.forEach(function(taskCard) {
    createTaskCard(taskCard);
    });
  }

  function setup() {
    checkCardInputs();
    checkItemLists();
    if(localStorage.getItem('cardArray')){
      var getTaskArray = localStorage.getItem('cardArray');
      var currentTaskInfo = JSON.parse(getTaskArray);
      currentTaskInfo.forEach(function(toDoList){
      createTaskCard(toDoList);  
      toDoList = new ToDoList(toDoList.id, toDoList.title, toDoList.false, toDoList.tasks);
      taskCardArray[taskArrayIdx] = toDoList;
      taskArrayIdx++;
      });
    }
  }
