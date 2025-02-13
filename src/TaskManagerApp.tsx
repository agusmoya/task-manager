import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux";

import { store } from "./store/store.ts";

import { AppRouter } from "./router"

const v7DocDisabledWarnings = { v7_startTransition: true, v7_relativeSplatPath: true }

function TaskManagerApp() {
  return (
    <Provider store={store}>
      <BrowserRouter future={v7DocDisabledWarnings}>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default TaskManagerApp
