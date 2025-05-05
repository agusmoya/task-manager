import { Categories } from "../components/categories/Categories.tsx"
import { EventsByUser } from '../components/events-by-user/EventsByUser.tsx'
import { OngoingTasks } from "../components/ongoing-tasks/OngoingTasks.tsx"
import { Search } from "../components/search/Search.tsx"
import { SearchProvider } from "../../context/search/searchProvider.tsx"


function HomePage() {
  return (
    <SearchProvider>
      <Search />
      <EventsByUser />
      <OngoingTasks />
      <Categories />
    </SearchProvider>
  )
}

export default HomePage
