import { Categories } from '../components/categories/Categories'
import { EventsByUser } from '../components/events-by-user/EventsByUser'
import { OngoingTasks } from '../components/ongoing-tasks/OngoingTasks'
import { Search } from '../components/search/Search'
import { SearchProvider } from '../../context/search/searchProvider'

function HomePage() {
  return (
    <SearchProvider>
      <Search />
      <OngoingTasks />
      <EventsByUser />
      <Categories />
    </SearchProvider>
  )
}

export default HomePage
