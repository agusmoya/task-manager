import { useState } from 'react'
import { SearchContext } from './searchContext'

interface Props {
  children: React.ReactNode
}

export const SearchProvider = ({ children }: Props) => {
  const [search, updateSearch] = useState('')

  return (
    <SearchContext.Provider
      value={{
        search,
        updateSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
