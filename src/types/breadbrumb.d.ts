import { RouteMatch } from 'react-router-dom'

export type BreadcrumbItem = {
  path: string
  label: string
  icon?: React.ReactNode
}

type BreadcrumbNavigation = {
  breadcrumbs: Array<{
    path: string
    label: string
  }>
  navigateTo: (path: string) => void
}

// ✅ Tipo extendido para que TypeScript reconozca crumb
type MatchWithCrumb = RouteMatch & {
  handle?: {
    crumb?: string | ((match: RouteMatch) => string)
  }
}
