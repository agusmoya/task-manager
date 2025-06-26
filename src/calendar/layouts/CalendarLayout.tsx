import { Navigate, Route, Routes } from 'react-router-dom'

import { CalendarPage } from '../../router/lazy-pages'

import './CalendarLayout.css'

export const CalendarLayout = () => {
  return (
    <div className="calendar-layout">
      <Routes>
        <Route index element={<CalendarPage />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </div>
  )
}
