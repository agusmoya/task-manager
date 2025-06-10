import { useCallback, useMemo } from 'react'

import { type ICategory } from '../../types/category'

import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../services/categoriesApi'

import { getErrorMessage } from '../../api/helpers/getErrorMessage'

export const useCategoryActions = () => {
  const {
    data: categories = [],
    isLoading: fetching,
    error: fetchError,
    refetch,
  } = useFetchCategoriesQuery()

  const [createCategoryTrigger, { isLoading: creating, error: createError }] =
    useCreateCategoryMutation()
  const [updateCategoryTrigger, { isLoading: updating, error: updateError }] =
    useUpdateCategoryMutation()
  const [deleteCategoryTrigger, { isLoading: deleting, error: deleteError }] =
    useDeleteCategoryMutation()

  const errorMessage = useMemo(() => {
    return getErrorMessage(createError ?? updateError ?? deleteError ?? fetchError)
  }, [createError, updateError, deleteError, fetchError])

  const createCategory = useCallback(
    async (newCategoryName: string): Promise<ICategory | null> => {
      try {
        const payload = await createCategoryTrigger(newCategoryName.trim()).unwrap()
        return payload
      } catch (err) {
        console.error('Error creating category:', err)
        return null
      }
    },
    [createCategoryTrigger]
  )

  const updateCategory = useCallback(
    async (cat: ICategory) => {
      try {
        const payload = await updateCategoryTrigger(cat).unwrap()
        return payload
      } catch (err) {
        console.error('Error updating category:', err)
        return null
      }
    },
    [updateCategoryTrigger]
  )

  const deleteCategory = useCallback(
    async (id: string) => {
      try {
        await deleteCategoryTrigger(id).unwrap()
        return id
      } catch (err) {
        console.error('Error deleting category:', err)
        return null
      }
    },
    [deleteCategoryTrigger]
  )

  return {
    categories,
    fetching,
    creating,
    updating,
    deleting,
    errorMessage,
    refetch,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
