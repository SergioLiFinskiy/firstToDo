// Добавить сортировку по исполнителям 
// Добавить выпадающее меню исполнителей по списку задач (Z-index)
// Скорректировать верстку (Padding или margin у контейнера, что бы кнопка создать и поля формы уменьшались)
// Добавить отметку выполнения выполненных задач (перечеркивание текста задачи при постановке галочки) + напоминание об удалении
// Графики на дашборде
// Общий рефакторинг перед отправкой Ромке

// Find element
const   form = document.querySelector('.create-task-block'),
        taskInfo = document.querySelector('.task-item__main-content_info'),
        taskInputWords = document.querySelector('#createNewTask'),
        taskInputName = document.querySelector('#selectedContractor'),
        taskInputData = document.querySelector('#createDeadline'),
        taskList = document.querySelector('.tasks-list'),
        allNavButton = document.querySelectorAll('.main-navigation__button-item'),
        checkBox = document.querySelectorAll('.checkbox-form__checkbox');
        
let tasks = [];
let taskSortOfName = [];
let taskSortUniq = [];

if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach((task) => {
    const taskHTML = `
    <li class="task-item" id=${task.id}>
        <div class="task-item__main-container">
            <div class="task-item__main-content">
                <form class="checkbox-form">
                <input class="checkbox-form__checkbox" type="checkbox" id="task-1">
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
    
    // Task in list
    taskList.insertAdjacentHTML('beforeend',taskHTML);
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

function addTask (event) {
    // Stop restart
    event.preventDefault();

    // Take value from form
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

    // Make task
    const taskHTML = `
    <li class="task-item" id=${newTask.id}>
        <div class="task-item__main-container">
            <div class="task-item__main-content">
                <form class="checkbox-form">
                <input class="checkbox-form__checkbox" type="checkbox" id="task-1">
                <label for="task-1"></label>
                </form>
                <div class="task-item__main-content_info">
                    <div class="task-item__text">${newTask.text}</div>
                    <div class="task-item__name">${newTask.name}</div>
                    <div class="task-item__data">${newTask.date}</div>
                </div>
                </div>
            </div>
            <button data-action = "delete" class="task-item__delete-button default-button delete-button" data-delete-task-id="5">
                Удалить
            </button>
        </div>
    </li>`
    
    // Task in list
    taskList.insertAdjacentHTML('beforeend',taskHTML);

    // Null of value on start
    taskInputWords.value = "";
    taskInputName.value = "";
    taskInputData.value = "";
    taskInputWords.focus()
}

function deleteTask(event) {
   if (event.target.dataset.action === "delete") {
    const parentNote = event.target.closest('.task-item');

    const id = Number(parentNote.id); 
    tasks = tasks.filter((task) => task.id !== id)
    saveToLocalStorage();
    parentNote.remove()
   }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function sortOfName() {
    for (let i = 0; i <= taskSortUniq.length; i++) {
        let optn = taskSortUniq[i];
        let el = document.createElement("option");
        let select = document.querySelector('#sortName');
        el.textContent = optn;
        el.value = optn;
        select.appendChild(el);
    } 
}