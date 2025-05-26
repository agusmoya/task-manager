import { useCallback } from 'react'

import { type Category } from '../../types/category.d'

import { useAppDispatch, useAppSelector } from './reduxStore.ts'
import { onClearBackendErrorMessage } from '../slices/category/categorySlice.ts'
import { createCategoryThunk, fetchCategoriesThunk } from '../slices/category/categoryThunks.ts'

export const useCategoryActions = () => {
  const dispatch = useAppDispatch()
  const { categories, loading, backendErrorMessage } = useAppSelector(state => state.taskCategory)

  const fetchCategories = useCallback(async (): Promise<void> => {
    try {
      await dispatch(fetchCategoriesThunk()).unwrap()
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [dispatch])

  const saveCategory = useCallback(
    async (category: Partial<Category>): Promise<Category | undefined> => {
      const isUpdating = !!category.id
      try {
        if (isUpdating) {
          // return await dispatch(updateCategoryThunk(category)).unwrap()
        } else {
          return await dispatch(createCategoryThunk(category)).unwrap()
        }
      } catch (error) {
        console.error('Error creating categories:', error)
      }
    },
    [dispatch]
  )

  const clearBackendErrorMessage = useCallback(() => {
    dispatch(onClearBackendErrorMessage())
  }, [dispatch])

  return {
    //* Properties
    categories,
    backendErrorMessage,
    loading,
    //* Methods
    fetchCategories,
    saveCategory,
    clearBackendErrorMessage,
  }
}
