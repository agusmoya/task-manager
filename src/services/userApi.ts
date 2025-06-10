import { baseApi } from './baseApi'

import { IUser } from '../types/user'
import { IUserDto } from '../types/dtos/user'

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchContacts: builder.query<IUser[], void>({
      query: () => '/users/contacts',
      providesTags: (result = []) => [
        { type: 'User', id: 'LIST' },
        ...result.map(u => ({ type: 'User' as const, id: u.id })),
      ],
    }),
    fetchUserById: builder.query<IUser, string>({
      query: id => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    updateUser: builder.mutation<IUser, IUserDto>({
      query: user => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: (_result, _error, user) => [
        { type: 'User', id: 'LIST' },
        { type: 'User', id: user.id },
      ],
    }),
  }),
})

export const { useFetchContactsQuery, useFetchUserByIdQuery, useUpdateUserMutation } = usersApi
