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

const { fetchTasks, createTask, updateTask, deleteTask } = tasksApi.endpoints

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

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
} = tasksAdapter.getSelectors<RootState>(state => state.task)
