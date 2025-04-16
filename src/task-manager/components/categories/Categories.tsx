import { Link } from "react-router-dom"

import { PlusIcon } from "../../../components/icons/Icons.tsx"
import { ScrollableContainer } from "../scrollable-container/ScrollableContainer.tsx"

import { type Category, type CountingCategories } from "../../../types/category.d"

import { useSearch } from "../../hooks/useSearch.ts"


import "./Categories.css"

interface Props {
  categories: Category[];
}

export function Categories({ categories = [] }: Props) {
  const { search } = useSearch()

  const organizedCategories: { [key: string]: CountingCategories } = {}

  categories.forEach((cat) => {
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

  const filteredCategories = Object.values(organizedCategories).filter(
    ({ name }) => name.toLowerCase().includes(search.toLowerCase())
  )

  const areCategoriesPresent = filteredCategories.length

  return (
    <section className="categories section" id="categories">
      <div className="categories__container container">
        <header className="categories__header">
          <h2 className="section__title">Categories</h2>
          <a>See all</a>
        </header>
        <ScrollableContainer
          itemClass="category__item"
          className={[
            'categories__list',
            !areCategoriesPresent && 'categories__list--no-result'
          ].filter(Boolean).join(' ')}
        >
          <li
            key="newCategory"
            className="category__item category__item--new-category"
          >
            <h3>New Category</h3>
            <section className="category__card">
              <Link to='/new-category'>
                <PlusIcon className="category__card-new-icon" />
              </Link>
            </section>
          </li>
          {
            (filteredCategories.length > 0)
              ? filteredCategories.map(
                ({ id, name, quantity }) => (
                  <li className="category__item" key={id}>
                    <section className="category__card">
                      <h3 className="section__subtitle">{name}</h3>
                      <small>{quantity} task(s)</small>
                    </section>
                  </li>
                ))
              : <span>No categories found...</span>
          }

        </ScrollableContainer>
      </div>
    </section>
  )
}
