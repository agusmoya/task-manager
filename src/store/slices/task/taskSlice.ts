import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import { type Task } from '../../../types/task.d'

import {
  fetchTasksThunk,
  fetchTaskByIdThunk,
  createTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
} from './taskThunks.ts'

export interface TaskState {
  activeTask: Task | undefined
  tasks: Task[]
  loading: boolean
  backendErrorMessage?: string
}

const initialState: TaskState = {
  activeTask: undefined,
  tasks: [],
  loading: false,
  backendErrorMessage: undefined,
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    onAddNewTaskState: (state, { payload }: PayloadAction<Task>) => {
      state.tasks.push(payload)
    },
    onUpdateTaskState: (state, { payload }: PayloadAction<Task>) => {
      state.tasks = state.tasks.map(task => (task.id === payload.id ? payload : task))
    },
    onDeleteTaskState: (state, { payload }: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter(task => task.id !== payload.id)
    },
    onResetActiveTask: state => {
      state.activeTask = undefined
    },
    onClearBackendErrorMessage: state => {
      state.backendErrorMessage = undefined
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasksThunk.fulfilled, (state, { payload }: PayloadAction<Task[]>) => {
        state.tasks = payload
        state.loading = false
      })
      .addCase(fetchTaskByIdThunk.fulfilled, (state, { payload }: PayloadAction<Task>) => {
        state.activeTask = payload
        state.loading = false
      })
      .addCase(createTaskThunk.fulfilled, (state, { payload }: PayloadAction<Task>) => {
        state.tasks.push(payload)
        state.loading = false
      })
      .addCase(updateTaskThunk.fulfilled, (state, { payload }: PayloadAction<Task>) => {
        state.tasks = state.tasks.map(t => (t.id === payload.id ? payload : t))
        state.loading = false
      })
      .addCase(deleteTaskThunk.fulfilled, (state, { payload }: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(t => t.id !== payload)
        state.loading = false
      })
      .addMatcher(
        isAnyOf(
          fetchTasksThunk.pending,
          fetchTaskByIdThunk.pending,
          createTaskThunk.pending,
          updateTaskThunk.pending,
          deleteTaskThunk.pending
        ),
        state => {
          state.loading = true
          state.backendErrorMessage = undefined
        }
      )
      .addMatcher(
        isAnyOf(
          fetchTasksThunk.rejected,
          fetchTaskByIdThunk.rejected,
          createTaskThunk.rejected,
          updateTaskThunk.rejected,
          deleteTaskThunk.rejected
        ),
        state => {
          state.loading = true
          state.backendErrorMessage = undefined
        }
      )
  },
})

export const { onResetActiveTask, onClearBackendErrorMessage } = taskSlice.actions
