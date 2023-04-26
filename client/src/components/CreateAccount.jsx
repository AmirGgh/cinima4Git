import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import GenericForm from '../utils/genericForm';
import { styleModal } from '../utils/theme'



export default function CreateAccount({ cancel }) {
    const fields = [
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Password', name: 'password', type: 'password' },
    ]

    const curUser = { name: '', password: '' }

    let content;
    const handleSubmit = async (user) => {
        const response = await fetch(`http://localhost:8000/users/username/${user.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const err = await response.json()
        if (err.data == -1) {
            alert("user not exist")
        } else if (err.data == -2) {
            alert("user already have a password")
        } else {
            alert("user saved!")

        }
    };

    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal} >
                    <Typography variant="h6" component="h2"> Create New User </Typography>
                    {content}
                    <GenericForm typeForm={"create"} fields={fields} onSubmit={handleSubmit} cancel={cancel} ditails={curUser} />
                </Box>
            </Modal>
        </div>
    );
}





