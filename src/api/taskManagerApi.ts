import axios from 'axios'

import { getEnvVariables } from '../helpers/getEnvVariables.ts'
import { store } from '../store/store.ts'
import { onLogin, onLogout } from '../store/slices/auth/authSlice.ts'

const { VITE_API_URL } = getEnvVariables()

const todoApi = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true, // Para enviar cookies (refreshToken HttpOnly)
})

// Agregar accessToken a cada request si existe
todoApi.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// Manejo automático de token expirado
todoApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Verifica si hay un error de red o CORS
    if (!error.response || originalRequest._retry) {
      console.error('Network/CORS error:', error)
      return Promise.reject(error)
    }

    // Si el error es 401 (no autorizado) y no es una request de renovación
    // Evitar bucles con URLs específicas
    if (
      error.response?.status === 401
      && !originalRequest._retry
      && !originalRequest.url.includes('/auth/refresh')
      && !originalRequest.url.includes('/auth/logout')
    ) {
      originalRequest._retry = true // Marcar para no reintentar en bucle

      try {
        // Paso 1: Renovar el accessToken usando el refreshToken (cookie HttpOnly)
        const { data } = await todoApi.post('/auth/refresh')
        // Paso 2: Actualizar solo el accessToken
        const { uid, firstName, lastName, email, accessToken } = data
        // Actualizar token en Redux
        store.dispatch(onLogin({ uid, firstName, lastName, email, accessToken }))
        // Paso 3: Reintentar la request original con el nuevo token        
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return todoApi(originalRequest)
      } catch (refreshError) {
        // Si falla la renovación, hacemos logout
        store.dispatch(onLogout('Failed to refresh token. Please log in again.'))
        return Promise.reject(refreshError)
      }
    }
    // Para otros errores (403, 500, etc.), rechaza normalmente
    return Promise.reject(error)
  }
)

export default todoApi
