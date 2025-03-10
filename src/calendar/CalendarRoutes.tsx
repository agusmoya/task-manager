import { Route, Routes } from "react-router-dom";

import { CalendarPage } from "./pages/calendar-page/CalendarPage.tsx";


export const CalendarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
    </Routes>
  );
}