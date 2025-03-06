import { useDispatch, useSelector } from "react-redux"

import { RootState } from "../store"
import { onClouseModal, onOpenModal } from "../slices/ui/uiEventModalSlice"

export const useEventModalStore = () => {
  const dispatch = useDispatch()
  const { isModalOpen } = useSelector((state: RootState) => state.ui)

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