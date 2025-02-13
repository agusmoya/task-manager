import { Route, Routes } from "react-router-dom";

import { CalendarPage } from "../calendar/pages/CalendarPage.tsx";


export const CalendarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
    </Routes>
  );
}