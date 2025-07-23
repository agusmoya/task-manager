import { Link } from 'react-router-dom'

import { SeparatorIcon } from '../icons/Icons'

import { useNavigation } from '../../hooks/useNavigation'

import './Breadcrumb.css'

export const Breadcrumb = () => {
  const { breadcrumbs } = useNavigation()
  const lastCrumbIndex = breadcrumbs?.length - 1

  return (
    <>
      {breadcrumbs.length > 0 && (
        <nav aria-label="breadcrumb" className="breadcrumb container">
          <ol className="breadcrumb__list">
            {breadcrumbs.map((item, index) => (
              <li key={item.path} className="breadcrumb__item">
                {index < lastCrumbIndex ? (
                  <Link
                    to={item.path}
                    className="breadcrumb__link"
                    aria-current={index === lastCrumbIndex ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="breadcrumb__current">{item.label}</span>
                )}
                {index < lastCrumbIndex && (
                  <span className="breadcrumb__separator">
                    <SeparatorIcon className="breadcrumb__separator-icon" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  )
}
