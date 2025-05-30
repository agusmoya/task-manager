import { useCallback } from 'react'

import { TaskId, type Task } from '../../types/task.d'

import { useAppDispatch, useAppSelector } from '../reduxStore'
import { onResetActiveTask, onClearBackendErrorMessage } from './../slices/task/taskSlice'
import {
  fetchTasksThunk,
  fetchTaskByIdThunk,
  createTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
} from '../slices/task/taskThunks'

export const useTaskActions = () => {
  const dispatch = useAppDispatch()
  const { activeTask, tasks, backendErrorMessage, loading } = useAppSelector(state => state.task)

  const fetchTasks = useCallback(async () => {
    return await dispatch(fetchTasksThunk()).unwrap()
  }, [dispatch])

  const fetchTaskById = useCallback(
    async (id: TaskId) => {
      return await dispatch(fetchTaskByIdThunk(id)).unwrap()
    },
    [dispatch]
  )

  const saveTask = useCallback(
    async (task: Partial<Task>) => {
      if (task.id) {
        return await dispatch(updateTaskThunk(task)).unwrap()
      } else {
        return await dispatch(createTaskThunk(task)).unwrap()
      }
    },
    [dispatch]
  )

  const deleteTask = useCallback(
    async (id: TaskId) => {
      return await dispatch(deleteTaskThunk(id)).unwrap()
    },
    [dispatch]
  )

  const resetActiveTask = useCallback(() => {
    dispatch(onResetActiveTask())
  }, [dispatch])

  const clearBackendErrorMessage = useCallback(() => {
    dispatch(onClearBackendErrorMessage())
  }, [dispatch])

  return {
    //* Properties
    activeTask,
    tasks,
    loading,
    backendErrorMessage,
    //* Methods
    // THUNKS
    fetchTasks,
    fetchTaskById,
    saveTask,
    deleteTask,
    // STATE
    resetActiveTask,
    clearBackendErrorMessage,
  }
}
