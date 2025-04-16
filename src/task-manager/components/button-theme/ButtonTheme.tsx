import { useEffect, useState } from "react"

import { MoonIcon, SunIcon } from "../../../components/icons/Icons.tsx"

import "./ButtonTheme.css"

export const ButtonTheme = () => {
  const lightTheme = "light"
  const darkTheme = "dark"

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("selected-theme") || lightTheme
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme)
    localStorage.setItem("selected-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    )
  }

  return (
    <button
      className="btn btn--icon button-theme"
      id="theme-button"
      onClick={toggleTheme}
    >
      <span className="btn__state-layer"></span>
      <span className={
        `btn__content button-theme__icon
       ${theme === lightTheme ? "light" : "dark"}`
      }>
        {theme === lightTheme ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  )
}
