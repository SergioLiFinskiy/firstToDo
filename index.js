
const   form = document.querySelector('.create-task-block'),
        taskInfo = document.querySelector('.task-item__main-content_info'),
        taskInputWords = document.querySelector('#createNewTask'),
        taskInputName = document.querySelector('#selectedContractor'),
        taskInputData = document.querySelector('#createDeadline'),
        taskList = document.querySelector('.task-list_panel'),
        allNavButton = document.querySelectorAll('.main-navigation__button-item'),
        checkBox = document.querySelectorAll('.checkbox-form__checkbox'),
        select = document.querySelector('#sortName'),
        taskItem = document.querySelectorAll('.task-item');
        
let tasks = [];
let taskSortOfName = [];
let taskSortUniq = [];

tasks.forEach((task) => {
    renderTask (task);
})

if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    taskSortOfName = JSON.parse(localStorage.getItem('name'));
    taskSortUniq = JSON.parse(localStorage.getItem('sortName'));
}

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

    //Adding an option to select with a uniqueness check
    if (taskSortUniq.indexOf(newTask.name) != -1) {
        console.log('Этот уже есть')}

    else {
        let el = document.createElement("option");     
        el.textContent = newTask.name;
        el.value = newTask.name;
        select.appendChild(el);
    }

    tasks.push(newTask);
    taskSortOfName.push(newTask.name);
    taskSortUniq = Array.from(new Set(taskSortOfName));
    // taskSortUniq = taskSortOfName.filter((item, index) => {
    //     return taskSortOfName.indexOf(item) === index;
    // })

    saveToLocalStorage();

    // Make task
    renderTask(newTask); 

    // Null of value on start
    taskInputWords.value = "";
    taskInputName.value = "";
    taskInputData.value = "";
    taskInputWords.focus();
}

function renderTask (task) {
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
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('name', JSON.stringify(taskSortOfName));
    localStorage.setItem('sortName', JSON.stringify(taskSortUniq));
}

function clearPositionOfLocalStorage() {
    localStorage.removeItem('tasks');
    localStorage.removeItem('name');
    localStorage.removeItem('sortName');
}

function deleteTask(event) {
    if (event.target.dataset.action === "delete") {
        const parentNote = event.target.closest('.task-item');

        const id = Number(parentNote.id); 


        nameInTask = document.querySelector('.task-item__name');
        const name = nameInTask.value; 
        tasks = tasks.filter((task) => task.id !== id);
        // Проверить индексы при удалении, а то фигово список выводит

        taskSortOfName.splice(taskSortOfName.indexOf(name), 1);

        taskSortUniq = Array.from(new Set(taskSortOfName));


        // removechild javascript определенных элементов - загуглить
        
        if (taskSortUniq.indexOf() == -1) {
            let optionCollection = document.getElementsByTagName("option");
            allOption = Array.from(optionCollection);
            let uniqOptions = allOption.map(elem => {return elem.innerText});
            let indexOptions = uniqOptions.indexOf(name);
            // let children = select.children;
            select.removeChild(select.children[indexOptions])
            console.log(select)}
        else {
            console.log('Этот исполнитель уже отсутсвует')
        }

        saveToLocalStorage();    
        // clearPositionOfLocalStorage();
        parentNote.remove();    
    }
}

form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);



