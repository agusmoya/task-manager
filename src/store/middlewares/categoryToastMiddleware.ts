import { categoriesApi } from '../../services/categoriesApi'
import { registerToastFor } from './toastHelper'

const { fetchCategories, createCategory } = categoriesApi.endpoints

const listCategoryOperations = {
  endpoints: {
    matchPending: fetchCategories.matchPending,
    matchFulfilled: fetchCategories.matchFulfilled,
    matchRejected: fetchCategories.matchRejected,
  },
  messages: {
    loading: 'Loading categories…',
    success: 'Categories loaded',
    error: 'Error loading categories',
  },
}

const createCategoryOperations = {
  endpoints: {
    matchPending: createCategory.matchPending,
    matchFulfilled: createCategory.matchFulfilled,
    matchRejected: createCategory.matchRejected,
  },
  messages: {
    loading: 'Creating category…',
    success: 'Category created',
    error: 'Error creating category',
  },
}

const toastCategoryOperations = [
  //opreations
  listCategoryOperations,
  createCategoryOperations,
]

toastCategoryOperations.forEach(({ endpoints, messages }) =>
  registerToastFor({ endpoints, messages })
)
