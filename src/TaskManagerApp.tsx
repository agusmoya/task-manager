import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"

const v7DocDisabledWarnings = { v7_startTransition: true, v7_relativeSplatPath: true }

function TaskManagerApp() {
  return (
    <BrowserRouter future={v7DocDisabledWarnings}>
      <AppRouter />
    </BrowserRouter>
  )
}

export default TaskManagerApp
