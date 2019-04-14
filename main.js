// ---------------Query-selectors-------  -------------------//
var createTaskList = document.querySelector(".add-task-card");
var taskList = document.querySelector(".task-list");

const taskItemArray = [];



// ---------------Event-listeners---------------------------//
createTaskList.addEventListener('submit', addTaskCard);






//-----------------Functions-------------------------------//
function addTaskCard (e) {
  e.preventDefault();
  const taskTitle = (this.querySelector('[name=task-title]')).value;
  const taskItem = (this.querySelector('[name=task-item]')).value;
  
  const task = {
    taskTitle,
    taskItem,
    completed: false
  };

  console.log(task);
  this.reset();
  taskItemArray.push(task);
  createTaskCard(taskItemArray, taskList);
}

function createTaskCard(taskArray, taskList) {
  taskList.innerHTML = taskArray.map((task, i) => {
    return `
    <li>
      <img class="checkbox-img" src="assets/checkbox.svg" alt="card checkbox">
      <input type="checkbox"  data-index=${i} id="item${i}" ${task.completed ? 'chcecked' : ''} 
      <label for="">${taskArray.taskItem}</label>
    </li>`;
  }).join('');
}