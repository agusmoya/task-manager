import { useLocation } from "react-router-dom"

import { useEffect, useState } from "react"

export const useTransitionPage = () => {
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

  return { displayLocation, transitionPage, handleTransitionEnd }
}