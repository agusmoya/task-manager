import { createAsyncThunk } from '@reduxjs/toolkit'

import { type TaskId, type Task } from '../../../types/task.d'

import todoApi from '../../../api/taskManagerApi.ts'
import { handlerApiError } from '../../../api/helpers/handlerApiError.ts'

export const fetchTasksThunk = createAsyncThunk<Task[], void, { rejectValue: string }>(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await todoApi.get<{ tasks: Task[] }>('/tasks')
      return data.tasks
    } catch (err) {
      const { errorMessage } = handlerApiError(err)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const fetchTaskByIdThunk = createAsyncThunk<Task, TaskId, { rejectValue: string }>(
  'tasks/fetchById',
  async (taskId, thunkAPI) => {
    try {
      const { data } = await todoApi.get<{ task: Task }>(`/tasks/${taskId}`)
      return data.task
    } catch (err) {
      const { errorMessage } = handlerApiError(err)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const createTaskThunk = createAsyncThunk<Task, Partial<Task>, { rejectValue: string }>(
  'tasks/create',
  async (newTask, thunkAPI) => {
    try {
      const { data } = await todoApi.post<Task>('/tasks', newTask)
      return data
    } catch (err) {
      const { errorMessage } = handlerApiError(err)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const updateTaskThunk = createAsyncThunk<Task, Partial<Task>, { rejectValue: string }>(
  'tasks/update',
  async (task, thunkAPI) => {
    try {
      const { data } = await todoApi.patch<Task>(`/tasks/${task.id}`, task)
      return data
    } catch (err) {
      const { errorMessage } = handlerApiError(err)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const deleteTaskThunk = createAsyncThunk<string, TaskId, { rejectValue: string }>(
  'tasks/delete',
  async (taskId, thunkAPI) => {
    try {
      const { data } = await todoApi.delete(`/tasks/${taskId}`)
      console.log('DELETETASKTHUNK: ', data)
      return taskId
    } catch (err) {
      const { errorMessage } = handlerApiError(err)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)
