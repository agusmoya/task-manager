import { Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/Login/LoginPage.tsx";
import { RegisterPage } from "./pages/Register/RegisterPage.tsx";

import { useTransitionPage } from "../hooks/useTransitionPage";


export const AuthRoutes = () => {

  const { displayLocation, transitionPage, handleTransitionEnd } = useTransitionPage()

  return (
    <Routes location={displayLocation}>
      <Route
        path="login"
        element={<LoginPage transitionClass={transitionPage} handleTransition={handleTransitionEnd} />}
      />
      <Route
        path="register"
        element={<RegisterPage transitionClass={transitionPage} handleTransition={handleTransitionEnd} />}
      />
    </Routes>
  );
}