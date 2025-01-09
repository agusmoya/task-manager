export interface Category {
    id: string,
    name: string
}

export interface CountingCategories {
    id: string,
    name: string,
    quantity: number
}

export interface Task {
    id: string,
    title: string,
    completed: boolean,
    progress: number,
    duration: number,
    category: Category;
}

export interface TasksResponse {
    Tasks: Task[];
}

export type TaskId = Pick<Task, 'id'>
export type TaskTitle = Pick<Task, 'title'>
export type TaskCompleted = Pick<Task, 'completed'>

export type Tasks = Task[]

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