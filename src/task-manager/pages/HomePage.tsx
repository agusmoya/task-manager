import { Categories } from "../components/categories/Categories.tsx"
import { EventsByTask } from '../components/events-by-task/EventsByTask.tsx'
import { OngoingTasks } from "../components/ongoing-tasks/OngoingTasks.tsx"
import { Search } from "../components/search/Search.tsx"
import { SearchProvider } from "../../context/search/searchProvider.tsx"

import { useTasks } from "../hooks/useTasks.ts"

function HomePage() {
  const { tasks } = useTasks()
  const relatedCategories = tasks.map((task) => task.category) || []

  return (
    <SearchProvider>
      <Search />
      <EventsByTask />
      <OngoingTasks tasks={tasks || []} />
      <Categories categories={relatedCategories} />
    </SearchProvider>
  )
}

export default HomePage
