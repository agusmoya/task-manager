import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import { onClouseModal, onOpenModal } from "../slices/ui/modalSlice.ts"

export const useModalActions = () => {
  const dispatch = useAppDispatch()
  const { isModalOpen } = useAppSelector((state) => state.modal)

  const openModal = () => {
    dispatch(onOpenModal())
  }

  const closeModal = () => {
    dispatch(onClouseModal())
  }

  return {
    //* Properties
    isModalOpen,
    //* Methods
    openModal,
    closeModal,
  }
}