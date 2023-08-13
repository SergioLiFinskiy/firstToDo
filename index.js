
// Графики на дашборде
// Общий рефакторинг перед отправкой

const   form = document.querySelector('.create-task-block'),
        taskInfo = document.querySelector('.task-item__main-content_info'),
        taskInputWords = document.querySelector('#createNewTask'),
        taskInputName = document.querySelector('#selectedContractor'),
        taskInputData = document.querySelector('#createDeadline'),
        taskList = document.querySelector('.task-list_panel'),
        allNavButton = document.querySelectorAll('.main-navigation__button-item'),
        checkBox = document.querySelectorAll('.checkbox-form__checkbox'),
        select = document.querySelector('#sortName'),
        selectBtn = document.querySelector('.sortName_btn');

        

let tasks = [];
let taskSortOfName = [];
let taskSortUniq = [];



if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    taskSortOfName = JSON.parse(localStorage.getItem('name'));
    taskSortUniq = JSON.parse(localStorage.getItem('sortName'));
}

tasks.forEach((task) => {
    renderTask (task);
})

allNavButton.forEach((button) => {
    button.addEventListener('mouseover', (event) => {
        allNavButton.forEach((button) => {
            button.classList.remove('main-navigation__button-item_selected')
        });
        const { target } = event;
        target.classList.add('main-navigation__button-item_selected');
    })

    button.addEventListener('mouseout', (event) => {
        const { target } = event;
        target.classList.remove('main-navigation__button-item_selected');    
    })
}) 

form.addEventListener('submit', addTask);

taskList.addEventListener('click', deleteTask);

taskList.addEventListener('click', doneTask);

selectBtn.addEventListener('click', sortOfName);

function addTask (event) {
    event.preventDefault();

    const taskText = taskInputWords.value;
    const taskName = taskInputName.value;
    const taskData = taskInputData.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        name: taskName,
        date: taskData,
        done: false,
    };

    tasks.push(newTask);
    taskSortOfName.push(newTask.name);
    taskSortUniq = Array.from(new Set(taskSortOfName));
    
    saveToLocalStorage();

    renderTask(newTask);

    taskInputWords.value = "";
    taskInputName.value = "";
    taskInputData.value = "";
    taskInputWords.focus();
}

function deleteTask(event) {
   if (event.target.dataset.action === "delete") {
    const parentNoteId = event.target.closest('.task-item');
    const id = Number(parentNoteId.id); 
    const uniqName = String(parentNoteId.dataset.value);
    tasks = tasks.filter((task) => task.id !== id);

    const deleteItemFromTaskSortOfName = (names) => {
        const index = names.indexOf(uniqName)
        names.splice(index, 1)
        return names
    }

    deleteItemFromTaskSortOfName(taskSortOfName)

    taskSortUniq = Array.from(new Set(taskSortOfName));

    clearPositionOfLocalStorageTasks();
    clearPositionOfLocalStorageName();
    clearPositionOfLocalStorageUniqName();

    saveToLocalStorage();
    parentNoteId.remove();
   }
}

for (let i = 0; i < taskSortUniq.length; i++) {
    let optn = taskSortUniq[i];
    let el = document.createElement("option");     
    el.text = optn;
    el.value = optn;
    select.appendChild(el);
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('name', JSON.stringify(taskSortOfName));
    localStorage.setItem('sortName', JSON.stringify(taskSortUniq));
}

function clearPositionOfLocalStorageTasks() {
    localStorage.removeItem('tasks', JSON.stringify(tasks));
}

function clearPositionOfLocalStorageName() {
    localStorage.removeItem('sortName', JSON.stringify(taskSortUniq));
}

function clearPositionOfLocalStorageUniqName() {
    localStorage.removeItem('sortName', JSON.stringify(taskSortUniq));
}

function renderTask (task) {
    const taskHTML = `
    <li class="task-item" id=${task.id} data-value='${task.name}' >
        <div class="task-item__main-container">
            <div class="task-item__main-content">
                <form class="checkbox-form">
                <input class="checkbox-form__checkbox" type="checkbox" data-action='${task.done}'>
                <label for="task-1"></label>
                </form>
                <div class="task-item__main-content_info">
                    <div class="task-item__text">${task.text}</div>
                    <div class="task-item__name">${task.name}</div>
                    <div class="task-item__data">${task.date}</div>
                </div>
                </div>
            </div>
            <button data-action = "delete" class="task-item__delete-button default-button delete-button" data-delete-task-id="5">
                Удалить
            </button>
        </div>
    </li>`
    taskList.insertAdjacentHTML('beforeend',taskHTML);
}

function sortOfName() {
    const taskItem = document.getElementsByTagName('li');
    let arrayFromTaskItem = Array.from(taskItem);
    for(let i = 0; i < arrayFromTaskItem.length; i++) {
        if (select.value === "" || arrayFromTaskItem[i].dataset.value === select.value) {
            arrayFromTaskItem[i].classList = 'task-item';
            arrayFromTaskItem[i].style.order = 1;
        } else {
            arrayFromTaskItem[i].classList = 'task-item_invisible';
            arrayFromTaskItem[i].style.order = -1;
        }
    }
}

function doneTask(event) {
    if(event.target.dataset.action === "false"){
        const parentNode = event.target.closest('.task-item');
        const taskTitle = parentNode.querySelector('.task-item__text')
        taskTitle.classList.toggle('task-item__text--done')
    }
}