import { AxiosError } from "axios"

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { type Category } from "../../../types/category.d"

import todoApi from "../../../api/taskManagerApi.ts"

interface CategoriesState {
  categories: Category[]
  loading: boolean
  backendErrorMessage: string | undefined
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  backendErrorMessage: undefined,
}

export const taskCategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    onAddNewCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories.push(payload)
    },
    onUpdateCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = state.categories.map(cat =>
        cat.id === payload.id ? payload : cat
      )
    },
    onDeleteCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = state.categories.filter(cat =>
        cat.id !== payload.id
      )
    },
    onClearErrorMessage: (state) => {
      state.backendErrorMessage = undefined
    }
  },
  extraReducers(builder) {
    builder.
      // FETCH
      addCase(onFetchCategories.pending, (state) => {
        state.loading = true
        state.backendErrorMessage = undefined
      })
      .addCase(onFetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload
        state.loading = false
      })
      .addCase(onFetchCategories.rejected, (state, { payload }) => {
        state.loading = false
        state.backendErrorMessage = payload as string
      })
      // CREATE
      .addCase(onCreateCategory.pending, (state) => {
        state.loading = true
        state.backendErrorMessage = undefined
      })
      .addCase(onCreateCategory.fulfilled, (state, { payload }) => {
        state.loading = false
        state.categories.push(payload)
      })
      .addCase(onCreateCategory.rejected, (state, { payload }) => {
        state.loading = false
        state.backendErrorMessage = payload ?? 'Unknown error creating category'
      })
  },
})

export const onFetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const res = await todoApi.get('/category/all')
      return res.data as Category[]
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error al cargar categorías')
    }
  }
)

// Category, -> tipo que devuelve
// string,   -> argumento que recibe
// { rejectValue: string } -> tipo del error
export const onCreateCategory = createAsyncThunk<Category, Category, { rejectValue: string }>(
  'categories/createCategory',
  async (category, thunkAPI) => {
    try {
      const res = await todoApi.post('/category/new', category)
      return res.data as Category
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error creating category.')
    }
  }
)

export const {
  onAddNewCategory,
  onUpdateCategory,
  onDeleteCategory,
  onClearErrorMessage,

} = taskCategorySlice.actions
