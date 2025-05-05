import { useEffect } from 'react'

import { CheckIcon, ErrorIcon } from '../icons/Icons.tsx'

import { useToastActions } from '../../store/hooks/useToastActions.ts'


import './Toast.css'


export const ToastContainer = () => {

  const { toasts, removeToast } = useToastActions()

  useEffect(() => {
    toasts.forEach(toast => {
      if (toast.status !== 'loading') {
        const timeout = setTimeout(() => {
          removeToast(toast.id)
        }, toast.duration)

        return () => clearTimeout(timeout)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toasts])

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.status}`}>
          {toast.status === 'loading' && <span className="loader" />}
          {toast.status === 'success' && <span className="icon success"><CheckIcon /></span>}
          {toast.status === 'error' && <span className="icon error"><ErrorIcon /></span>}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
