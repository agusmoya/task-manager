import { createContext, Dispatch, SetStateAction } from "react";

type SearchContextType = {
  search: string;
  updateSearch: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType>({
  search: '',
  updateSearch: () => { },
})
