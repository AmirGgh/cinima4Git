import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import Loading from '../../components/Loading';
import GenericForm from '../../utils/genericForm';
import { styleModal } from '../../utils/theme';
import User from './User'
import { useAddUserMutation, useGetUsersQuery, useUpdatePassUserMutation } from './usersSlice'
import { useAddNewMemberMutation } from '../subscriptions/subscriptionsSlice';
import authService from '../../utils/authService';

const UsersList = () => {
    const [addUser, setAddUser] = useState(false)
    const [addMember, setAddMember] = useState(false)
    const [accept, setAccept] = useState(false)
    const [userID, setUerID] = useState()
    const [userEnter, setUserEnter] = useState()
    const openAddUser = () => {
        setAddUser(!addUser)
    }
    const openAddMember = () => {
        setAddMember(!addMember)
    }
    const fieldsMem = [
        { label: 'first name', name: 'firstName', type: 'text' },
        { label: 'last Name', name: 'lastName', type: 'text' },
        { label: 'email', name: 'email', type: 'text' },
        { label: 'city', name: 'city', type: 'text' },
    ]
    const fields = [
        { label: 'username', name: 'username', type: 'text' },
        { label: 'Session time out in minutes', name: 'SessionTimeOut', type: 'number' },
    ]
    const user = { username: '', SessionTimeOut: '' }
    const {
        data: users,
        isLoading,
        isSuccess,
    } = useGetUsersQuery('getUsers')
    const [addNewUSER] = useAddUserMutation('addUser')
    const [addNewMember] = useAddNewMemberMutation('addNewMember')
    const [updatePassUser] = useUpdatePassUserMutation('updatePassUser')

    const addNewMEMBER = async (data) => {
        if (data.firstName && data.lastName && data.email && data.city && userID) {
            setAccept(!accept)
            let newMember = { "email": data.email, "city": data.city, "firstName": data.firstName, "lastName": data.lastName, "idUser": userID }
            const memberD = await addNewMember({ body: newMember })
        } else {
            alert('please fill out all fields ')
        }
    }
    const addNewUser = async (data) => {
        if (data.username && data.premissions && data.SessionTimeOut) {
            openAddMember()
            let newuser = {
                "username": data.username, "password": '---',
                "permissions": { "userPremiss": data.premissions },
                "user": { "username": data.username, "SessionTimeOut": data.SessionTimeOut }
            }
            const userD = await addNewUSER({ body: newuser })
            setUserEnter(data.username)
            setUerID(userD.data)
        } else {
            alert('please fill out username, sessions and permissions ')
        }
    }
    const acceptUpt = async () => {
        try {
            const response = await fetch(`http://localhost:8000/members/user/${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authService.getToken()
                }
            });
            const responseData = await response.json();
            await updatePassUser({ id: userID, body: { memberID: responseData._id } }).unwrap()
        } catch (err) {
            console.error(err);
        }
        window.location.reload()
        setAccept(!accept)
    }
    let content;
    if (isLoading) {
        content = <Loading />
    } else if (isSuccess) {
        content = users.ids.map(id => <User key={id} id={id} />)
    }
    return (
        <Box>
            <Button sx={{ margin: '1rem' }} variant='contained' onClick={openAddUser}>Add New User</Button>
            <Modal open={addUser} onClose={openAddUser}>
                <Box sx={styleModal} >
                    <Typography variant="h5" component="h2" gutterBottom>
                        Add New User
                    </Typography>
                    <br />
                    <GenericForm typeForm={"Add"} fields={fields} user={user} cancel={openAddUser} ditails={user} onSubmit={addNewUser} />
                </Box>
            </Modal>
            <Modal open={addMember} onClose={openAddMember}>
                <Box sx={styleModal} >
                    <Typography variant="h5" component="h2" gutterBottom>
                        Add New Member
                    </Typography>
                    <br />
                    <GenericForm typeForm={"Add"} fields={fieldsMem} cancel={openAddMember} ditails={user} onSubmit={addNewMEMBER} />
                </Box>
            </Modal>
            <Modal open={accept} onClose={setAccept}>
                <Box sx={styleModal} >
                    <Typography variant="h5" component="h2" gutterBottom>
                        New User Created
                    </Typography>
                    <Typography component="h2" gutterBottom>
                        The new user can now enter with the username: "{userEnter}",<br /> The password user put in login screan will save in first login.
                    </Typography>
                    <br />
                    <Button onClick={acceptUpt}>OK</Button>
                </Box>
            </Modal>
            <Grid container display="flex" spacing={2}  >
                {content}
            </Grid>
        </Box>
    )
}

export default UsersList