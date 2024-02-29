// To understand the concept please review the index.js file.

let todoInput = document.querySelector('.input')
let addToButton = document.querySelector('.button')
let todoContainer = document.querySelector(".todos-container")
let todo
let localData= JSON.parse(localStorage.getItem("todo"))
let todoArray = localData || []


// Creating function to get unique id
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[x,y]/g, function (param) {
        let number = Math.random() * 16 | 0
        let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8)
        return randomNumber.toString(16)
    })
}


// Creating a function to add the value of input field into the todoArray array.
addToButton.addEventListener("click", (event) => {
    event.preventDefault()
    todo = todoInput.value
    if (todo.length > 0) {
        todoArray.push({ id: uuid(), todoValue: todo, isCompleted: false })
    }

    renderToDoArray(todoArray)
    localStorage.setItem("todo", JSON.stringify(todoArray))
    todoInput.value = ""
})


// Using event delegation
todoContainer.addEventListener("click", (event) => {
    let key = event.target.dataset.key
    let delTodokey = event.target.dataset.todokey
    todoArray = todoArray.map(todo => todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo)
    todoArray = todoArray.filter(todo => todo.id !== delTodokey)
    renderToDoArray(todoArray)
    localStorage.setItem("todo", JSON.stringify(todoArray))
})

// Creating a function to render the value of input field on the page.
function renderToDoArray(todoArray) {
    todoContainer.innerHTML = todoArray.map(({ id, todoValue, isCompleted }) =>
        `<div class="todo relative"><input class = "t-checkbox t-pointer" type="checkbox" ${isCompleted ? "checked" : ""} id="item-${id}" data-key="${id}"></input><label for="item-${id}" class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}"  data-key="${id}">${todoValue}</label><button class="absolute right-0 button cursor"><span data-todokey="${id}" class="del-btn material-symbols-outlined">
        delete</span></button></div>`)
}

(renderToDoArray(todoArray))