import axios from 'axios'

import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_API_URL } = getEnvVariables()

const todoApi = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true, // Para enviar cookies (refreshToken HttpOnly)
  headers: {
    'Content-Type': 'application/json',
  },
})

export default todoApi
