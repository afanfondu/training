import { memo, useState } from 'react'
import { useTasks } from '../context/task-context'

const TaskForm = memo(() => {
  const { addTask } = useTasks()
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTask(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add task..."
        required
      />
      <button className="btn btn-outline-secondary" type="submit">
        Add
      </button>
    </form>
  )
})

export default TaskForm
