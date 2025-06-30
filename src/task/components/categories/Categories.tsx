import clsx from 'clsx'

import { ScrollableContainer } from '../../../components/scrollable-container/ScrollableContainer'

import { useSearch } from '../../hooks/useSearch'
import { useCategoryActions } from '../../../store/hooks/useCategoryActions'

import './Categories.css'
import { useTaskActions } from '../../../store/hooks/useTaskActions'

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
    <section className="categories section" id="categories">
      <div className="categories__container container">
        <header className="categories__header">
          <div className="categories__header-content">
            <h2 className="categories__title">Categories</h2>
          </div>
          <a>See all</a>
        </header>
        <ScrollableContainer
          itemClass="categories__item"
          className={clsx(
            'categories__list',
            !areCategoriesPresent && 'categories__list--no-result'
          )}
        >
          {areCategoriesPresent ? (
            filteredCategories.map(({ id, name }) => {
              const quantity = categoryCountMap.get(name) || 0
              return (
                <li className="categories__item" key={id}>
                  <div className="categories__card">
                    <h3 className="section__subtitle">{name}</h3>
                    <small>
                      In {quantity} {quantity === 1 ? 'task' : 'tasks'}
                    </small>
                  </div>
                </li>
              )
            })
          ) : (
            <span>No categories found...</span>
          )}
        </ScrollableContainer>
      </div>
    </section>
  )
}
