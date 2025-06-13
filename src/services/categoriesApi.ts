import { baseApi } from './baseApi'

import { ICategory } from '../types/category'
import { ICategoryCreatePayload, ICategoryUpdatePayload } from '../types/dtos/category'

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchCategories: builder.query<ICategory[], void>({
      query: () => ({ url: '/categories', method: 'GET' }),
      providesTags: (result = []) => [
        { type: 'Category', id: 'LIST' },
        ...result.map(c => ({ type: 'Category' as const, id: c.id })),
      ],
    }),
    createCategory: builder.mutation<ICategory, ICategoryCreatePayload>({
      query: newCategory => ({
        url: '/categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<ICategory, ICategoryUpdatePayload>({
      query: updatedCategory => ({
        url: `/categories/${updatedCategory.id}`,
        method: 'PUT',
        body: updatedCategory,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<void, string>({
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
} = categoriesApi
