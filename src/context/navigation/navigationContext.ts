import { Dispatch, createContext, SetStateAction } from 'react'

import { BreadcrumbItem } from '../../types/breadbrumb'

type NavigationContextType = {
  breadcrumbs: BreadcrumbItem[]
  setBreadcrumbs: Dispatch<SetStateAction<BreadcrumbItem[]>>
}

export const NavigationContext = createContext<NavigationContextType>({
  breadcrumbs: [],
  setBreadcrumbs: () => {},
})
