import { type Category } from "./category.d"

export const TASK_STATUS = {
  PENDING: "pending",
  ACTIVE: "active",
  PROGRESS: "in-progress",
  COMPLETED: "completed",
} as const

export interface Task {
  id: string | undefined
  title: string
  status: (typeof TASK_STATUS)[keyof typeof TASK_STATUS]
  progress: number
  duration: number
  category: Category | undefined
  creationDate: Date
  userId: string | undefined
}

export interface TaskForm {
  id: string,
  category: string,
  userId: string,
  creationDate: Date,
  title: "",
  status: string,
  progress: number,
  duration: number,
}

export interface TasksResponse {
  Tasks: Task[]
}

export type TaskId = Pick<Task, "id">
export type TaskTitle = Pick<Task, "title">
export type TaskStatus = Pick<Task, "status">
export type Tasks = Task[]

export interface FetchState {
  data: undefined | null
  error: ErrorFetch | null
  isLoading: boolean
  hasError: boolean
}

export interface ErrorFetch {
  status: number
  statusText: string
}
