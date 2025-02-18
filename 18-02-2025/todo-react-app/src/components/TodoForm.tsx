import { useState } from "react";

type Props = {
  onSubmit: (value: string) => void;
  onResetAll: () => void;
};

const TodoForm: React.FC<Props> = ({ onSubmit, onResetAll }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add todo..."
        required
      />
      <button className="btn btn-outline-secondary" type="submit">
        Add
      </button>
      <button onClick={onResetAll} className="btn btn-danger" type="button">
        Reset All
      </button>
    </form>
  );
};

export default TodoForm;
