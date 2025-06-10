import { baseApi } from './baseApi'

import { IEvent, IEventCreatePayload, IEventUpdatePayload } from '../types/event'

export const eventsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchEventsByUser: builder.query<IEvent[], void>({
      query: () => '/events/by-user',
      providesTags: result =>
        result
          ? [
              { type: 'Event', id: 'LIST' },
              ...result.map(evt => ({ type: 'Event' as const, id: evt.id })),
            ]
          : [{ type: 'Event', id: 'LIST' }],
    }),
    createEvent: builder.mutation<IEvent, IEventCreatePayload>({
      query: newEvent => ({
        url: '/events',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['Event'],
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
      invalidatesTags: (_r, _e, id) => [{ type: 'Event', id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchEventsByUserQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi
