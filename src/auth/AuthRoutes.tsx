import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { LoginPage, RegisterPage } from "./pages";


export const AuthRoutes = () => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionPage, setTransitionPage] = useState("page page-enter")

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionPage("page page-exit")
    }
  }, [location, displayLocation])

  const handleTransitionEnd = () => {
    if (transitionPage === "page page-exit") {
      setDisplayLocation(location)
      setTransitionPage("page page-enter")
    }
  }

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