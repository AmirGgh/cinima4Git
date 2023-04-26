import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import authService from '../../utils/authService'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000', prepareHeaders: (headers, { getState }) => {
            const token = authService.getToken();
            if (token) {
                headers.set('x-access-token', token);
            }
            return headers;
        },
    }),
    tagTypes: ['Movie', 'User', 'Subscription', 'Member', 'Permission', 'JsonUser', 'NewUsers'],
    endpoints: builder => ({})
}) 