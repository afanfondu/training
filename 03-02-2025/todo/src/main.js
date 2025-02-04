import "./style.css";

let todos = JSON.parse(localStorage.getItem("todos")) || [];
const setTodos = (cb) => {
  todos = cb(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todoForm = document.querySelector("#todo-form");
const inputTodo = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const resetBtn = document.querySelector("#reset-btn");

const todoItem = (todo) => {
  return `
    <li data-id="${todo.id}" class="list-group-item d-flex justify-content-between align-items-start">
      <span class="text-todo">${todo.value}</span>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger edit">Edit</button>
        <button type="button" class="btn btn-warning delete">Delete</button>
      </div>
    </li>
  `;
};

const renderTodos = (todos) => {
  const html = todos.map((todo) => todoItem(todo)).join("");
  todoList.innerHTML = html;
};

renderTodos(todos);

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTodo = { id: Date.now().toString(), value: inputTodo.value };
  setTodos((prevTodos) => [...prevTodos, newTodo]);

  todoList.insertAdjacentHTML("beforeend", todoItem(newTodo));
  inputTodo.value = "";
});

todoList.addEventListener("click", (e) => {
  const item = e.target.closest(".list-group-item");

  // on delete button click
  if (e.target.classList.contains("delete")) {
    const deleteConfirm = confirm("Are you sure you want to delete this todo?");
    if (deleteConfirm) {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== item.dataset.id)
      );
      item.remove();
    }
  }

  // on edit button click
  if (e.target.classList.contains("edit")) {
    const todo = todos.find((todo) => todo.id === item.dataset.id);
    item.innerHTML = `
      <div id="update-form" class="input-group mb-3">
        <input type="text" class="form-control" id="update-input" value="${todo.value}" />
        <button class="btn btn-outline-secondary update">Update</button>
      </div>
    `;
  }

  // on update button click
  if (e.target.classList.contains("update")) {
    const updateInput = e.target.previousElementSibling;

    setTodos((prevTodos) => {
      const todo = prevTodos.find((todo) => todo.id === item.dataset.id);
      todo.value = updateInput.value;

      return prevTodos;
    });

    renderTodos();
  }
});

// on reset button click
resetBtn.addEventListener("click", () => {
  setTodos(() => []);
  renderTodos(todos);
});
