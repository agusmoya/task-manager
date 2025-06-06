import { AxiosError, InternalAxiosRequestConfig } from 'axios'
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
  todoApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {}
    const token = getState().auth.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Response interceptor: un solo onFulfilled y onRejected con refresh
  todoApi.interceptors.response.use(
    // onFulfilled: el DTO puro
    response => {
      console.log('Response:', response)
      return response
    },
    // onRejected: maneja 401 → refresh o rechaza con Error(msg)
    async (error: AxiosError): Promise<never> => {
      console.log('AxiosError:', error)
      const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
      const status = error.response?.status

      // 1️⃣ Si es 401, aún no reintentado y no es endpoint de auth…
      if (status === 401 && !original._retry && !isAuthPath(original.url)) {
        original._retry = true

        try {
          // 2️⃣ Lanza thunk de refresh
          const { accessToken } = await dispatch(checkAuthTokenThunk()).unwrap()
          // Asegura que todas las peticiones posteriores (incluso fuera del retry)
          // vayan con el token renovado.
          todoApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`
          // 3️⃣ Reinyecta el header y reintenta
          original.headers = original.headers ?? {}
          original.headers.Authorization = `Bearer ${accessToken}`
          return await todoApi.request(original)
        } catch (refreshError) {
          // Si falla el refresh, propaga ese error
          return Promise.reject(refreshError)
        }
      }

      // 4️⃣ Para otros errores, extrae message o usa error.message
      return Promise.reject(new Error(error.message))
    }
  )
}
