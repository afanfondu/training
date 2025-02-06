import api from "./api";
import "./style.scss";
import toast from "toastr";

toast.options = { positionClass: "toast-bottom-center", timeOut: 2000 };

const todoForm = document.querySelector("#todo-form");
const addBtn = document.querySelector("#add-btn");
const inputTodo = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const deleteAllBtn = document.querySelector("#delete-all-btn");
const loader = document.querySelector("#loader");

const todoItem = (todo) => {
  return `
    <li data-id="${todo.id}" class="list-group-item d-flex justify-content-between align-items-start">
      <span class="text-todo">${todo.title}</span>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger edit">Edit</button>
        <button type="button" class="btn btn-warning delete">Delete</button>
      </div>
    </li>
  `;
};

const renderTodos = async () => {
  try {
    const { data: todos } = await api.get("/todos?_limit=5");

    const html = todos.map((todo) => todoItem(todo)).join("");
    todoList.innerHTML = html;
  } catch (err) {
    toast.error("Something went wrong! Try again later.");
  }

  loader.remove();
};
renderTodos();

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  addBtn.setAttribute("disabled", true);
  addBtn.innerHTML = "Adding...";

  try {
    const { data: todo } = await api.post("/todos", {
      title: inputTodo.value,
    });

    todoList.insertAdjacentHTML("beforeend", todoItem(todo));
    inputTodo.value = "";
  } catch (err) {
    toast.error("Something went wrong while adding todo! Try again later.");
  }

  addBtn.removeAttribute("disabled");
  addBtn.innerHTML = "Add";
});

todoList.addEventListener("click", async (e) => {
  const item = e.target.closest(".list-group-item");

  if (e.target.classList.contains("delete")) {
    e.target.setAttribute("disabled", true);
    e.target.innerHTML = "Deleting...";

    const deleteConfirm = confirm("Are you sure you want to delete this todo?");
    if (deleteConfirm) {
      try {
        await api.delete(`/todos/${item.dataset.id}`);
        item.remove();
      } catch (err) {
        toast.error(
          "Something went wrong while deleting todo! Try again later.",
        );

        e.target.removeAttribute("disabled");
        e.target.innerHTML = "Delete";
      }
    }
  }

  if (e.target.classList.contains("edit")) {
    const todoTitle = item.querySelector(".text-todo").textContent;
    item.dataset.prevtitle = todoTitle;
    item.innerHTML = `
      <div id="update-form" class="input-group mb-3">
        <input type="text" class="form-control" id="update-input" value="${todoTitle}" />
        <button class="btn btn-outline-secondary update">Update</button>
      </div>
    `;
  }

  if (e.target.classList.contains("update")) {
    const updateInput = e.target.previousElementSibling;
    e.target.setAttribute("disabled", true);
    e.target.innerHTML = "Updating...";

    let todo;

    try {
      const res = await api.patch(`/todos/${item.dataset.id}`, {
        title: updateInput.value,
      });
      todo = res.data;
    } catch (err) {
      todo = { id: item.dataset.id, title: item.dataset.prevtitle };
      toast.error("Something went wrong while updating todo. Try again later.");
    }

    item.dataset.id = todo.id;
    item.innerHTML = `
      <span class="text-todo">${todo.title}</span>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger edit">Edit</button>
        <button type="button" class="btn btn-warning delete">Delete</button>
      </div>
    `;
  }
});

deleteAllBtn.addEventListener("click", async () => {
  const deleteConfirm = confirm("Are you sure you want to delete all todos?");
  if (!deleteConfirm) return;

  deleteAllBtn.setAttribute("disabled", true);
  deleteAllBtn.innerHTML = "Deleting...";
  try {
    await api.delete("/todos/*");
    todoList.innerHTML = "";
  } catch (err) {
    toast.error(
      "Something went wrong while deleting all todos! Try again later.",
    );
  }

  deleteAllBtn.removeAttribute("disabled");
  deleteAllBtn.innerHTML = "Delete All";
});
