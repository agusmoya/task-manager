/**
 * Tipado de la respuesta unificada que devuelve el backend vía toHandler:
 */
export interface ApiResponse<T> {
  ok: boolean // true si 2xx, false si error
  status: number // código HTTP
  data?: T // payload en caso de éxito
  message?: string // opcional, p.ej. en errores
  error?: string // opcional, detalles de error
  errorCode?: string // opcional, código de negocio
}

export interface HandledApiError {
  errorMessage: string
  statusCode?: number
  backendError?: string
}
