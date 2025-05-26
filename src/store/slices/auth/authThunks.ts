import { createAsyncThunk } from '@reduxjs/toolkit'

import { type LoginUserRequest } from '../../../types/login-request.d'
import { type RegisterUserRequest } from '../../../types/register-request.d'
import { type IAuthResponse } from '../../../types/dtos/auth-response'

import todoApi from '../../../api/taskManagerApi.ts'

import { handlerApiError } from '../../../api/helpers/handlerApiError.ts'

export const loginThunk = createAsyncThunk<
  IAuthResponse,
  LoginUserRequest,
  { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await todoApi.post<IAuthResponse>('/auth/login', credentials)
    return data
  } catch (error) {
    const { errorMessage } = handlerApiError(error)
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const registerThunk = createAsyncThunk<
  IAuthResponse,
  RegisterUserRequest,
  { rejectValue: string }
>('auth/register', async (formData, thunkAPI) => {
  try {
    const { data } = await todoApi.post<IAuthResponse>('/auth/register', formData)
    return data
  } catch (error) {
    const { errorMessage } = handlerApiError(error)
    return thunkAPI.rejectWithValue(errorMessage ?? 'Error creating user.')
  }
})

export const checkAuthTokenThunk = createAsyncThunk<IAuthResponse, void, { rejectValue: string }>(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const { data } = await todoApi.post<IAuthResponse>('/auth/refresh')
      return data
    } catch (error) {
      const { errorMessage } = handlerApiError(error)
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const logoutThunk = createAsyncThunk<void, void>('auth/logout', async (_, thunkAPI) => {
  try {
    await todoApi.post('/auth/logout')
  } catch (error) {
    const { errorMessage } = handlerApiError(error)
    return thunkAPI.rejectWithValue(errorMessage ?? 'Error on logout.')
  }
})
