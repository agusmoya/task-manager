import { useEffect, useState } from 'react'

import { MoonIcon, SunIcon } from '../icons/Icons.tsx'
import { Button } from '../button/Button.tsx'

import './ButtonTheme.css'
import clsx from 'clsx'

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
    setTheme(prev => (prev === lightTheme ? darkTheme : lightTheme))
  }

  return (
    <Button variant="icon" id="button-theme" onClick={toggleTheme} aria-label="Toggle theme">
      <span
        className={clsx('button-theme__icon', {
          'button-theme__icon--light': theme === lightTheme,
          'button-theme__icon--dark': theme === darkTheme,
        })}
      >
        {theme === lightTheme ? <MoonIcon /> : <SunIcon />}
      </span>
    </Button>
  )
}
