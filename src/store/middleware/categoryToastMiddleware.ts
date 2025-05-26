import { createListenerMiddleware } from '@reduxjs/toolkit'
import { fetchCategoriesThunk, createCategoryThunk } from '../slices/category/categoryThunks'
import { onShowToast, onUpdateToastStatus } from '../slices/ui/toastSlice'

// Mapa para relacionar cada requestId con su toastId
const toastMap = new Map<string, string>()

export const categoryToastMiddleware = createListenerMiddleware()

categoryToastMiddleware.startListening({
  actionCreator: fetchCategoriesThunk.pending,
  effect: ({ meta }, listenerApi) => {
    const toastId = listenerApi.dispatch(onShowToast('Cargando categorías…', 'loading')).payload.id
    toastMap.set(meta.requestId, toastId)
  },
})

categoryToastMiddleware.startListening({
  actionCreator: fetchCategoriesThunk.fulfilled,
  effect: ({ meta }, listenerApi) => {
    const toastId = toastMap.get(meta.requestId)
    if (toastId) {
      listenerApi.dispatch(
        onUpdateToastStatus({
          id: toastId,
          message: 'Categorías cargadas ✔️',
          status: 'success',
        })
      )
      toastMap.delete(meta.requestId)
    }
  },
})

categoryToastMiddleware.startListening({
  actionCreator: fetchCategoriesThunk.rejected,
  effect: ({ meta }, listenerApi) => {
    const toastId = toastMap.get(meta.requestId)
    if (toastId) {
      listenerApi.dispatch(
        onUpdateToastStatus({
          id: toastId,
          message: 'Error al cargar categorías ❌',
          status: 'error',
        })
      )
      toastMap.delete(meta.requestId)
    }
  },
})

categoryToastMiddleware.startListening({
  actionCreator: createCategoryThunk.pending,
  effect: ({ meta }, listenerApi) => {
    const toastId = listenerApi.dispatch(onShowToast('Guardando categoría…', 'loading')).payload.id
    toastMap.set(meta.requestId, toastId)
  },
})

categoryToastMiddleware.startListening({
  actionCreator: createCategoryThunk.fulfilled,
  effect: ({ meta }, listenerApi) => {
    const toastId = toastMap.get(meta.requestId)
    if (toastId) {
      listenerApi.dispatch(
        onUpdateToastStatus({
          id: toastId,
          message: 'Categoría guardada ✔️',
          status: 'success',
        })
      )
      toastMap.delete(meta.requestId)
    }
  },
})

categoryToastMiddleware.startListening({
  actionCreator: createCategoryThunk.rejected,
  effect: ({ meta }, listenerApi) => {
    const toastId = toastMap.get(meta.requestId)
    if (toastId) {
      listenerApi.dispatch(
        onUpdateToastStatus({
          id: toastId,
          message: 'Error al guardar categoría ❌',
          status: 'error',
        })
      )
      toastMap.delete(meta.requestId)
    }
  },
})
