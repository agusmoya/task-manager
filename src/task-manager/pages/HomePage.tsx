import { Categories } from "../components/categories/Categories";
import { OngoingTasks } from "../components/ongoing-tasks/OngoingTasks";
import { Search } from "../components/search/Search";
import { SearchProvider } from "../context/search/searchProvider";

import { useTasks } from "../hooks/useTasks";

import { TaskManagerLayout } from "../layout/TaskManagerLayout";

export function HomePage() {
  const { tasks, loading } = useTasks();

  const relatedCategories = tasks?.map((task) => task.category) || [];

  return (
    <TaskManagerLayout>
      <SearchProvider>
        <Search />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <OngoingTasks tasks={tasks || []} />
            <Categories categories={relatedCategories} />
          </>
        )}
      </SearchProvider>
    </TaskManagerLayout>
  );
}
