import { Route, Routes } from "react-router-dom";

import { CustomCalendarPage } from "./pages/custom-calendar-page/CustomCalendarPage.tsx";


export const CustomCalendarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomCalendarPage />} />
    </Routes>
  );
}