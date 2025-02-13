import { createSlice } from '@reduxjs/toolkit'

export interface EventModalState {
  isModalOpen: boolean;
}

const initialState: EventModalState = {
  isModalOpen: false,
}

export const eventModalSlice = createSlice({
  name: 'EventModal',
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
export const { onOpenModal, onClouseModal } = eventModalSlice.actions

// export default eventModalSlice.reducer