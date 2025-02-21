import { memo, useRef } from 'react'

const TaskForm = ({ addTask }: { addTask: (taskValue: string) => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current) {
      addTask(inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Add task..."
        required
      />
      <button className="btn btn-outline-secondary" type="submit">
        Add
      </button>
    </form>
  )
}

export default memo(TaskForm)
