const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");
let toDos = [];
const TODOS_KEY = "todos";
const savedToDos = localStorage.getItem("TODOS_KEY");


function saveToDos() {
    localStorage.setItem("TODOS_KEY", JSON.stringify(toDos));
}

function deleteToDo(event) {
    const delList = event.target.parentElement;
    delList.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(delList.id));
    saveToDos();
}

function paintTodo(newTodoObj) {
    const li = document.createElement("li");
    li.id = newTodoObj.id;
    const span = document.createElement("span");
    const button = document.createElement("button");
    li.appendChild(span);
    li.appendChild(button);
    span.innerText = newTodoObj.text;
    button.innerText = "✕";
    button.addEventListener("click", deleteToDo)
    todoList.appendChild(li);
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now()};
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveToDos();
}


if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintTodo);
}

todoForm.addEventListener("submit", handleTodoSubmit);