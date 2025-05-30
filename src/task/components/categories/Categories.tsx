// import { Link } from "react-router-dom"

// import { PlusIcon } from "../../../components/icons/Icons.tsx"
import { useEffect } from 'react'

import { ScrollableContainer } from '../scrollable-container/ScrollableContainer'

import { type ICountingCategories } from '../../../types/category.d'

import { useSearch } from '../../hooks/useSearch'
import { useCategoryActions } from '../../../store/hooks/useCategoryActions'

import './Categories.css'

export function Categories() {
  const { search } = useSearch()
  const { categories, refetch } = useCategoryActions()

  useEffect(() => {
    refetch()
  }, [refetch])

  const organizedCategories: { [key: string]: ICountingCategories } = {}

  categories?.map(cat => {
    const { name } = cat
    if (!organizedCategories[name]) {
      organizedCategories[name] = {
        ...cat,
        quantity: 1,
      }
    } else {
      organizedCategories[name].quantity++
    }
  })

  const filteredCategories = Object.values(organizedCategories).filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  const areCategoriesPresent = filteredCategories.length

  return (
    <section className="categories section" id="categories">
      <div className="categories__container container">
        <header className="categories__header">
          <div className="categories__header-content">
            <h2 className="categories__title">Categories</h2>
            {/* <Link to='new-category' className="btn btn--outlined categories__card-new-button">
              <span className="btn__state-layer"></span>
              <span className="btn__content">
                <PlusIcon />
              </span>
            </Link> */}
          </div>
          <a>See all</a>
        </header>
        <ScrollableContainer
          itemClass="categories__item"
          className={['categories__list', !areCategoriesPresent && 'categories__list--no-result']
            .filter(Boolean)
            .join(' ')}
        >
          {/* <li
            key="newCategory"
            className="categories__item categories__item--new-category"
          >
            <h3>New Category</h3>
            <div className="categories__card">
              <Link to='new-category' className="btn btn--outlined categories__card-new-button">
                <span className="btn__state-layer"></span>
                <span className="btn__content">
                  <PlusIcon />
                </span>
              </Link>
            </div>
          </li> */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map(({ id, name, quantity }) => (
              <li className="categories__item" key={id}>
                <div className="categories__card">
                  <h3 className="section__subtitle">{name}</h3>
                  <small>{quantity} task(s)</small>
                </div>
              </li>
            ))
          ) : (
            <span>No categories found...</span>
          )}
        </ScrollableContainer>
      </div>
    </section>
  )
}
