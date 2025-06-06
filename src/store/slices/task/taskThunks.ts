import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  type TaskId,
  type ITask,
  ITaskCreatePayload,
  ITaskUpdatePayload,
} from '../../../types/task.d'

import todoApi from '../../../api/taskManagerApi'
import { handlerApiError } from '../../../api/helpers/handlerApiError'

export const fetchTasksThunk = createAsyncThunk<ITask[], void, { rejectValue: string }>(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await todoApi.get<ITask[]>('/tasks')
      return data
    } catch (err) {
      const { errorMessage } = handlerApiError(err)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const fetchTaskByIdThunk = createAsyncThunk<ITask, TaskId, { rejectValue: string }>(
  'tasks/fetchById',
  async (taskId, thunkAPI) => {
    try {
      const { data } = await todoApi.get<ITask>(`/tasks/${taskId}`)
      return data
    } catch (err) {
      const { errorMessage } = handlerApiError(err)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const createTaskThunk = createAsyncThunk<ITask, ITaskCreatePayload, { rejectValue: string }>(
  'tasks/create',
  async (newTask, thunkAPI) => {
    try {
      const { data } = await todoApi.post<ITask>('/tasks', newTask)
      return data
    } catch (err) {
      const { errorMessage } = handlerApiError(err)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const updateTaskThunk = createAsyncThunk<ITask, ITaskUpdatePayload, { rejectValue: string }>(
  'tasks/update',
  async (task, thunkAPI) => {
    try {
      const { data } = await todoApi.patch<ITask>(`/tasks/${task.id}`, task)
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
