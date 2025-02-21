import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import TaskForm from './components/task-form'
import TaskItem from './components/task-item'
import { useCallback, useMemo, useState } from 'react'
import { useTasks } from './context/task-context'
import { Task } from './types'

type Filter = 'All' | 'Active' | 'Completed'

function App() {
  const { tasks, dispatch } = useTasks()
  const [filter, setFilter] = useState<Filter>('All')

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      switch (filter) {
        case 'Active':
          return !task.completed
        case 'Completed':
          return task.completed
        default: // All
          return true
      }
    })
  }, [tasks, filter])

  const completedTasksCount = useMemo(() => {
    return tasks.reduce(
      (count, task) => (task.completed ? count + 1 : count),
      0
    )
  }, [tasks])

  const addTask = useCallback(
    (taskValue: string) => {
      dispatch({ type: 'ADD_TASK', payload: { taskValue } })
    },
    [dispatch]
  )

  const removeTask = useCallback(
    (taskId: string) => {
      const deleteConfirm = confirm(
        'Are you sure you want to delete this task?'
      )
      if (!deleteConfirm) return

      dispatch({ type: 'REMOVE_TASK', payload: { taskId } })
    },
    [dispatch]
  )

  const toggleTask = useCallback(
    (taskId: string) => {
      dispatch({ type: 'TOGGLE_TASK', payload: { taskId } })
    },
    [dispatch]
  )

  const updateTask = useCallback(
    (updatedTask: Task) => {
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask })
    },
    [dispatch]
  )

  const handleResetAll = useCallback(() => {
    const deleteConfirm = confirm('Are you sure you want to delete all tasks?')
    if (!deleteConfirm) return

    dispatch({ type: 'RESET_ALL' })
  }, [dispatch])

  return (
    <div className="container mt-5 w-50">
      <h1 className="text-center mb-4">Task Management</h1>

      <div className="d-flex justify-content-between mb-3">
        <div className="btn-group">
          <button
            className={`btn ${filter === 'All' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('All')}
          >
            All {tasks.length}
          </button>
          <button
            className={`btn ${filter === 'Active' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('Active')}
          >
            Active {tasks.length - completedTasksCount}
          </button>
          <button
            className={`btn ${filter === 'Completed' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('Completed')}
          >
            Completed - {completedTasksCount}
          </button>
        </div>

        <button
          onClick={handleResetAll}
          className="btn btn-danger"
          type="button"
        >
          Reset All
        </button>
      </div>

      <TaskForm addTask={addTask} />
      <ul className="list-group">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            removeTask={removeTask}
            updateTask={updateTask}
            toggleTask={toggleTask}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
