import { TODO_FILTERS } from "../task-manager/consts/consts";

export interface Category {
  id: string;
  name: string;
}

export interface CountingCategories {
  id: string;
  name: string;
  quantity: number;
}

// export type TaskCompleted = Pick<Task, "completed">;
export const TASK_STATUS = {
  PENDING: "pending",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export interface Task {
  id: string;
  title: string;
  status: (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
  progress: number;
  duration: number;
  category: Category;
  creationDate: Date;
  userId: string;
}

export interface TasksResponse {
  Tasks: Task[];
}

export type TaskId = Pick<Task, "id">;
export type TaskTitle = Pick<Task, "title">;

export type Tasks = Task[];

export interface FetchState {
  data: undefined | null;
  error: ErrorFetch | null;
  isLoading: boolean;
  hasError: boolean;
}

export interface ErrorFetch {
  status: number;
  statusText: string;
}

export interface WeekDay {
  date: string;
  isToday: boolean;
}

export type InputProps = {
  required?: boolean
  id: string
  type: string
  name: string
  labelName: string
  placeholder: string
  value: string
  hint?: string
  error?: string | null
  disabled?: boolean
  fieldValid: boolean
  autoComplete: string
  touchedFields: Record<string, boolean>
  toggleShowInputButton?: boolean | null
  initialStateIcon?: React.ElementType | null
  finalStateIcon?: React.ElementType | null
  onChange: React.ChangeEventHandler<HTMLInputElement>
}