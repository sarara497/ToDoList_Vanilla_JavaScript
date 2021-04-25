//selectors 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list")

//Event Listeners
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click' , deleteChecked);

//Functions
function addTodo(event){
    
    //Prevent Form from submitting
    event.preventDefault();
   // console.log("It's Work yaaaa")

   if( todoInput.value === ''){
       alert("You should write something before submitting ,Please")
   }else{
        //Todo Div 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")

    //create single todo 
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item")
    newTodo.innerText = todoInput.value;

    //make the todo-item sticking it inside the tododiv
    todoDiv.appendChild(newTodo)

    //Checked Button 
    const checkedButton = document.createElement('button');
    checkedButton.innerHTML = '<i class="fas fa-check"></i>'; //icon for this button 
    checkedButton.classList.add("checked-btn");
    todoDiv.appendChild(checkedButton);//make the checked-btn sticking it inside the tododiv

    //trash Button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //icon for this button 
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);//make the trash-btn sticking it inside the tododiv

    //now we will append this todoDiv inide the ul->todo-list in html 
    todoList.appendChild(todoDiv);

    //clear the todoInput value after submitting 
    todoInput.value=""

   }
   
}

function deleteChecked(e){
    //console.log(e.target)
    const wTF = e.target;
    //delet todo 
    if(wTF.classList[0] === "trash-btn"){
        const todo = wTF.parentElement;
        todo.classList.add("fall")
        //this mean after the animation done remove this todo
        todo.addEventListener("transitionend" , function(){
            todo.remove();
        });
        
    }

    //check todo
    if(wTF.classList[0] === "checked-btn"){
        const todo = wTF.parentElement;
        todo.classList.toggle("checkedTodo")
    }
}