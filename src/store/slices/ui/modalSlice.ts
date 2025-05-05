import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
  isModalOpen: boolean;
}

const initialState: ModalState = {
  isModalOpen: false,
}

export const modalSlice = createSlice({
  name: 'CustomModal',
  initialState,
  reducers: {
    onOpenModal: (state) => {
      state.isModalOpen = true
    },
    onClouseModal: (state) => {
      state.isModalOpen = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { onOpenModal, onClouseModal } = modalSlice.actions
