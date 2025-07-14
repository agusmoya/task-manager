import { baseApi } from './baseApi'

import { IEvent } from '../types/event'
import { IEventCreatePayload, IEventStatusPayload, IEventUpdatePayload } from '../types/dtos/event'

export const eventsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchEventsByUser: builder.query<IEvent[], void>({
      query: () => '/events/by-user',
      providesTags: (result = []) => [
        { type: 'Event', id: 'LIST' },
        ...result.map(evt => ({ type: 'Event' as const, id: evt.id })),
      ],
    }),
    createEvent: builder.mutation<IEvent, IEventCreatePayload>({
      query: newEvent => ({
        url: '/events',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['Event'],
    }),
    updateEventStatus: builder.mutation<IEvent, IEventStatusPayload>({
      query: ({ id, status }) => ({
        url: `/events/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: result =>
        result
          ? [
              { type: 'Event', id: 'LIST' },
              { type: 'Event', id: result.id },
              { type: 'Task', id: result.taskId! },
              { type: 'Task', id: 'LIST' },
            ]
          : [],
    }),
    updateEvent: builder.mutation<IEvent, IEventUpdatePayload>({
      query: event => ({
        url: `/events/${event.id}`,
        method: 'PUT',
        body: event,
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Event', id: 'LIST' },
        { type: 'Event', id: arg.id },
      ],
    }),
    deleteEvent: builder.mutation<{ id: string }, string>({
      query: id => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [
        { type: 'Event', id: 'LIST' },
        { type: 'Task', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchEventsByUserQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useUpdateEventStatusMutation,
  useDeleteEventMutation,
} = eventsApi
