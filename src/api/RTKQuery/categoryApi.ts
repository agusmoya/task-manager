import { baseApi } from './baseApi'

import { ICategory } from '../../types/category'

export const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchCategories: builder.query<ICategory[], void>({
      query: () => ({ url: '/categories', method: 'GET' }),
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation({
      query: newCategory => ({
        url: '/categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: updatedCategory => ({
        url: `/categories/${updatedCategory.id}`,
        method: 'PUT',
        body: updatedCategory,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: categoryId => ({
        url: `/categories/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
