let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

const taskCheckBox = document.querySelectorAll('.custom-checkbox');


function fetchFromAPI(){
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
       tasks = data;
       renderList();
    });
}
console.log('Working');

// Divide the whole project into smaller functions, that increases readability and makes task easy
function toggleTask(taskId) {
  for(let i in tasks){
      if(tasks[i].id==taskId){
          tasks[i].completed = !tasks[i].completed;
          renderList();
          showNotification('Task toggled successfully');
          return;
      }
  }
  
}

function addTasktoDOM(task){
    let li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.completed? 'checked': ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="bin.png" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);

}


function renderList () {
    taskList.innerHTML = "";
   for(let i=0;i<tasks.length;i++){
       addTasktoDOM(tasks[i]);
   }
//    addListner();
console.log(document.querySelectorAll('.custom-checkbox'));
   tasksCounter.innerText = tasks.length;
}




function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id != taskId;
    });
    tasks = newTasks;

    renderList();

    console.log(tasks);
    showNotification('Task deleted successfully');
}

function addTask (task) {
    tasks.push(task);
    renderList();
    console.log(tasks);
    showNotification("Task added successfully");

}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e){
    if(e.key==='Enter'){
        const text = e.target.value;
        if(!text){
            showNotification('Please enter the task');
            return;
        }

        const task = {
            "title": text,
            "id" : Date.now(),
            "completed" : false
        }
        addTask(task);

        e.target.value = "";
    }
}

addTaskInput.addEventListener('keyup',handleInputKeypress);


//Event deligation

function handleListeningEvents (e){
   const target = e.target;
   console.log(target);

   if(target.classList.contains('custom-checkbox')){
       const taskId = target.dataset.id;
       toggleTask(taskId);
   }
   else if(target.className === 'delete'){
       const taskId = target.dataset.id;
       deleteTask(taskId);
   }
}
document.addEventListener('click',handleListeningEvents);

fetchFromAPI();