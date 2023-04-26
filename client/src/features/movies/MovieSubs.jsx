import { Chip } from '@mui/material'
import React from 'react'
import { useGetMembersQuery } from '../subscriptions/subscriptionsSlice'

export default function MovieSubs({ id, date }) {
    const { member } = useGetMembersQuery('getMembers', {
        selectFromResult: ({ data }) => ({
            member: data?.entities[id]
        }),
    })
    let label = `${member?.firstName} ${member?.lastName} - ${date}`
    return (
        <>
            {member?.firstName && <Chip key={member?.firstName} label={label} variant="outlined" />}
        </>
    )
}
