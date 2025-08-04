import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../services/categoryApi'

import { getErrorMessage, OperationError } from '../../api/helpers/getErrorMessage'
import { useMemo } from 'react'

export const useCategoryActions = () => {
  const {
    data: categories = [],
    isLoading: fetching,
    error: fetchError,
    refetch,
  } = useFetchCategoriesQuery()
  const [createCategory, { isLoading: creating, error: createError }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: updating, error: updateError }] = useUpdateCategoryMutation()
  const [deleteCategory, { isLoading: deleting, error: deleteError }] = useDeleteCategoryMutation()

  const categoryErrors = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.FETCH, error: fetchError },
        { operation: OperationError.CREATE, error: createError },
        { operation: OperationError.UPDATE, error: updateError },
        { operation: OperationError.DELETE, error: deleteError },
      ]),
    [fetchError, createError, updateError, deleteError]
  )

  const {
    fetch: fetchCategoryError,
    create: createCategoryError,
    update: updateCategoryError,
    delete: deleteCategoryError,
  } = categoryErrors

  return {
    // RTKQ Data and flags
    categories,
    fetching,
    creating,
    updating,
    deleting,
    refetch,
    // RTKQ mutations
    createCategory,
    updateCategory,
    deleteCategory,
    // RTKQ parsed errors
    fetchCategoryError,
    createCategoryError,
    updateCategoryError,
    deleteCategoryError,
  }
}
