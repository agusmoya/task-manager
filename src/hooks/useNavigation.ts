import { useContext, useEffect } from "react"
import { useLocation, matchPath, useNavigate } from "react-router-dom"

// import { type BreadcrumbNavigation, type MatchWithCrumb } from "../types/breadbrumb.d"
import { type BreadcrumbNavigation } from "../types/breadbrumb.d"

import { NavigationContext } from "../context/navigation/navigationContext.ts"
import { breadcrumbMap } from "../helpers/getBreadcrumbsLabels.ts"


export function useNavigation(): BreadcrumbNavigation {

  const navigationContext = useContext(NavigationContext)
  if (!navigationContext) {
    throw new Error("NavigationContext must be used within a NavigationProvider")
  }

  const location = useLocation()
  const navigate = useNavigate()

  const { breadcrumbs, setBreadcrumbs } = navigationContext

  const getCrumbLabel = () => {
    const entries = Object.entries(breadcrumbMap)

    for (const [routePath, crumb] of entries) {
      const match = matchPath(routePath, location.pathname)
      if (match) {
        if (typeof crumb === 'function') {
          return crumb(match.params as Record<string, string>)
        }
        return crumb
      }
    }
    return ''
    //? const matches = useMatches() with -> createBrowserRouter() 
    // const currentMatch = matches[matches.length - 1] as MatchWithCrumb | undefined
    // const currentMatch = [...matches]
    //   .reverse()
    //   .find((match: MatchWithCrumb) => typeof match.handle?.crumb !== 'undefined') as MatchWithCrumb | undefined
    // if (!currentMatch || !currentMatch.handle) return ''
    // const { crumb } = currentMatch.handle
    // return typeof crumb === 'function'
    //   ? crumb(currentMatch)
    //   : crumb || ''
  }

  const handleNavigation = () => {
    const newPath = location.pathname
    setBreadcrumbs(prev => {
      // Si ya es el último breadcrumb, no hacemos nada
      if (prev.length > 0 && prev[prev.length - 1].path === newPath) {
        return prev
      }

      // Si existe antes en la lista, recortamos hasta ahí y lo volvemos a agregar
      const existingIndex = prev.findIndex(item => item.path === newPath)
      const newLabel = getCrumbLabel()
      if (existingIndex >= 0) {
        return [...prev.slice(0, existingIndex), { path: newPath, label: newLabel }]
      }

      // Si vamos a Home, reseteamos el breadcrumb
      if (newLabel === 'Home') return [{ path: newPath, label: newLabel }]

      // Si no existe, lo agregamos al final
      return [...prev, { path: newPath, label: newLabel }]
    })
  }

  const saveBreadcrumbLocalStorage = () => {
    localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs))
  }

  // Efecto para sincronizar con la ubicación actual
  useEffect(() => {
    handleNavigation()
    saveBreadcrumbLocalStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // Función para navegar programáticamente
  const navigateTo = (path: string) => {
    navigate(path)
  }

  return { breadcrumbs, navigateTo }
}
