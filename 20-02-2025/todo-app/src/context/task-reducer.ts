import { Task } from '../types'

export type TaskState = Task[]

export type TaskAction =
  | { type: 'ADD_TASK'; payload: { taskValue: string } }
  | { type: 'REMOVE_TASK'; payload: { taskId: string } }
  | { type: 'TOGGLE_TASK'; payload: { taskId: string } }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'RESET_ALL' }

export const taskReducer = (
  tasks: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...tasks,
        {
          id: Date.now().toString(),
          value: action.payload.taskValue,
          completed: false
        }
      ]

    case 'REMOVE_TASK':
      return tasks.filter(task => task.id !== action.payload.taskId)

    case 'TOGGLE_TASK':
      return tasks.map(task =>
        task.id === action.payload.taskId
          ? { ...task, completed: !task.completed }
          : task
      )

    case 'UPDATE_TASK':
      return tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      )

    case 'RESET_ALL':
      return []

    default:
      return tasks
  }
}
