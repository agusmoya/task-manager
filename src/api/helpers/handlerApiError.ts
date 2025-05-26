import axios from 'axios'

import { type HandledApiError, type ApiResponse } from '../types/response.d'

export const handlerApiError = (error: unknown): HandledApiError => {
  console.error('HANDLER-API-ERROR: ', error)

  if (axios.isAxiosError<ApiResponse<unknown>>(error) && error.response) {
    const { message, error: backendError } = error.response.data
    return {
      errorMessage: message ?? 'Unexpected error from backend.',
      statusCode: error.response.status,
      backendError,
    }
  }

  return {
    errorMessage: 'An unexpected error occurred.',
  }
}
