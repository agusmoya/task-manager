import { Button } from '../button/Button'
import { Modal } from '../modal/Modal'

import './ConfirmModal.css'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onCancel}>
      <p className="confirm-modal__message">{message}</p>
      <div className="confirm-modal__actions">
        <Button type="button" className="btn btn--text" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button type="button" className="btn btn--filled" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
