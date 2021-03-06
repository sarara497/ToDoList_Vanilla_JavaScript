//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteChecked);
filterOption.addEventListener("click", todoFilter);

//Functions
function addTodo(event) {
  //Prevent Form from submitting
  event.preventDefault();
  // console.log("It's Work yaaaa")

  if (todoInput.value === "") {
    alert("You should write something before submitting ,Please");
  } else {
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create single todo
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    //make the todo-item sticking it inside the tododiv
    todoDiv.appendChild(newTodo);

    //add a todo in the localstorage
    saveTodosLocaly(todoInput.value);

    //Checked Button
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = '<i class="fas fa-check"></i>'; //icon for this button
    checkedButton.classList.add("checked-btn");
    todoDiv.appendChild(checkedButton); //make the checked-btn sticking it inside the tododiv

    //trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //icon for this button
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton); //make the trash-btn sticking it inside the tododiv

    //now we will append this todoDiv inide the ul->todo-list in html
    todoList.appendChild(todoDiv);

    //clear the todoInput value after submitting
    todoInput.value = "";
  }
}

function deleteChecked(e) {
  //console.log(e.target)
  const wTF = e.target;
  //delet todo
  if (wTF.classList[0] === "trash-btn") {
    const todo = wTF.parentElement;
    todo.classList.add("fall");
    removeTodoFromLocal(todo);
    //this mean after the animation done remove this todo
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check todo
  if (wTF.classList[0] === "checked-btn") {
    const todo = wTF.parentElement;
    //console.log(todo)
    todo.classList.toggle("checkedTodo");
  }
}

function todoFilter(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    // console.log(e.target.value)
    // console.log("todo->>>>" , todo.classList)
    const val = e.target.value;
    if (val === "all") {
      if (todo.classList === undefined) {
        console.log("it's nothing");
      } else {
        todo.style.display = "flex";
        console.log("all", todo);
      }
    } else if (val === "comp") {
      if (todo.classList === undefined) {
        console.log("it's nothing");
      } else if (todo.classList.contains("checkedTodo")) {
        console.log("iam in Compl");
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    }
    if (val === "uncomp") {
      if (todo.classList === undefined) {
        console.log("it's nothing");
      } else if (!todo.classList.contains("checkedTodo")) {
        console.log("iam in unCompl");
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    }
  });
}

function saveTodosLocaly(todo) {
  //check if i already have todos or not
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //getback the exisit todos
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
  //check if i already have todos or not
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //getback the exisit todos
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create single todo
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    //make the todo-item sticking it inside the tododiv
    todoDiv.appendChild(newTodo);

    //Checked Button
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = '<i class="fas fa-check"></i>'; //icon for this button
    checkedButton.classList.add("checked-btn");
    todoDiv.appendChild(checkedButton); //make the checked-btn sticking it inside the tododiv

    //trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //icon for this button
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton); //make the trash-btn sticking it inside the tododiv

    //now we will append this todoDiv inide the ul->todo-list in html
    todoList.appendChild(todoDiv);
  });
}

function removeTodoFromLocal(todo) {
  //check if i already have todos or not
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //getback the exisit todos
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //   console.log(todo.children[0].innerText);
  //   console.log(todos.indexOf("House"));
  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);

  //refresh the localStorage with the new array
  localStorage.setItem("todos", JSON.stringify(todos));
}
