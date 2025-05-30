import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import type { SerializedError } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import type { ApiResponse } from '../types/response.d'

type RTKError = FetchBaseQueryError | SerializedError

export function getErrorMessage(error: unknown): string {
  // 0️⃣ Si viene undefined o null
  if (error == null) {
    return '' // o 'Unexpected error' si prefieres un mensaje por defecto
  }

  // 1️⃣ AxiosError
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<ApiResponse<unknown>>
    return axiosErr.response?.data?.message ?? axiosErr.message
  }

  // 2️⃣ Si no es un objeto, devolvemos string directo
  if (typeof error !== 'object') {
    return String(error)
  }

  // A partir de aquí error es objeto y no null
  const rtkErr = error as RTKError

  // 3️⃣ FetchBaseQueryError (RTK Query)
  if ('status' in rtkErr) {
    const data = (rtkErr as FetchBaseQueryError).data
    // a) backend envía { message }
    if (typeof data === 'object' && data !== null && 'message' in data) {
      return (data as { message: string }).message
    }
    // b) backend envía string
    if (typeof data === 'string') {
      return data
    }
    // c) fallback al código de estado
    return `Error ${rtkErr.status}`
  }

  // 4️⃣ SerializedError (createAsyncThunk, etc)
  if ('message' in rtkErr && typeof rtkErr.message === 'string') {
    return rtkErr.message
  }

  // 5️⃣ Cualquier otro objeto
  return JSON.stringify(error) || 'Unexpected error'
}
