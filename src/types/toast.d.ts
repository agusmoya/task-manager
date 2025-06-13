export const TOAST_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export type ToastStatus = (typeof TOAST_STATUS)[keyof typeof TOAST_STATUS]
