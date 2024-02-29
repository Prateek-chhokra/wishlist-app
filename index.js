let todoInput = document.querySelector('.input')
let addToButton = document.querySelector('.button')
let todoContainer = document.querySelector(".todos-container")
let todo

// This statement will first get the todo item from the localstorage and after that parse it into JSON. By doing so, we will get the array not a string, because we have used JSON.strigify further in code to get the desired output
let localData= JSON.parse(localStorage.getItem("todo"))
let todoArray = localData || []


// By using a localstorage, you are storing the data on your local machinem, so whenever you will refresh the page, your results will not be gone because the machine is gonna fetch it from your local machine.

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
    // As we have used form tag, the default behaviour of form tag is to load the page on submission. To prevent that we will use preventDefault() method of the event.
    event.preventDefault()
    todo = todoInput.value
    if (todo.length > 0) {
        todoArray.push({ id: uuid(), todoValue: todo, isCompleted: false })
    }

    // This function has to be called here because the todoArray array is getting updated here. If we do not call this function here, then the default value of todoArray which is an empty array will be used everywhere.
    renderToDoArray(todoArray)
    // This will store the entire todoArray on the localstorage.
    localStorage.setItem("todo", JSON.stringify(todoArray))
    todoInput.value = ""
})


// Using event delegation
todoContainer.addEventListener("click", (event) => {
    let key = event.target.dataset.key  // We are targeting the data-key of renderToDoArray function.
    let delTodokey = event.target.dataset.todokey
    todoArray = todoArray.map(todo => todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo)
    todoArray = todoArray.filter(todo => todo.id !== delTodokey)


    // todoArray got updated in the above line, we have to again call the renderToDoArray function in order to get the desired result
    renderToDoArray(todoArray)
    localStorage.setItem("todo", JSON.stringify(todoArray))
    console.log(todoArray)

    /*
    // Try running below commonds.
    console.log(event.target)  // This will give you the label and input
    console.log(key)  // This will give you the key or the id or data-key
    */
})

// Creating a function to render the value of input field on the page.
function renderToDoArray(todoArray) {
    console.log(todoArray)
    todoContainer.innerHTML = todoArray.map(({ id, todoValue, isCompleted }) =>

        // By using the data-key(attribute) and we assigned it the same id as the element, so whenever we click either on checkbox or on text value, the checkbox is gonna toggle
        `<div class="todo relative"><input class = "t-checkbox t-pointer" type="checkbox" ${isCompleted ? "checked" : ""} id="item-${id}" data-key="${id}"></input><label for="item-${id}" class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}"  data-key="${id}">${todoValue}</label><button class="absolute right-0 button cursor"><span data-todokey="${id}" class="del-btn material-symbols-outlined">
        delete</span></button></div>`)
}

(renderToDoArray(todoArray))