import { useCallback, useMemo } from 'react'

import { type ICategory } from '../../types/category'

import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../api/RTKQuery/categoryApi'

import { getErrorMessage } from '../../api/helpers/getErrorMessage'

export const useCategoryActions = () => {
  // 1️⃣ Hook de consulta
  const {
    data: categories = [],
    isLoading: isFetchingList,
    error: fetchError,
    refetch,
  } = useFetchCategoriesQuery()

  // 2️⃣ Hooks de mutación
  const [createCategoryTrigger, { isLoading: isCreating, error: createError }] =
    useCreateCategoryMutation()
  const [updateCategoryTrigger, { isLoading: isUpdating, error: updateError }] =
    useUpdateCategoryMutation()
  const [deleteCategoryTrigger, { isLoading: isDeleting, error: deleteError }] =
    useDeleteCategoryMutation()

  const isLoading = useMemo(
    () => ({
      list: isFetchingList,
      create: isCreating,
      update: isUpdating,
      delete: isDeleting,
    }),
    [isFetchingList, isCreating, isUpdating, isDeleting]
  )

  // 3️⃣ Centralizamos un solo mensaje de error
  const errorMessage = useMemo(() => {
    return getErrorMessage(createError ?? updateError ?? deleteError ?? fetchError)
  }, [createError, updateError, deleteError, fetchError])

  // 4️⃣ Métodos para el componente
  const createCategory = useCallback(
    async (newCategoryName: string): Promise<ICategory | null> => {
      try {
        const payload = await createCategoryTrigger(newCategoryName.trim()).unwrap()
        return payload
      } catch (err) {
        // logging, analytics, toasts globales…
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
        // logging, analytics, toasts globales…
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
        // logging, analytics, toasts globales…
        console.error('Error deleting category:', err)
        return null
      }
    },
    [deleteCategoryTrigger]
  )

  return {
    categories,
    isLoading,
    errorMessage,
    refetch,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
