import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../reduxStore'

import type { ITask } from '../../types/task'

import {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../../services/tasksApi'

import { setActiveTaskId, selectTaskById } from './../slices/task/taskSlice'

import { getErrorMessage } from '../../api/helpers/getErrorMessage'

export const useTaskActions = () => {
  const dispatch = useAppDispatch()
  const { activeTaskId } = useAppSelector(state => state.task)
  const activeTask: ITask | undefined = useAppSelector(state =>
    activeTaskId ? selectTaskById(state, activeTaskId) : undefined
  )

  const {
    data: tasks = [],
    isLoading: fetching,
    isError: fetchError,
    refetch,
  } = useFetchTasksQuery()

  const [createTask, { isLoading: creating, error: createError }] = useCreateTaskMutation()
  const [updateTask, { isLoading: updating, error: updateError }] = useUpdateTaskMutation()
  const [deleteTask, { isLoading: deleting, error: deleteError }] = useDeleteTaskMutation()

  const errorMessage = useMemo(() => {
    return getErrorMessage(fetchError ?? createError ?? updateError ?? deleteError)
  }, [fetchError, createError, updateError, deleteError])

  const setActiveTask = useCallback((task: ITask) => dispatch(setActiveTaskId(task.id)), [dispatch])
  const clearActiveTask = useCallback(() => {
    dispatch(setActiveTaskId(undefined))
  }, [dispatch])

  return {
    // STATE
    activeTask,
    setActiveTask,
    clearActiveTask,
    // Datos y flags RTKQ
    tasks,
    fetching,
    creating,
    updating,
    deleting,
    errorMessage,
    refetch,
    // Mutations RTKQ
    createTask,
    updateTask,
    deleteTask,
  }
}
