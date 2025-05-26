import { AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios'
import todoApi from './taskManagerApi'
import { checkAuthTokenThunk } from '../store/slices/auth/authThunks'
import { AppDispatch, RootState } from '../store/store'

/** Endpoints de auth que NO deben disparar refresh */
function isAuthPath(url?: string): boolean {
  const AUTH_PATHS = ['/auth/login', '/auth/refresh', '/auth/logout']
  return !!url && AUTH_PATHS.some(path => url.endsWith(path))
}

/**
 * Registra interceptores en todoApi.
 * @param dispatch
 * @param getState
 */
export function setupInterceptors(dispatch: AppDispatch, getState: () => RootState): void {
  // Request: inyecta el Bearer token siempre que exista
  todoApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      // Asegúrate de que headers exista
      config.headers = config.headers ?? {}
      const token = getState().auth.accessToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  )

  // Response: un solo onFulfilled y onRejected con refresh
  todoApi.interceptors.response.use(
    // onFulfilled: el DTO puro
    response => {
      console.log('Response:', response)
      return response
    },
    // onRejected: maneja 401 → refresh o rechaza con Error(msg)
    async (error: AxiosError<{ message?: string }>): Promise<never> => {
      const status = error.response?.status
      const original = error.config as AxiosRequestConfig & { _retry?: boolean }

      // 1️⃣ Si es 401, aún no reintentado y no es endpoint de auth…
      if (status === 401 && !original._retry && !isAuthPath(original.url)) {
        original._retry = true

        try {
          // 2️⃣ Lanza tu thunk de refresh
          const { accessToken: newToken } = await dispatch(checkAuthTokenThunk()).unwrap()

          // 3️⃣ Reinyecta el header y reintenta
          original.headers = original.headers ?? {}
          original.headers.Authorization = `Bearer ${newToken}`
          return await todoApi.request(original)
        } catch (refreshError) {
          // Si falla el refresh, propaga ese error
          return Promise.reject(refreshError)
        }
      }

      // 4️⃣ Para otros errores, extrae message o usa error.message
      const serverMsg = error.response?.data?.message
      const finalMsg = serverMsg ?? error.message
      return Promise.reject(new Error(finalMsg))
    }
  )
}
