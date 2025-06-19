import { useEffect, useState } from 'react'

import { MoonIcon, SunIcon } from '../icons/Icons.tsx'
import { Button } from '../button/Button.tsx'

import './ButtonTheme.css'

export const ButtonTheme = () => {
  const lightTheme = 'light'
  const darkTheme = 'dark'

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('selected-theme') || lightTheme
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('selected-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme))
  }

  return (
    <Button id="theme-button" className="btn btn--icon button-theme" onClick={toggleTheme}>
      <span
        className={`btn__content button-theme__icon
        ${theme === lightTheme ? 'light' : 'dark'}`}
      >
        {theme === lightTheme ? <MoonIcon /> : <SunIcon />}
      </span>
    </Button>
  )
}
