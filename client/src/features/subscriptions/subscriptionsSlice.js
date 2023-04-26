import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";
// slice of members and subscriptions
const subscriptionsAdapter = createEntityAdapter(
    {
        selectId: (subscription) => subscription.memberID
    }
)
const membersAdapter = createEntityAdapter(
    {
        selectId: (member) => member._id
    }
)


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubscriptions: builder.query({
            query: () => '/subscriptions',
            transformResponse: responseData => {

                return subscriptionsAdapter.setAll(subscriptionsAdapter.getInitialState(), responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Subscription', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Subscription', id }))
            ]
        }),
        getMembers: builder.query({
            query: () => '/members',
            transformResponse: responseData => {
                return membersAdapter.setAll(membersAdapter.getInitialState(), responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Member', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Member', id }))
            ]
        }),
        getMemberByUserId: builder.query({
            query: id => `/members/user/${id}`,
            transformResponse: responseData => membersAdapter.addOne(membersAdapter.getInitialState(), responseData),
            providesTags: (result, error, arg) => [{ type: 'Member', id: arg }]
        }),
        updateMember: builder.mutation({
            query: initialMember => ({
                url: `/members/${initialMember.id}`,
                method: 'PUT',
                body: initialMember.body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Member', id: arg.id }
            ]
        }),
        addNewSubscription: builder.mutation({
            query: initialSubscriptions => ({
                url: '/subscriptions',
                method: 'POST',
                body: initialSubscriptions.body
            }),
            invalidatesTags: [
                { type: 'Subscription', id: "LIST" }
            ]
        }),
        addNewMember: builder.mutation({
            query: initialMembers => ({
                url: '/members',
                method: 'POST',
                body: initialMembers.body
            }),
            invalidatesTags: [
                { type: 'Member', id: "LIST" }
            ]
        }),

        updateSubscriptions: builder.mutation({
            query: initialSubscriptions => ({
                url: `/subscriptions/${initialSubscriptions.id}`,
                method: 'PUT',
                body: initialSubscriptions.body
            }),
            invalidatesTags: [
                { type: 'Subscription', id: "LIST" }
            ]
        }),
        deleteMembers: builder.mutation({
            query: ({ id }) => ({
                url: `/members/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Members', id: arg.id }
            ]
        })
    })
})

export const {
    useGetSubscriptionsQuery,
    useGetMembersQuery,
    useGetMemberByUserIdQuery,
    useAddNewSubscriptionMutation,
    useAddNewMemberMutation,
    useUpdateSubscriptionsMutation,
    useUpdateMemberMutation,
    useDeleteMembersMutation,
} = extendedApiSlice




