import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppRouter } from './router/AppRouter'
import { NavigationProvider } from './context/navigation/navigationProvider'

import { store } from './store/store'
import { ToastContainer } from './components/toast/Toast'

const v7DocDisabledWarnings = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
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
