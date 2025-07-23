import { useToastActions } from '../../store/hooks/useToastActions'
import { Toast } from './Toast'

import './ToastContainer.css'

/**
 * ToastContainer renders all active toasts and provides
 * a polite live region for screen readers.
 */
export const ToastContainer = () => {
  const { toasts, removeToast } = useToastActions()

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  )
}
