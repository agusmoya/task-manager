
import axios from "axios"

import { type Category } from "../../types/category.d"

import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import { onFetchCategories, onCreateCategory, onClearErrorMessage } from '../slices/category/taskCategorySlice.ts';
import {
  onAddNewCategory,
  onDeleteCategory,
  onUpdateCategory
} from './../slices/category/taskCategorySlice.ts'

export const useTaskCategoryActions = () => {
  const dispatch = useAppDispatch()
  const { categories, backendErrorMessage, loading } = useAppSelector((state) => state.taskCategory)

  const getCategories = () => {
    try {
      dispatch(onFetchCategories())
    } catch (error) {
      manageBackendError(error)
    }
  }

  const saveCategory = async (category: Category) => {
    try {
      if (category.id) {
        dispatch(onUpdateCategory(category))
      } else {
        dispatch(onAddNewCategory(category))
      }
    } catch (error) {
      manageBackendError(error)
    }
  }

  const createCategory = async (category: Category) => {
    try {
      if (category.id) {
        dispatch(onUpdateCategory(category))
      } else {
        const resultAction = await dispatch(onCreateCategory(category)).unwrap()
        console.log('Created category:', resultAction)
        // Si querés hacer algo más (ej: mostrar mensaje o limpiar el input)
      }
    } catch (error) {
      // Podés lanzar un toast o algo visual acá
      manageBackendError(error)
    }
  }

  const deleteCategory = async (category: Category) => {
    try {
      dispatch(onDeleteCategory(category))
    } catch (error) {
      manageBackendError(error)
    }
  }

  const manageBackendError = (responseError: unknown) => {
    if (
      axios.isAxiosError(responseError)
      && responseError.response
      && responseError.response.data
    ) {
      const { errors, msg } = responseError.response.data
      let errorMessage = ''
      if (errors) {
        errorMessage = errors[0].msg
      } else if (msg) {
        errorMessage = msg
      } else {
        errorMessage = 'An unexpected axios error occurred.'
        console.error(errorMessage, responseError)
      }
    } else {
      console.error(responseError)
    }
    clearErrorMessage()
  }

  const clearErrorMessage = () => {
    setTimeout(() => {
      dispatch(onClearErrorMessage())
    }, 5000)
  }

  return {
    //* Properties
    categories,
    backendErrorMessage,
    loading,
    //* Methods
    getCategories,
    saveCategory,
    createCategory,
    deleteCategory,
  }
}