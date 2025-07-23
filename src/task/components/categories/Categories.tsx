import clsx from 'clsx'

import { ScrollableContainer } from '../../../components/scrollable-container/ScrollableContainer'

import { useSearch } from '../../hooks/useSearch'
import { useCategoryActions } from '../../../store/hooks/useCategoryActions'
import { useTaskActions } from '../../../store/hooks/useTaskActions'

import './Categories.css'

export function Categories() {
  const { search } = useSearch()
  const { categories } = useCategoryActions()
  const { tasks } = useTaskActions()

  const categoryCountMap = new Map<string, number>()
  tasks.forEach(t => {
    const catName = t.category.name
    categoryCountMap.set(catName, (categoryCountMap.get(catName) || 0) + 1)
  })

  const filteredCategories = Object.values(categories).filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  const areCategoriesPresent = filteredCategories.length > 0

  return (
    <section className="categories section container">
      <header className="categories__header">
        <h2 className="categories__title">Categories</h2>
        <a className="categories__see-all">See all</a>
      </header>
      <ScrollableContainer
        itemClass="category-item"
        className={clsx('categories__list', !areCategoriesPresent && 'categories__list--no-result')}
      >
        {areCategoriesPresent ? (
          filteredCategories.map(({ id, name }) => {
            const quantity = categoryCountMap.get(name) || 0
            const quantityFormatted = `In ${quantity} ${quantity === 1 ? 'task' : 'tasks'}`

            return (
              <li className="category-item" key={id}>
                <header className="category-item__header">
                  <h3 className="category-item__title">{name}</h3>
                  <p className="category-item__subtitle">{quantityFormatted}</p>
                </header>
              </li>
            )
          })
        ) : (
          <span>No categories found...</span>
        )}
      </ScrollableContainer>
    </section>
  )
}
