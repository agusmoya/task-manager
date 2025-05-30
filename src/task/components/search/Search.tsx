import { Button } from '../../../components/button/button'
import { ControlIcon, SearchIcon } from '../../../components/icons/Icons'

import { useSearch } from '../../hooks/useSearch'

import './Search.css'

export const Search: React.FC = () => {
  const { search, updateSearch } = useSearch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }

  const startWithBlanks = (text: string): boolean => text.startsWith(' ')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    if (startWithBlanks(newQuery)) return
    updateSearch(newQuery)
  }

  return (
    <section className="search section">
      <div className="search__container container">
        <form className="search__form" onSubmit={handleSubmit}>
          <SearchIcon className="search__icon-search" />
          <input
            type="search"
            autoComplete="off"
            className="search__input"
            name="query"
            value={search}
            onChange={handleChange}
            placeholder="Search categories or tasks..."
          />
        </form>
        <Button type="submit" className="btn btn--filled search__button-settings">
          <ControlIcon className="search__icon-settings" />
        </Button>
      </div>
    </section>
  )
}
