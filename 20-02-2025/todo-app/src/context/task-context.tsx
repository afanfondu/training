import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { taskReducer, TaskState } from './task-reducer'
import { Task } from '../types'

const STORAGE_KEY = 'tasks'

type TTaskContext = {
  tasks: TaskState
  addTask: (taskValue: string) => void
  removeTask: (taskId: string) => void
  toggleTask: (taskId: string) => void
  updateTask: (updatedTask: Task) => void
  resetAll: () => void
}

const TaskContext = createContext<TTaskContext | null>(null)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const storageValue = localStorage.getItem(STORAGE_KEY)
    return storageValue ? JSON.parse(storageValue) : []
  })

  const addTask = useCallback((taskValue: string) => {
    dispatch({ type: 'ADD_TASK', payload: { taskValue } })
  }, [])

  const removeTask = useCallback((taskId: string) => {
    dispatch({ type: 'REMOVE_TASK', payload: { taskId } })
  }, [])

  const toggleTask = useCallback((taskId: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: { taskId } })
  }, [])

  const resetAll = useCallback(() => {
    dispatch({ type: 'RESET_ALL' })
  }, [])

  const updateTask = useCallback((updatedTask: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask })
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  return (
    <TaskContext
      value={{
        tasks,
        addTask,
        removeTask,
        toggleTask,
        updateTask,
        resetAll
      }}
    >
      {children}
    </TaskContext>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks must be used within a TaskProvider')
  return context
}
