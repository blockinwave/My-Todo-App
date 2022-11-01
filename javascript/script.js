//Model

let todoList;

const saveFile = JSON.parse(localStorage.getItem('newTodos'));

if (Array.isArray(saveFile)) {
  todoList = saveFile;
}

else {
  todoList = [];
}

function addTodo(todoTitle, todoDate, id) {

  todoList.push(
    {title: todoTitle,
    date: todoDate,
    id: id}
  )

  saveTodos()
}

function deleteTodo(deleteId) {

  todoList = todoList.filter(function (todo) {

    if (deleteId === todo.id) {

      let element = document.getElementsByClassName('element');
      element.height = 0;
      element.width = 0;

      return false;
    }

    else {
      return true;
    }

  })

  saveTodos()
}

function editTodo(editId) {

  todoList.forEach(function (todo) {

    if (editId === todo.id) {
      todo.isEditing = true;
    }

  })

  saveTodos()
}

function updateTodo(updateId) {

  const updateText = document.getElementById('newTitle');
  const newTitle = updateText.value;

  const updateDate = document.getElementById('newDate');
  const newDate = updateDate.value;

  todoList.forEach(function (todo) {

    if (updateId === todo.id) {
      todo.title = newTitle;
      todo.date = newDate;
      todo.isEditing = false;
    }
  })

  saveTodos()
}

function checkEditing() {

  let check;

  todoList.forEach(function (todo) {
    if (todo.isEditing === true) {
      check = true;
      return check;
    }
  })

}

function saveTodos() {
  localStorage.setItem('newTodos', JSON.stringify(todoList))
}

//View

function render() {

  const listDiv = document.getElementById('todoList');
  listDiv.innerHTML = '';

  todoList.forEach(function (todo) {

    let element = document.createElement('div');
    element.className = 'element';

    if (todo.isEditing === true) {

      let textboxBox = document.createElement('div');
      textboxBox.className = 'textboxBox';
      let textbox = document.createElement('input');
      textbox.id = 'newTitle';
      textbox.className = 'textbox';
      textbox.placeholder = 'Update Todo'
      textboxBox.appendChild(textbox);

      let datePickerBox = document.createElement('div');
      datePickerBox.className = 'datePickerBox';
      let datePicker = document.createElement('input');
      datePicker.id = 'newDate';
      datePicker.className = 'datePicker';
      datePicker.type = 'date';
      datePickerBox.appendChild(datePicker);

      let updateButtonBox = document.createElement('div');
      updateButtonBox.className = 'updateButtonBox';
      let updateButton = document.createElement('button');
      updateButton.innerText = 'Update';
      updateButton.dataset.todoId = todo.id;
      updateButton.className = 'updateButton';
      updateButton.onclick = onUpdate;
      updateButton.style = 'cursor: pointer';
      updateButtonBox.appendChild(updateButton)

      element.appendChild(textboxBox);
      element.appendChild(datePickerBox);
      element.appendChild(updateButtonBox);

      listDiv.appendChild(element);
    }

    else {

      let todoTitleBox = document.createElement('div');
      todoTitleBox.innerText = todo.title;
      element.appendChild(todoTitleBox);
      todoTitleBox.className = 'todoTitleBox';

      let todoDateBox = document.createElement('div');
      todoDateBox.innerText = todo.date;
      element.appendChild(todoDateBox);
      todoDateBox.className = 'todoDateBox';

      let buttonBox = document.createElement('div');
      buttonBox.className = 'buttonBox';


      let editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.onclick = onEdit;
      editButton.dataset.todoId = todo.id;
      editButton.style = 'cursor: pointer';
      editButton.className = 'editButton';

      let deleteButton = document.createElement('button');
      let deleteIcon = document.createElement('img');
      deleteIcon.src = 'assets/deleteIcon.svg';
      deleteIcon.className = 'deleteIcon';
      deleteButton.appendChild(deleteIcon)
      
      deleteButton.onclick = onDelete;
      deleteButton.dataset.todoId = todo.id;
      deleteButton.style = 'cursor: pointer';
      deleteButton.className = 'deleteButton';

      buttonBox.appendChild(editButton);
      buttonBox.appendChild(deleteButton);

      element.appendChild(todoTitleBox)
      element.appendChild(todoDateBox)
      element.appendChild(buttonBox)

      listDiv.appendChild(element);
    }

    

  })
}

render()

//Control

function onAdd() {
  
  let textbox = document.getElementById('todoTitle');
  let datePicker = document.getElementById('todoDate');

  let todoTitle = textbox.value;
  let todoDate = datePicker.value;
  let id = '' + new Date().getTime();

  addTodo(todoTitle, todoDate, id)

  textbox.value = '';
  datePicker.value = '';

  render()

}

window.addEventListener('keyup', 
function (event) {
  event = event;
  let titleValue = document.getElementById('todoTitle').value;
  let dateValue = document.getElementById('todoDate').value;
  let newTitleValue = document.getElementById('newTitle').value;
  let newDateValue = document.getElementById('newDate').value;
  
  if (event.key === 'Enter') {

    if (titleValue !== '' && dateValue !== '') {
      onAdd()
    }
    
  }
})

function onEdit(event) {

  const clickedButton = event.target;
  const editId = clickedButton.dataset.todoId;

  editTodo(editId);

  render()
}

function onDelete(event) {

  const clickedButton = event.target;
  const deleteId = clickedButton.dataset.todoId;
  console.log(event);

  deleteTodo(deleteId);

  render();
}

function onUpdate(event) {
  const clickedButton = event.target;
  const updateId = clickedButton.dataset.todoId;

  updateTodo(updateId)

  render()
}