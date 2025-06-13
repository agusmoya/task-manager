import { useEffect } from 'react'

import { TOAST_STATUS } from '../../types/toast.d'

import { CheckIcon, ErrorIcon } from '../icons/Icons'

import { useToastActions } from '../../store/hooks/useToastActions'

import './Toast.css'

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastActions()

  useEffect(() => {
    const timers: number[] = []
    toasts.forEach(({ id, status, duration }) => {
      if (status !== TOAST_STATUS.LOADING) {
        const timeout = setTimeout(() => removeToast(id), duration)
        timers.push(timeout)
      }
    })
    return () => timers.forEach(clearTimeout)
  }, [toasts, removeToast])

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.status}`}>
          {toast.status === TOAST_STATUS.LOADING && <span className="loader" />}
          {toast.status === TOAST_STATUS.SUCCESS && (
            <span className="icon success">
              <CheckIcon color="green" />
            </span>
          )}
          {toast.status === TOAST_STATUS.ERROR && (
            <span className="icon error">
              <ErrorIcon color="red" />
            </span>
          )}
          <span>{toast.message}</span>
          <span className="toast-progress" style={{ animationDuration: `${toast.duration}ms` }} />
        </div>
      ))}
    </div>
  )
}
