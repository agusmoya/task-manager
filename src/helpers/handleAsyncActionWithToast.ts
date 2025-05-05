import { AppDispatch } from "../store/store.ts"
import { onShowToast, onUpdateToastStatus } from "../store/slices/ui/toastSlice.ts"
import { Action } from "@reduxjs/toolkit"

type AsyncAction<T> = () => Promise<T>

export const handleAsyncActionWithToast = async <T>(
  dispatch: AppDispatch,
  action: AsyncAction<T>,
  messages: { loading: string; success: string; error: string },
  clearErrorAction?: () => Action

): Promise<{ wasSuccessful: boolean; resultData: T | undefined }> => {
  const toastId = dispatch(onShowToast(messages.loading, "loading")).payload.id
  let resultData: T | undefined = undefined

  try {
    resultData = await action()
    dispatch(onUpdateToastStatus({ id: toastId, message: messages.success, status: "success" }))
    return { wasSuccessful: true, resultData }
  } catch (error) {
    console.error(error)
    dispatch(onUpdateToastStatus({ id: toastId, message: messages.error, status: "error" }))

    if (clearErrorAction) {
      setTimeout(() => {
        dispatch(clearErrorAction())
      }, 5000)
    }

    return { wasSuccessful: false, resultData: undefined }
  }
}
