import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_API_URL } = getEnvVariables()

const todoApi = axios.create({
  baseURL: VITE_API_URL,
})

todoApi.interceptors.request.use(
  (config) => {
    config.headers.set('x-token', localStorage.getItem('token') || '')
    return config
  })
export default todoApi
