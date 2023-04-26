import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useDeleteUserMutation, useGetJsonDataQuery, useGetJsonPremiQuery, useGetUsersQuery } from './usersSlice';
import EditUser from './EditUser';
import { useDeleteMembersMutation, useGetMembersQuery } from '../subscriptions/subscriptionsSlice';
import authService from '../../utils/authService';


const User = ({ id }) => {
    const [permiLoading, setLoading] = useState(false)
    const { permi } = useGetJsonPremiQuery('getJsonPremi', {
        selectFromResult: ({ data }) => ({
            permi: data?.entities[id]
        }),
    })
    useEffect(() => {
        if (!permi && permiLoading) {
            window.location.reload()
            setTimeout(() => {
                setLoading(true)
            }, 1500);
        }
    }, [])

    const { user } = useGetUsersQuery('getUsers', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })
    const { userJsonData } = useGetJsonDataQuery('getJsonPremi', {
        selectFromResult: ({ data }) => ({
            userJsonData: data?.entities[id]
        }),
    })
    const { member } = useGetMembersQuery('getMembers', {
        selectFromResult: ({ data }) => ({
            member: data?.entities[user.memberID]
        }),
    })

    const [deleteUser] = useDeleteUserMutation('deleteUser')
    const [deleteMember] = useDeleteMembersMutation('deleteMembers')
    const [editUser, setEditUser] = useState(false)
    const delUser = async (id) => {
        await deleteMember({ id: member._id })
        await deleteUser({ id: id })
        window.location.reload()
    }
    const edit = () => {
        setEditUser(!editUser)
    }
    return (
        <Card sx={{
            my: 1,
            mx: 1
        }}>
            <CardContent>
                {member ? <>
                    <Typography variant='h6' > {member?.firstName} {member?.lastName}</Typography >
                    <Typography > Username: {user?.username}</Typography >
                    <Typography > Email: {member?.email}</Typography >
                    <Typography > City: {member?.city}</Typography >
                </> : <>
                    <Typography variant='h6'>{user?.username === 'admin' ? 'Admin' : 'undefine full name'}</Typography>
                    <Typography > Username: {user?.username}</Typography >
                </>
                }
                <Typography > Session Time Out: {userJsonData?.SessionTimeOut} minutes</Typography >
                <Typography > Created Date: {userJsonData?.CreatedDate}</Typography >
                <Typography paragraph={true}> Permissions: {permi?.userPremiss.join(", ")}</Typography >
            </CardContent>
            <CardActions>
                <Button size="small" onClick={edit}>Edit</Button>
                <Button size="small" onClick={() => delUser(user._id)}>Delete</Button>
                <EditUser edit={edit} editUser={editUser} user={user} member={member} userJsonData={userJsonData} />
            </CardActions>
        </Card>
    )
}

export default User
