import { onShowToast, onUpdateToastStatus } from '../slices/ui/toastSlice'
import { startAppListening } from '../listenerMiddleware'
import { categoryApi } from '../../api/RTKQuery/categoryApi'

// Mapa para relacionar cada requestId con su toastId
const toastMap = new Map<string, string>()

// , updateCategory, deleteCategory
const { fetchCategories, createCategory } = categoryApi.endpoints

startAppListening({
  matcher: fetchCategories.matchPending,
  effect: ({ meta }, listenerApi) => {
    const toastId = listenerApi.dispatch(onShowToast('Loading categories...', 'loading')).payload.id
    toastMap.set(meta.requestId, toastId)
  },
})

startAppListening({
  matcher: fetchCategories.matchFulfilled,
  effect: ({ meta }, listenerApi) => {
    const toastId = toastMap.get(meta.requestId)
    if (toastId) {
      listenerApi.dispatch(
        onUpdateToastStatus({
          id: toastId,
          message: 'Categories loaded ✔️',
          status: 'success',
        })
      )
      toastMap.delete(meta.requestId)
    }
  },
})

startAppListening({
  matcher: fetchCategories.matchRejected,
  effect: ({ meta }, listenerApi) => {
    const toastId = toastMap.get(meta.requestId)
    if (toastId) {
      listenerApi.dispatch(
        onUpdateToastStatus({
          id: toastId,
          message: 'Error loading categories ❌',
          status: 'error',
        })
      )
      toastMap.delete(meta.requestId)
    }
  },
})

startAppListening({
  matcher: createCategory.matchPending,
  effect: ({ meta }, listenerApi) => {
    const toastId = listenerApi.dispatch(onShowToast('Saving category…', 'loading')).payload.id
    toastMap.set(meta.requestId, toastId)
  },
})

startAppListening({
  matcher: createCategory.matchFulfilled,
  effect: ({ meta }, listenerApi) => {
    const toastId = toastMap.get(meta.requestId)
    if (toastId) {
      listenerApi.dispatch(
        onUpdateToastStatus({
          id: toastId,
          message: 'Category saved ✔️',
          status: 'success',
        })
      )
      toastMap.delete(meta.requestId)
    }
  },
})

startAppListening({
  matcher: createCategory.matchRejected,
  effect: ({ meta }, listenerApi) => {
    const toastId = toastMap.get(meta.requestId)
    if (toastId) {
      listenerApi.dispatch(
        onUpdateToastStatus({
          id: toastId,
          message: 'Error saving category ❌',
          status: 'error',
        })
      )
      toastMap.delete(meta.requestId)
    }
  },
})
