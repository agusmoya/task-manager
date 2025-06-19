import { useMemo } from 'react'

import {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../../services/tasksApi'

import { setActiveTaskId } from './../slices/task/taskSlice'

import { getErrorMessage, OperationError } from '../../api/helpers/getErrorMessage'

export const useTaskActions = () => {
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
    setActiveTaskId,
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
