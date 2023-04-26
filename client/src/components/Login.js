import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useNavigate } from 'react-router-dom';
import authService from '../utils/authService'
import GenericForm from '../utils/genericForm';
import { styleModal } from '../utils/theme'
import { Button } from '@mui/material';
import CreateAccount from './CreateAccount';
import { useContext } from 'react';
import { AppContext } from '../App';

const Login = () => {
    const { setCurrPermissions } = useContext(AppContext)
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState(false)
    const [wrong, setWrong] = useState(false)
    const fields = [
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Password', name: 'password', type: 'password' }]

    const creatUser = () => {
        setNewUser(!newUser)
    }
    const somethingWrong = () => {
        setWrong(!wrong)
    }

    const handleSubmit = async ({ username, password }) => {
        authService.login(username, password)
            .then(res => {
                if (res.status == 200) {
                    authService.saveToken(res.data.token)
                    authService.saveRole(res.data.role)
                    authService.saveId(res.data.id)
                    authService.setPermissions(res.data.id).then((res) => setCurrPermissions(res))
                    navigate('/movies')
                }
            }).catch(err => somethingWrong())
    };

    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal} >
                    {!newUser ?
                        <>
                            <Typography variant="h6" component="h2"> Welcome! </Typography>
                            {wrong && <Typography variant="h8" component="h5" sx={{ color: 'red' }}> wrong password or username</Typography>}
                            <GenericForm typeForm={"login"} fields={fields} onSubmit={handleSubmit} ditails={''} />
                        </> : <>

                            <CreateAccount cancel={creatUser} />
                        </>
                    }
                    <br></br>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                        <Button sx={{ margin: 'auto' }} variant="contained" onClick={creatUser}> New Account</Button>
                    </Box>
                    <br />
                    Admin:
                    <br />
                    username: admin, password: ad1234
                    <br />
                    User:
                    <br />
                    username: Leanne, password: Graham
                </Box>
            </Modal>
        </div>
    );
};

export default Login;
