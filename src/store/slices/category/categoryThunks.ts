import { createAsyncThunk } from '@reduxjs/toolkit'

import { type Category } from '../../../types/category.d'

import todoApi from '../../../api/taskManagerApi.ts'
import { handlerApiError } from '../../../api/helpers/handlerApiError.ts'

export const fetchCategoriesThunk = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await todoApi.get<{ categories: Category[] }>('/categories')
      return data.categories
    } catch (error) {
      const { errorMessage } = handlerApiError(error)
      return thunkAPI.rejectWithValue(errorMessage ?? 'Error fetching categories.')
    }
  }
)

export const createCategoryThunk = createAsyncThunk<
  Category,
  Partial<Category>,
  { rejectValue: string }
>('categories/create', async (category, thunkAPI) => {
  try {
    const { data } = await todoApi.post('/categories', category)
    return data.category
  } catch (error) {
    const { errorMessage } = handlerApiError(error)
    return thunkAPI.rejectWithValue(errorMessage ?? 'Error creating category.')
  }
})
