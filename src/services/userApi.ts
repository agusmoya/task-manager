import { baseApi } from './baseApi'

import { IUser } from '../types/user'

import { IUpdateUserDto } from '../types/dtos/user'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<IUser, void>({
      query: () => ({ url: '/users/me', method: 'GET' }),
      providesTags: () => [{ type: 'User' }],
    }),
    uploadAvatar: builder.mutation<{ profileImageURL: string }, FormData>({
      // FormData with key "avatar"
      query: formData => ({
        url: '/users/me/avatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    updateProfile: builder.mutation<IUser, IUpdateUserDto>({
      query: data => ({
        url: '/users/me',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation, useUploadAvatarMutation } = userApi
