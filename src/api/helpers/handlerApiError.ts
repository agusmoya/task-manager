import axios from 'axios'

import { type HandledApiError, type ApiResponse } from '../types/response.d'

export const handlerApiError = (error: unknown): HandledApiError => {
  console.error('HANDLER-API-ERROR: ', error)

  if (axios.isAxiosError<ApiResponse<unknown>>(error) && error.response) {
    const { message } = error.response.data
    return {
      status: error.response.status,
      message: message ?? 'Unexpected error from backend.',
    }
  }

  return {
    status: 500,
    message: 'An unexpected error occurred.',
  }
}
