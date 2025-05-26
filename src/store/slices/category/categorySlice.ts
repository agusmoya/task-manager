import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import { type Category } from '../../../types/category'

import { fetchCategoriesThunk, createCategoryThunk } from './categoryThunks.ts'

interface CategoriesState {
  categories: Category[]
  loading: boolean
  backendErrorMessage?: string
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
      state.categories = state.categories.map(cat => (cat.id === payload.id ? payload : cat))
    },
    onDeleteCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = state.categories.filter(cat => cat.id !== payload.id)
    },
    onClearBackendErrorMessage: state => {
      state.backendErrorMessage = undefined
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategoriesThunk.fulfilled, (state, { payload }) => {
        state.categories = payload
        state.loading = false
      })
      .addCase(createCategoryThunk.fulfilled, (state, { payload }) => {
        state.categories.push(payload)
        state.loading = false
      })
      .addMatcher(isAnyOf(fetchCategoriesThunk.pending, createCategoryThunk.pending), state => {
        state.loading = true
        state.backendErrorMessage = undefined
      })
      .addMatcher(
        isAnyOf(fetchCategoriesThunk.rejected, createCategoryThunk.rejected),
        (state, { payload }) => {
          state.backendErrorMessage = payload
          state.loading = false
        }
      )
  },
})

export const { onAddNewCategory, onUpdateCategory, onDeleteCategory, onClearBackendErrorMessage } =
  taskCategorySlice.actions
