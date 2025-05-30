import { useAppDispatch, useAppSelector } from '../reduxStore'
import { onClouseModal, onOpenModal } from '../slices/ui/modalSlice'
import { useCallback } from 'react'

export const useModalActions = () => {
  const dispatch = useAppDispatch()
  const { isModalOpen } = useAppSelector(state => state.modal)

  const openModal = useCallback(() => {
    dispatch(onOpenModal())
  }, [dispatch])

  const closeModal = useCallback(() => {
    dispatch(onClouseModal())
  }, [dispatch])

  return {
    //* Properties
    isModalOpen,
    //* Methods
    openModal,
    closeModal,
  }
}
