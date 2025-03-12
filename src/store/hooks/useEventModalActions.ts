import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import { onClouseModal, onOpenModal } from "../slices/ui/uiEventModalSlice.ts"

export const useEventModalActions = () => {
  const dispatch = useAppDispatch()
  const { isModalOpen } = useAppSelector((state) => state.ui)

  const openModal = () => {
    dispatch(onOpenModal())
  }

  const closeModal = () => {
    dispatch(onClouseModal())
  }

  const toggleDateModal = () => isModalOpen ? openModal() : closeModal()

  return {
    //* Properties
    isModalOpen,
    //* Methods
    toggleDateModal,
    openModal,
    closeModal,
  }
}