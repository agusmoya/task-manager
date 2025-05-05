import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import { AppRouter } from "./router/AppRouter.tsx"
import { NavigationProvider } from './context/navigation/navigationProvider.tsx'

import { store } from "./store/store.ts"
import { ToastContainer } from "./components/toast/Toast.tsx"


const v7DocDisabledWarnings = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
}

function TodoApp() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <NavigationProvider>
        <BrowserRouter future={v7DocDisabledWarnings}>
          <AppRouter />
        </BrowserRouter>
      </NavigationProvider>
    </Provider>
  )
}

export default TodoApp
