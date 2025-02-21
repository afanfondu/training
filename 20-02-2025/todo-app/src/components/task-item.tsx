import { memo, useRef, useState } from 'react'
import { type Task } from '../types'

type Props = {
  task: Task
  updateTask: (task: Task) => void
  removeTask: (taskId: string) => void
  toggleTask: (taskId: string) => void
}

const TaskItem: React.FC<Props> = ({
  task,
  updateTask,
  removeTask,
  toggleTask
}) => {
  const editValueInputRef = useRef<HTMLInputElement | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <form
          onSubmit={e => {
            e.preventDefault()

            if (editValueInputRef.current) {
              updateTask({ ...task, value: editValueInputRef.current.value })
              setIsEditing(false)
            }
          }}
          className="input-group mb-3"
        >
          <input
            ref={editValueInputRef}
            type="text"
            defaultValue={task.value}
            className="form-control"
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
          <span
            className={`${task.completed ? 'text-decoration-line-through' : ''}`}
          >
            {task.value}
          </span>
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

export default memo(TaskItem)
