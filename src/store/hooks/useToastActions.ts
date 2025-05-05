import { useAppDispatch, useAppSelector } from "./reduxStore.ts"

import { type ToastStatus } from "../../types/toast.d"

import { onShowToast, onUpdateToastStatus, onRemoveToast } from "../slices/ui/toastSlice.ts"


export const useToastActions = () => {
  const dispatch = useAppDispatch()
  const { toasts } = useAppSelector((state) => state.toast)

  const showToast = (message: string, status: ToastStatus) => {
    dispatch(onShowToast(message, status))
  }

  const updateToastStatus = (toastId: string, status: ToastStatus) => {
    dispatch(onUpdateToastStatus({ id: toastId, status }))
  }

  const removeToast = (toastId: string) => {
    dispatch(onRemoveToast(toastId))
  }


  return {
    //* Properties
    toasts,
    //* Methods
    showToast,
    updateToastStatus,
    removeToast,
  }
}