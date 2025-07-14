import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { tasksApi } from '../../../services/tasksApi'

import { ITask } from '../../../types/task'

export const tasksAdapter = createEntityAdapter<ITask>()

export interface ITaskState {
  activeTaskId?: string
}

const initialState = tasksAdapter.getInitialState<ITaskState>({
  activeTaskId: undefined,
})

const { fetchTasks, createTask, updateTask, deleteTask } = tasksApi.endpoints

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    updateTask: tasksAdapter.updateOne,
    removeTask: tasksAdapter.removeOne,
    setActiveTaskId: (state, { payload }: PayloadAction<string | undefined>) => {
      state.activeTaskId = payload
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(fetchTasks.matchFulfilled, (state, { payload }) => {
        tasksAdapter.setAll(state, payload)
      })
      .addMatcher(createTask.matchFulfilled, (state, { payload }) => {
        tasksAdapter.upsertOne(state, payload)
      })
      .addMatcher(updateTask.matchFulfilled, (state, { payload }) => {
        tasksAdapter.upsertOne(state, payload)
      })
      .addMatcher(deleteTask.matchFulfilled, (state, action) => {
        const deletedId = action.meta.arg.originalArgs
        tasksAdapter.removeOne(state, deletedId)
        if (state.activeTaskId === deletedId) state.activeTaskId = undefined
      })
  },
})

export const { setActiveTaskId } = taskSlice.actions
