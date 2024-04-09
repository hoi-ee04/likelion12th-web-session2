const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

let todos = [];

const addItem = (todo) => {
    if (todo.text !== ''){
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const button = document.createElement('button');
        const span = document.createElement('span');

        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed || false;
        checkbox.addEventListener('change', toggleItem);
        span.innerHTML = todo.text;
        button.innerHTML = '삭제';
        button.addEventListener('click', delItem);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);
        li.id = todo.id;
        if (todo.completed) {
            li.classList.add('completed');
        }
    }
};

const save = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const delItem = (event) => {
    const target = event.target.parentElement;

    todos = todos.filter((todo) => todo.id !== parseInt(target.id)); 
    save();
    target.remove();
};

const toggleItem = (event) => {
    const target = event.target.parentElement;
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(target.id));
    todos[todoIndex].completed = event.target.checked;
    if (event.target.checked) {
        target.classList.add('completed');
    } else {
        target.classList.remove('completed');
    }
    save();
};

const handler = (event) => {
    event.preventDefault();
    
    const todo = {
        id: Date.now(),
        text: input.value, 
    };

    todos.push(todo);
    addItem(todo);

    save();
    input.value = '';
};

const init = () => {
    const userTodos = JSON.parse(localStorage.getItem('todos'));

    if (userTodos) {
        userTodos.forEach((todo) => {
            addItem(todo)
        });
        todos = userTodos;
    }
};

init();
form.addEventListener('submit', handler);