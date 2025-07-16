import { Route, Routes } from 'react-router-dom'

import { CalendarPage } from '../../router/lazy-pages'

export const CalendarLayout = () => {
  return (
    <div className="calendar-layout">
      <Routes>
        <Route index element={<CalendarPage />} />
      </Routes>
    </div>
  )
}
