import axios from 'axios'

import { getEnvVariables } from '../helpers/getEnvVariables.ts'
import { store } from '../store/store.ts'
import { onLogin, onLogout } from '../store/slices/auth/authSlice.ts'
import { jwtDecode } from 'jwt-decode'

const { VITE_API_URL } = getEnvVariables()

const todoApi = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true, // Para enviar cookies (refreshToken HttpOnly)
})

const isTokenExpired = (token: string) => {
  if (!token) return true
  try {
    const { exp } = jwtDecode<{ exp: number }>(token)
    const now = Math.floor(Date.now() / 1000)
    return exp < now
  } catch (error) {
    console.log('Error decoding token:', error)
    // Si hay un error al decodificar el token, consideramos que está expirado
    return true
  }
}

todoApi.interceptors.request.use(
  async (config) => {
    const { accessToken } = store.getState().auth

    if (accessToken && isTokenExpired(accessToken)) {
      console.warn('Access token expired. Trying to refresh...')
      try {
        const { data } = await todoApi.post('/auth/refresh')
        const { uid, firstName, lastName, email, accessToken: newAccessToken } = data
        store.dispatch(onLogin({ uid, firstName, lastName, email, accessToken: newAccessToken }))
        config.headers.Authorization = `Bearer ${newAccessToken}`
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError)
        store.dispatch(onLogout())
        throw refreshError
      }
    } else if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  })

// Interceptor para manejar errores de token expirado
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
