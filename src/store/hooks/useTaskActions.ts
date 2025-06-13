import { useAppDispatch, useAppSelector } from '../reduxStore'

import { ITask } from '../../types/task'

import {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../../services/tasksApi'

import { setActiveTaskId, selectTaskById } from './../slices/task/taskSlice'

import { getErrorMessage, OperationError } from '../../api/helpers/getErrorMessage'
import { useMemo } from 'react'

export const useTaskActions = () => {
  const dispatch = useAppDispatch()
  const { activeTaskId } = useAppSelector(state => state.task)
  const activeTask: ITask | undefined = useAppSelector(state =>
    activeTaskId ? selectTaskById(state, activeTaskId) : undefined
  )

  const setActiveTask = (task: ITask) => dispatch(setActiveTaskId(task.id))
  const clearActiveTask = () => dispatch(setActiveTaskId(undefined))

  const { data: tasks = [], isLoading: fetching, error: fetchError, refetch } = useFetchTasksQuery()
  const [createTask, { isSuccess: createSuccess, isLoading: creating, error: createError }] =
    useCreateTaskMutation()
  const [updateTask, { isSuccess: updateSuccess, isLoading: updating, error: updateError }] =
    useUpdateTaskMutation()
  const [deleteTask, { isSuccess: deleteSuccess, isLoading: deleting, error: deleteError }] =
    useDeleteTaskMutation()

  const {
    fetch: fetchTaskError,
    create: createTaskError,
    update: updateTaskError,
    delete: deleteTaskError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.FETCH, error: fetchError },
        { operation: OperationError.CREATE, error: createError },
        { operation: OperationError.UPDATE, error: updateError },
        { operation: OperationError.DELETE, error: deleteError },
      ]),
    [fetchError, createError, updateError, deleteError]
  )

  return {
    // state
    activeTask,
    setActiveTask,
    clearActiveTask,
    // RTKQ Data and flags
    tasks,
    fetching,
    creating,
    updating,
    deleting,
    refetch,
    // RTKQ mutations
    createTask,
    createSuccess,
    updateTask,
    updateSuccess,
    deleteTask,
    deleteSuccess,
    // RTKQ parsed errors
    fetchTaskError,
    createTaskError,
    updateTaskError,
    deleteTaskError,
  }
}
