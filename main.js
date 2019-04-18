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
var makeCardButton = document.querySelector(".submit-make-list");
var inputCardTitle = document.querySelector("#input-labels-task-title-input");
var inputTaskItem = document.querySelector("#input-item");
var searchBox = document.querySelector("#search-input");
var deleteTaskButton = document.querySelector(".checkbox-image")

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

//-----------------Functions-------------------------------//
function addTaskCard (e) {
  e.preventDefault();
  const taskTitle = (this.querySelector('[name=task-title]')).value;
  var cardID = Date.now();
  indexCntr = 0;
  toDoList = new ToDoList(cardID, taskTitle, false, taskItemArray);
 taskCardArray[taskArrayIdx] = toDoList;
  this.reset();
  createTaskCard(toDoList, indexCntr);
  addTaskItems2Card(toDoList, indexCntr);
  deleteTaskItemList();
  storeCards(taskCardArray);
  taskArrayIdx++;
  checkCardInputs();
  checkItemLists();
}

function addTaskItem(e) {
  e.preventDefault();
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
   checkCardInputs();
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
      <div>
        <img class="delete-card-btn" src="assets/delete.svg" alt="delete task card">
        <p>DELETE</p>
      </div>  
    </div>
  </aside>
   `  + sectionRight.innerHTML; 
}

function deleteCard(e) {
  // console.log(e);
  if (e.target.className === "delete-card-btn") { 
    var card = e.target.closest(".card");
   toDoList.deleteFromStorage(card.dataset.cardidentifier);
  //  console.log('cardArray after deleteCard function: ' + cardArray);
    e.target.closest(".card").remove();
  } else if (e.target.className === "urgent-flash-btn") {
    console.log('YeeHaaaa!!!');
    var card = e.target.closest(".card")
    toDolist.updateToDo(card.dataset.cardidentifier);

  }
};

function deleteTaskItem(e) {
  console.log(e);
  console.log('Hot damn, we made it!');
  if(e.target.className === "checkbox-img") {
  var listItem = e.target.closest(".list-entry");
  console.log(listItem);
  e.target.closest(".list-entry").remove();
  }
};

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
   <li class="list-item" data-index=${index}li id=${index}li>
     <img class="checkbox-img" src="assets/checkbox.svg" data-index=${index}img  id="${index}img" alt="card checkbox">
     <input type="checkbox"  class="hidden task-checkbox" data-index=${index}cbx  id="${index}cbx"${items2Add.tasks.done ? 'chcecked' : ''} 
     <label for="">${items2Add.tasks[idCntr - 1].content}</label>
   </li>
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
  // console.log('Search input value = ' + subString);
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

  //<h2><span class="send-a-message"></span></h2>