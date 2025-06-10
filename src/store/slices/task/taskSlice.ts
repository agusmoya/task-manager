import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { tasksApi } from '../../../services/tasksApi'

import { RootState } from '../../store'

import { type ITask } from '../../../types/task'

const tasksAdapter = createEntityAdapter<ITask>()

export interface ITaskState {
  activeTaskId?: string
}

const initialState = tasksAdapter.getInitialState<ITaskState>({
  activeTaskId: undefined,
})

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setActiveTaskId: (state, { payload }: PayloadAction<string | undefined>) => {
      state.activeTaskId = payload
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(tasksApi.endpoints.fetchTasks.matchFulfilled, (state, { payload }) => {
        tasksAdapter.setAll(state, payload)
      })
      .addMatcher(tasksApi.endpoints.createTask.matchFulfilled, (state, { payload }) => {
        tasksAdapter.upsertOne(state, payload)
      })
      .addMatcher(tasksApi.endpoints.updateTask.matchFulfilled, (state, { payload }) => {
        tasksAdapter.upsertOne(state, payload)
      })
      .addMatcher(tasksApi.endpoints.deleteTask.matchFulfilled, (state, { payload: { id } }) => {
        tasksAdapter.removeOne(state, id)
        if (state.activeTaskId === id) state.activeTaskId = undefined
      })
  },
})

export const { setActiveTaskId } = taskSlice.actions

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
} = tasksAdapter.getSelectors<RootState>(state => state.task)
