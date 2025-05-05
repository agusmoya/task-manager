import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { type ToastStatus } from '../../../types/toast.d'

export interface Toast {
  id: string
  message: string
  status: ToastStatus
  duration?: number // en ms
}

interface ToastState {
  toasts: Toast[]
}

const initialState: ToastState = {
  toasts: []
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    onShowToast: {
      reducer: (state, { payload }: PayloadAction<Toast>) => {
        state.toasts.push(payload)
      },
      prepare: (message: string, status: ToastStatus = 'loading', duration = 3000) => {
        return {
          payload: {
            id: nanoid(),
            message,
            status,
            duration
          }
        }
      }
    },
    onUpdateToastStatus: (state, { payload }: PayloadAction<{ id: string, message: string, status: ToastStatus }>) => {
      const toast = state.toasts.find(t => t.id === payload.id)
      if (toast) {
        toast.status = payload.status
        toast.message = payload.message
      }
    },
    onRemoveToast: (state, { payload }: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(t => t.id !== payload)
    }
  }
})

export const { onShowToast, onUpdateToastStatus, onRemoveToast } = toastSlice.actions
