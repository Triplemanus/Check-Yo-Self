class ToDoList {
    constructor(id, title, urgent, tasks) {
        this.id = id;
        this.title = title;
        this.urgent = urgent || false;
        this.tasks = tasks || [];
    }
    saveToStorage(taskList) {
        var stringifiedContact = JSON.stringify(taskList);
        localStorage.setItem('cardArray', stringifiedContact);
    }

    deleteFromStorage() {
        var arrayIndx = 0;
        var getTaskArray = localStorage.getItem('cardArray');
        var deleteArray = JSON.parse(getTaskArray);
        var filteredArray = deleteArray.filter(cArray => cArray.id !== parseInt(deleteCard));
         cardArray= [];
        //localStorage.clear();
        filteredArray.forEach(function(el) {
          toDoList = new ToDoList(el.id, el.title, el.tasks);
          taskCardArray[arrayIndx] = toDoList;
          arrayIndx++
        })
        taskArrayIdx--;
        var stringifiedCardArray = JSON.stringify(taskCardArray);
        localStorage.setItem('cardArray', stringifiedCardArray);
      }

    updateToDo() {

    }

    updateTask() {
        
    }
}

class TaskItems {
    constructor(item, condition) {
        this.item = item,
        this.condition = condition || false,
        this.id = Date.now();
    }
}