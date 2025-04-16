import { Dispatch, createContext, SetStateAction } from 'react';

import { type BreadcrumbItem } from '../../types/breadbrumb.d';

type NavigationContextType = {
  breadcrumbs: BreadcrumbItem[]
  setBreadcrumbs: Dispatch<SetStateAction<BreadcrumbItem[]>>
}

export const NavigationContext = createContext<NavigationContextType>({
  breadcrumbs: [],
  setBreadcrumbs: () => { },
})
