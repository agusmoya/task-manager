import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * Flag interno para evitar bucles infinitos al refrescar token
     */
    _retry?: boolean
  }
}
