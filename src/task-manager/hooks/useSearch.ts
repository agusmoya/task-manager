import { useContext, useRef, useState } from "react"
import { SearchContext } from "../context/search/searchContext"


export function useSearch() {
  const searchContext = useContext(SearchContext)
  if (!searchContext) {
    throw new Error("SearchContext must be used within a SearchProvider")
  }

  const { search, updateSearch } = searchContext
  const [error, setError] = useState<string | null>('')
  const isFirstInput = useRef(true)

  console.log('search: ', isFirstInput);
  // useEffect(() => {
  //   console.log('search: ', search);

  //   if (isFirstInput.current && search.length < 3) {
  //     isFirstInput.current = search === ''
  //     return
  //   }

  //   if (search === '') {
  //     setError('Please, input a value for search')
  //     return
  //   }

  //   if (search.length < 3) {
  //     setError("Search must have at least 3 characters")
  //     return
  //   }

  //   if (search.startsWith(' ')) {
  //     setError("Search should not start with blank spaces")
  //     return
  //   }

  //   setError(null)
  // }, [search])

  return { isFirstInput, search, updateSearch, error, setError }
}