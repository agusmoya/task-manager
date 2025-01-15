import { useParams } from "react-router-dom";

import { TaskManagerLayout } from "../layout/TaskManagerLayout";
import { DateInfo } from "../components/date-info/DateInfo";
import { DatePills } from "../components/date-pills-list/DatePills";
import { Schedule } from "../components/schedule/Schedule";
import { useCurrentWeek } from "../hooks/useCurrentWeek";

export const DayTaskPage = () => {
  const { id } = useParams<{ id: string }>()
  const { currentWeek, today } = useCurrentWeek();

  return (
    <TaskManagerLayout>
      <DateInfo taskId={id || 'undefined'} today={today} />
      <DatePills weekDays={currentWeek} />
      <Schedule today={today} />
    </TaskManagerLayout>
  );
}


