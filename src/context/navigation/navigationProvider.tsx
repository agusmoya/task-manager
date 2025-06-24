import { useState } from 'react'

import { BreadcrumbItem } from '../../types/breadbrumb.d'

import { NavigationContext } from './navigationContext'

interface Props {
  children: React.ReactNode
}

export const NavigationProvider = ({ children }: Props) => {
  const breadcrumbsInitialState = JSON.parse(localStorage.getItem('breadcrumbs') || '[]')
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>(breadcrumbsInitialState)

  return (
    <NavigationContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
