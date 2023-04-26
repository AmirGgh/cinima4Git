import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Box, FormGroup, FormControlLabel, Checkbox, FormControl, FormLabel } from '@mui/material';
import authService from '../utils/authService'
import { styleTextInput } from './theme';
import { useGetJsonPremiQuery } from '../features/users/usersSlice';
// The file manage almoste all the forms and broings all the inputs to one object that ready to send as request
function GenericForm({ onSubmit, fields, movie, user, typeForm, cancel, ditails, deleteObj, delPer }) {
    const [formData, setFormData] = useState({});
    const [EditPremiss, setEditPremiss] = useState(false);
    const initialPremissions = [
        { key: "View Subscriptions", value: false },
        { key: "Update Subscriptions", value: false },
        { key: "View Movies", value: false },
        { key: "Create Movies", value: false },
        { key: "Update Movies", value: false },
        { key: "Delete Movies", value: false }
    ]
    const [premissions, setPremissions] = useState(initialPremissions);
    const { JsonPremi } = useGetJsonPremiQuery('getJsonPremi', {
        selectFromResult: ({ data }) => ({
            JsonPremi: data?.entities[user?._id]
        }),
    })

    const userPremissions = () => {
        let update;
        update = premissions.map(premission => JsonPremi?.userPremiss.includes(premission.key) ? { key: premission.key, value: true } : premission);
        setPremissions(update)
    }

    const handleChangePremission = (key, value) => {
        // users permissions logic
        if (!value && key === "View Movies") {
            setPremissions([...premissions.map((p) => p.value = false)])
        } else if (!value && key === "View Subscriptions") {
            setPremissions([...premissions, premissions[1].value = false])
            setPremissions([...premissions, premissions[2].value = false])
        }
        if (key !== "View Movies" && !premissions[2].value) {
            setPremissions([...premissions, premissions[2].value = true])
        }
        if (key === "Delete Movies" || key === "Update Subscriptions" && !premissions[0].value) {
            setPremissions([...premissions, premissions[0].value = true])
            setPremissions([...premissions, premissions[1].value = true])
            setPremissions([...premissions, premissions[4].value = true])
        }

        const updatedPremissions = premissions.map((premission, index) => premission.key === key ? { ...premission, value } : premission);
        // update permissions display
        setPremissions(updatedPremissions);
        // update permissions array, change  with redux
        const userUpdate = updatedPremissions.filter(p => p.value).map((p) => p.key);
        setFormData(prevState => ({
            ...prevState,
            premissions: userUpdate
        }));

    };

    const editPremiss = () => {
        setEditPremiss(!EditPremiss)
        userPremissions();
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(formData);
        if (cancel) cancel()
    }

    // const handleReset = () => {
    //     setFormData({});
    // }

    const editUserPre = authService.getRole() === 'admin' && !EditPremiss && user;
    return (
        <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }} >
            {fields?.map(field => (
                <TextField sx={styleTextInput} type={field.type} key={field?.name} name={field?.name} defaultValue={ditails[field?.name] ? ditails[field?.name] : ''} label={field?.label} variant="outlined" onChange={handleChange} />
            ))}
            {movie && (<TextField
                sx={styleTextInput} label="summary"
                key={"summary"} name={"summary"}
                defaultValue={ditails?.summary}
                multiline
                rows={8}
                onChange={handleChange}
            />)}
            <br />
            {editUserPre && <Button onClick={editPremiss}>Edit Permissions</Button>}

            {EditPremiss && (
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">Premissions</FormLabel>
                    <FormGroup>
                        {premissions.map(({ key, value }) =>
                            <FormControlLabel key={key} control={
                                <Checkbox name={key} checked={value} onChange={() => handleChangePremission(key, !value)} />} label={key} />)
                        }

                    </FormGroup>
                </FormControl>
            )}

            <br />
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                <Button sx={{ margin: '0.5rem' }} variant="contained" onClick={handleSubmit}>{typeForm}</Button>
                {cancel && <Button sx={{ margin: 'auto' }} variant="contained" onClick={cancel}>cancel</Button>}
                {deleteObj && delPer && <Button sx={{ margin: '0.5rem', '&:hover': { background: '#ff0000' } }} variant="contained" onClick={deleteObj}>delete</Button>}
            </Box>
        </Box>
    );
}


export default GenericForm;

