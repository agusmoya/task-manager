import { useState } from "react"

import { type BreadcrumbItem } from "../../types/breadbrumb.d"

import { NavigationContext } from "./navigationContext.ts"

type Props = {
  children: React.ReactNode
}

export const NavigationProvider = ({ children }: Props) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([])

  return (
    <NavigationContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
