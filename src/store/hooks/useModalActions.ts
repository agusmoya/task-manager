import { useAppDispatch, useAppSelector } from '../reduxStore'
import { onClose, onOpen } from '../slices/ui/modalSlice'
import { useCallback } from 'react'

export const useModalActions = (modalId: string) => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(state => state.modal.openModals[modalId] ?? false)

  const open = useCallback(() => {
    dispatch(onOpen(modalId))
  }, [dispatch, modalId])

  const close = useCallback(() => {
    dispatch(onClose(modalId))
  }, [dispatch, modalId])

  return {
    //* Properties
    isOpen,
    //* Methods
    open,
    close,
  }
}
