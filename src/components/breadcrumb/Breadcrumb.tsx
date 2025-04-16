import { Link } from "react-router-dom"

import { SeparatorIcon } from "../icons/Icons.tsx"

import { useNavigation } from "../../hooks/useNavigation.ts"

import './Breadcrumb.css'


export const Breadcrumb = () => {
  const { breadcrumbs, navigateTo } = useNavigation()
  const lastCrumbIndex = breadcrumbs?.length - 1

  const handleClick = (path: string) => {
    navigateTo(path)
  }

  return (
    <>
      {
        (breadcrumbs.length > 0)
        &&
        <nav aria-label="breadcrumb" className="breadcrumb container">
          <ol className="breadcrumb__list">
            {
              breadcrumbs.map((item, index) => (
                <li key={index} className="breadcrumb__item">
                  {
                    (index < lastCrumbIndex)
                      ?
                      <Link
                        to={item.path}
                        className="breadcrumb__link"
                        aria-current={index === lastCrumbIndex ? "page" : undefined}
                        onClick={() => handleClick(item.path)}
                      >
                        {item.label}
                      </Link>
                      :
                      <span className="breadcrumb__current">{item.label}</span>
                  }
                  {
                    (index < lastCrumbIndex)
                    && (
                      <span className="breadcrumb__separator">
                        <SeparatorIcon className="breadcrumb__separator-icon" />
                      </span>
                    )
                  }
                </li>
              ))
            }
          </ol>
        </nav>
      }
    </>
  )
}
