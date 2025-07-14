import { baseApi } from './baseApi'

import { ITaskCreatePayload, ITaskUpdatePayload } from '../types/dtos/task'
import { ITask, TaskId } from '../types/task'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchTasks: builder.query<ITask[], void>({
      query: () => ({ url: '/tasks', method: 'GET' }),
      providesTags: (result = []) => [
        { type: 'Task', id: 'LIST' },
        ...result.map(t => ({ type: 'Task' as const, id: t.id })),
      ],
    }),
    fetchTaskById: builder.query<ITask, TaskId>({
      query: id => `/tasks/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Task', id }],
    }),
    createTask: builder.mutation<ITask, ITaskCreatePayload>({
      query: newTask => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    updateTask: builder.mutation<ITask, ITaskUpdatePayload>({
      query: task => ({
        url: `/tasks/${task.id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: (_result, error, arg) => {
        if (error) return []
        return [
          { type: 'Task', id: 'LIST' },
          { type: 'Task', id: arg.id },
          { type: 'Event', id: 'LIST' },
        ]
      },
    }),
    deleteTask: builder.mutation<{ id: string }, TaskId>({
      query: id => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Task', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchTasksQuery,
  useFetchTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi
