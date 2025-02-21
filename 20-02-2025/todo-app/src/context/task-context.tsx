import { createContext, useContext, useEffect, useReducer } from 'react'
import { TaskAction, taskReducer, TaskState } from './task-reducer'

const STORAGE_KEY = 'tasks'

type TTaskContext = {
  tasks: TaskState
  dispatch: React.ActionDispatch<[action: TaskAction]>
}

const TaskContext = createContext<TTaskContext | null>(null)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const storageValue = localStorage.getItem(STORAGE_KEY)
    return storageValue ? JSON.parse(storageValue) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  return (
    <TaskContext
      value={{
        tasks,
        // addTask, removeTask, toggleTask, updateTask (prev commit) -> cause rerenders even if wrap in useCallback here
        dispatch
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
