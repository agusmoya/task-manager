import { Categories } from "../components/categories/Categories.tsx";
import { OngoingTasks } from "../components/ongoing-tasks/OngoingTasks.tsx";
import { Search } from "../components/search/Search.tsx";
import { SearchProvider } from "../context/search/searchProvider.tsx";
import { TaskManagerLayout } from "../layout/TaskManagerLayout.tsx";

import { useTasks } from "../hooks/useTasks.ts";

export function HomePage() {
  const { tasks, loading } = useTasks()
  const relatedCategories = tasks.map((task) => task.category) || []

  return (
    <TaskManagerLayout>
      <SearchProvider>
        <Search />
        {
          loading
            ? <p>Loading...</p>
            :
            <>
              <OngoingTasks tasks={tasks || []} />
              <Categories categories={relatedCategories} />
            </>
        }
      </SearchProvider>
    </TaskManagerLayout>
  )
}
