import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "../icons/Icons";

import "./ButtonTheme.css";

export const ButtonTheme = () => {
  const lightTheme = "light";
  const darkTheme = "dark";

  // Estado inicial del tema
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("selected-theme") || lightTheme;
  });

  // Efecto para aplicar el tema guardado
  useEffect(() => {
    // Cambiar el atributo data-theme en el body
    document.body.setAttribute("data-theme", theme);

    // Guardar el tema actual en localStorage
    localStorage.setItem("selected-theme", theme);
  }, [theme]);

  // Alternar tema
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <button
      className="button-theme"
      id="theme-button"
      onClick={toggleTheme}
    >
      {theme === lightTheme ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
