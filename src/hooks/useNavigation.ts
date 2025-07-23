import { useContext, useEffect } from 'react'
import { useLocation, matchPath } from 'react-router-dom'

import { BreadcrumbNavigation } from '../types/breadbrumb.d'

import { NavigationContext } from '../context/navigation/navigationContext'
import { breadcrumbMap } from '../helpers/getBreadcrumbLabels'

export function useNavigation(): BreadcrumbNavigation {
  const navigationContext = useContext(NavigationContext)
  if (!navigationContext) {
    throw new Error('NavigationContext must be used within a NavigationProvider')
  }

  const location = useLocation()
  const { breadcrumbs, setBreadcrumbs } = navigationContext

  useEffect(() => {
    const newPath = location.pathname

    // We calculate the label for the current route
    let newLabel = ''
    for (const [routePath, crumb] of Object.entries(breadcrumbMap)) {
      const match = matchPath(routePath, newPath)
      if (match) {
        newLabel =
          typeof crumb === 'function' ? crumb(match.params as Record<string, string>) : crumb
        break
      }
    }

    setBreadcrumbs(prev => {
      // If it's already the last breadcrumb, we don't do anything.
      if (prev.length > 0 && prev[prev.length - 1].path === newPath) {
        return prev
      }

      // If it exists earlier in the list, we replace it to avoid repetition
      const existingIndex = prev.findIndex(item => item.path === newPath)

      if (existingIndex >= 0) {
        return [...prev.slice(0, existingIndex), { path: newPath, label: newLabel }]
      }

      // If we're going to Home, we reset the breadcrumb
      if (newLabel === 'Home') return [{ path: newPath, label: newLabel }]

      // If it doesn't exist, we add it to the end
      return [...prev, { path: newPath, label: newLabel }]
    })
  }, [location.pathname, setBreadcrumbs])

  return { breadcrumbs }
}
