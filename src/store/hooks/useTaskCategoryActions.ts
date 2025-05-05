import { type Category } from "../../types/category.d"

import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import { onAddNewCategory, onCreateCategory, onDeleteCategory, onFetchCategories, onUpdateCategory, onClearBackendErrorMessage } from './../slices/category/taskCategorySlice.ts'
import { handleAsyncActionWithToast } from "../../helpers/handleAsyncActionWithToast.ts"

export const useTaskCategoryActions = () => {
  const dispatch = useAppDispatch()
  const { categories, backendErrorMessage, loading } = useAppSelector((state) => state.taskCategory)

  const fetchCategories = () => {
    try {
      dispatch(onFetchCategories())
    } catch (error) {
      console.error(error)
    }
  }

  const saveCategoryState = async (category: Category) => {
    try {
      if (category.id) {
        dispatch(onUpdateCategory(category))
      } else {
        dispatch(onAddNewCategory(category))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const saveCategory = async (category: Partial<Category>): Promise<{ wasSuccessful: boolean, resultData: Category | undefined }> => {
    const isUpdating = !!category.id
    return await handleAsyncActionWithToast<Category>(
      dispatch,
      async () => {
        return await dispatch(onCreateCategory(category)).unwrap()
      },
      {
        loading: isUpdating ? "Updating category..." : "Saving category...",
        success: isUpdating ? "Category updated." : "Category created.",
        error: "Error saving category."
      },
      onClearBackendErrorMessage
    )
  }

  const deleteCategory = async (category: Category) => {
    try {
      dispatch(onDeleteCategory(category))
    } catch (error) {
      console.error(error)
    }
  }

  return {
    //* Properties
    categories,
    backendErrorMessage,
    loading,
    //* Methods
    fetchCategories,
    saveCategory,
    saveCategoryState,
    deleteCategory,
    onClearBackendErrorMessage,
  }
}