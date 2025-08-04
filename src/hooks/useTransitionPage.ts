import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Related to: transition-page.css
export const useTransitionPage = () => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionPage, setTransitionPage] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize on first render to prevent race conditions
  useEffect(() => {
    if (!isInitialized) {
      setTransitionPage('page page-enter')
      setIsInitialized(true)
    }
  }, [isInitialized])

  useEffect(() => {
    // Only trigger transitions after initialization and on actual route changes
    if (isInitialized && location.pathname !== displayLocation.pathname) {
      setTransitionPage('page page-exit')
    }
  }, [location, displayLocation, isInitialized])

  const handleTransitionEnd = () => {
    if (transitionPage === 'page page-exit') {
      setDisplayLocation(location)
      setTransitionPage('page page-enter')
    }
  }

  return { displayLocation, transitionPage, handleTransitionEnd }
}
