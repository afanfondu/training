import { useState } from 'react'
import { type Task } from '../types'
import { useTasks } from '../context/task-context'

type Props = {
  task: Task
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const [editValue, setEditValue] = useState(task.value)
  const [isEditing, setIsEditing] = useState(false)
  const { updateTask, removeTask, toggleTask } = useTasks()

  if (isEditing) {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <form
          onSubmit={e => {
            e.preventDefault()
            updateTask({ ...task, value: editValue })
            setIsEditing(false)
          }}
          className="input-group mb-3"
        >
          <input
            type="text"
            className="form-control"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-outline-secondary update">
            Update
          </button>
        </form>
      </li>
    )
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="form-check d-flex align-items-center">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          {task.value}
        </label>
      </div>

      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-danger edit"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          onClick={() => removeTask(task.id)}
          type="button"
          className="btn btn-warning delete"
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TaskItem
