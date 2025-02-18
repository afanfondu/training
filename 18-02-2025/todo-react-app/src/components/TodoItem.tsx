import { useState } from "react";
import { type Todo } from "../types";

type Props = {
  todo: Todo;
  onEditUpdate: (updatedTodo: Todo) => void;
  onDelete: (todoId: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo, onEditUpdate, onDelete }) => {
  const [editValue, setEditValue] = useState(todo.value);
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditUpdate({ ...todo, value: editValue });
            setIsEditing(false);
          }}
          className="input-group mb-3"
        >
          <input
            type="text"
            className="form-control"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-outline-secondary update">
            Update
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <span className="text-todo">{todo.value}</span>
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-danger edit"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          type="button"
          className="btn btn-warning delete"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
