// const firstNavButton = document.querySelector('.main-navigation__button-item');
// firstNavButton.addEventListener('click', (event) => {
//     console.log(event.target);
//     // const target = event.target;
//     const {target} = event;
//     target.classList.add('main-navigation__button-item_selected') 
// })

const allNavButton = document.querySelectorAll('.main-navigation__button-item');
allNavButton.forEach((button) => {
    button.addEventListener('click', (event) => {
        allNavButton.forEach((button) => {
            button.classList.remove('main-navigation__button-item_selected')
        });
        const { target } = event;
        target.classList.add('main-navigation__button-item_selected')
    })
})   



const createTaskForm = document.querySelector('.create-task-block');
createTaskForm.addEventListener('submit', (event) => {
    // console.log(event);
    event.preventDefault();
    const { target } = event;
    const taskNameInput = target.taskName;
    const inputValue = taskNameInput.value;

    const newTask = document.createElement('li');
    newTask.className = 'task-item';
    newTask.dataset.id = Date.now();
    
    const tastItemMainContainer = document.createElement('div');
    tastItemMainContainer.className = 'task-item__main-container';
    newTask.append(tastItemMainContainer);

    const taskItemMainContent = document.createElement('div');
    taskItemMainContent.className = 'task-item__main-content';
    tastItemMainContainer.append(taskItemMainContent);

    const checkboxForm = document.createElement('form');
    checkboxForm.className = 'checkbox-form';
    taskItemMainContent.append(checkboxForm);

    const inputOfForm = document.createElement('input');
    inputOfForm.className = 'checkbox-form__checkbox';
    inputOfForm.type = 'checkbox';
    inputOfForm.dataset.id = `task-${Date.now()}`;
    checkboxForm.append(inputOfForm);

    const labelOfForm = document.createElement('label');
    labelOfForm.className = `task-${Date.now()}`;
    checkboxForm.append(labelOfForm);

    const spanOfForm = document.createElement('span');
    spanOfForm.className = 'task-item__text';
    spanOfForm.textContent = inputValue;
    taskItemMainContent.append(spanOfForm);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-item__delete-button';
    deleteButton.textContent = 'Удалить';
    tastItemMainContainer.append(deleteButton);


    const taskList = document.querySelector('.tasks-list');
    taskList.append(newTask);

    // console.log(inputValue);
    // if (inputValue) {
    //     alert (`Вы создали задачу ${inputValue}`)
    // } else {
    //     alert('Введите правильные данные')
    // }
})

const createToolTip = (text) => {
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;

    return tooltip;
}

document.addEventListener('mouseover', (event) => {
    const { target } = event;
    const mouseOverDeleteBtn = target.className.includes('task-item__delete-button');
    if (mouseOverDeleteBtn) {
        const tasItemHTML = target.closest('.task-item');
        if (tasItemHTML) {
            const taskDeleteMess = createToolTip('Удалить задачу?');
            target.append(taskDeleteMess);
        }
    }
})


document.addEventListener('mouseout', (event) => {
    const { target } = event;
    const mouseOutDeleteBtn = target.className.includes('task-item__delete-button');
    if (mouseOutDeleteBtn) {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
})

const taskNameInputOnValidation = (value) => {
    if(!value || value.includes('@')) {
        return false
    }
    return true
}

const createTaskBlockError = document.querySelector('.create-task-block');
const taskNameInput = createTaskBlockError.querySelector('.create-task-block__input');

taskNameInput.addEventListener('input', (event) => {
    const { target } = event;
    const { value } = target;
    const isValid = taskNameInputOnValidation(value);
    const messegeBlockFromDOM = document.querySelector('.error-message-block');

    if (!isValid) {
        const newMessBlock = document.createElement('span');
        newMessBlock.className = 'error-message-block';
        newMessBlock.textContent = 'Ошибка ввода';
        createTaskBlockError.append(newMessBlock)
    } else if (isValid && messegeBlockFromDOM) {
        messegeBlockFromDOM.remove()
    }
})



buttonDelete.addEventListener('click', (event) => {
    const { target } = event;
    const buttonDelete = document.querySelector(`[data-task-id]=${target}`);
    if (buttonDelete) {
        const deleteConfirmed = confirm('Вы уверены?');
        if(deleteConfirmed) {
            buttonDelete.remove();
        }
    }
}) 