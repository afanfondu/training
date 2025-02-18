import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import { type Todo } from "./types";
import TodoItem from "./components/TodoItem";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const onSubmit = (value: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now().toString(), value },
    ]);
  };

  const onEditUpdate = (todo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo)),
    );
  };

  const onDelete = (todoId: string) => {
    const deleteConfirm = confirm("Are you sure you want to delete this todo?");
    if (!deleteConfirm) return;

    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.id !== todoId),
    );
  };

  const onResetAll = () => {
    if (todos.length === 0) return;

    const deleteConfirm = confirm("Are you sure you want to delete all todos?");
    if (!deleteConfirm) return;

    setTodos([]);
  };

  return (
    <div className="container mt-5 w-50">
      <h1 className="text-center">Todo App</h1>
      <TodoForm onSubmit={onSubmit} onResetAll={onResetAll} />
      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEditUpdate={onEditUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
