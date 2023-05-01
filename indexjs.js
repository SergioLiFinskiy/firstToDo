// Find element
const form = document.querySelector('.create-task-block');
const taskInput = document.querySelector('.create-task-block__input');
const taskList = document.querySelector('.tasks-list');

form.addEventListener('submit', addTask);

taskList.addEventListener('click', deleteTask);

taskList.addEventListener('click', doneTask);

function addTask (event) {
    // Stop restart
    event.preventDefault();

    // Take value from form
    const taskText = taskInput.value;

    // Make task
    const taskHTML = `<li class="task-item" data-task-id="1">
                        <div class="task-item__main-container">
                            <div class="task-item__main-content">
                                <form class="checkbox-form">
                                <input class="checkbox-form__checkbox" type="checkbox" id="task-1">
                                <label for="task-1"></label>
                                </form>
                                <span class="task-item__text">${taskText}</span>
                            </div>
                            <button data-action = "delete" class="task-item__delete-button default-button delete-button" data-delete-task-id="5">
                                Удалить
                            </button>
                        </div>
                    </li>`;
    
    // Task in list
    taskList.insertAdjacentHTML('beforeend',taskHTML);

    // Null of value on start
    taskInput.value = "";
    taskInput.focus()
}

function deleteTask(event) {
   if (event.target.dataset.action === "delete") {
   
    const parentNote = event.target.closest('.task-item');
    parentNote.remove()
   }
}

function doneTask(event) {

}