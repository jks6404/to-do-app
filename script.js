const task_input = document.querySelectorAll('input');
const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');
const alert_message = document.querySelector('.alert-message');
const delete_all_btn = document.querySelector('.delete-all-btn');


let todos = JSON.parse(localStorage.getItem('todos')) || [];

window.addEventListener('DOMContentLoaded', showAllTodos);

//get random unique id
function getRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function addToDo(task_input) {
    let task = {
        id: getRandomId(),
        task: task_input[0].value,
        completed: false,
        time:task_input[1].value
    }
    todos.push(task);
}


add_btn.addEventListener('click', () => {
    if (task_input[0].value === '') {
        showAlertMessage('Please enter a task', 'error');
    } else {
        addToDo(task_input);
        saveToLocalStorage();
        showAllTodos();
        task_input[0].value = '';
        showAlertMessage('Task added successfully', 'success');
    }
});

delete_all_btn.addEventListener('click', clearAllTodos);

//show all todos
function showAllTodos() {
    todos_list.innerHTML = '';
    todos.forEach((todo) => {
        todos_list.innerHTML += `
            <li class="todo-item" data-id="${todo.id}">
            <div style='display:flex , flex-direction:column'>
            <p class="task-body">
                ${todo.task}          
            </p>
            <p class="task-body">
                ${todo.time}          
            </p>
            </div>
                
                <div class="todo-actions">
                    <button class="btn btn-success" onclick="editTodo('${todo.id}')">
                        <i class="bx bx-edit-alt bx-sm"></i>    
                    </button>
                    <button class="btn btn-error" onclick="deleteTodo('${todo.id}')">
                        <i class="bx bx-trash bx-sm"></i>
                    </button>
                </div>
            </li>
        `;
    });
}

//save todos to local storage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//show alert message
function showAlertMessage(message, type) {
    let alert_box = `
        <div class="alert alert-${type} shadow-lg mb-5 w-full">
            <div>
                <span>
                    ${message}
                </span>
            </div>
        </div>
    `
    alert_message.innerHTML = alert_box;
    alert_message.classList.remove('hide');
    alert_message.classList.add('show');
    setTimeout(() => {
        alert_message.classList.remove('show');
        alert_message.classList.add('hide');
    }, 3000);
}

//delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    showAlertMessage('Todo deleted successfully', 'success');
    showAllTodos();
}

//edit todo
function editTodo(id) {
    let todo = todos.find(todo => todo.id === id);
    task_input.value = todo.task;
    todos = todos.filter(todo => todo.id !== id);
    add_btn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
    saveToLocalStorage();
    add_btn.addEventListener('click', () => {
        add_btn.innerHTML = "<i class='bx bx-plus bx-sm'></i>"; 
        showAlertMessage('Todo updated successfully', 'success');
    });
}

//clear all todos
function clearAllTodos() {
    if(todos.length > 0) {
        todos = [];
        saveToLocalStorage();
        showAlertMessage('All Todos cleared successfully', 'success');
        showAllTodos();
    }else{
        showAlertMessage('No Todos to clear', 'error');
    }
}