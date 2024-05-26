import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/SecurityPassword.scss';
import { useDispatch, useSelector } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { UseUpdateUser } from '../../Hooks/UseUpdateUser';
import { UseFetchUser } from '../../Hooks/UseFetchUser';
import { UseVerifyEmail } from '../../Hooks/UseVerifyEmail';
import useAlert from '../../Hooks/UseAlert';

function SecurityPassword({ openSecurityDialog, setOpenSecurityDilog }) {

    const theme = useSelector(state => state.theme.theme);

    const loggedUser = useSelector(state => state.auth.loggedUser);

    const token = useSelector(state => state.auth.token);

    const updateUser = UseUpdateUser();

    const fetchUser = UseFetchUser();

    const alert = useAlert();

    const [verifyPassword, setVerifyPassword] = useState('');

    const [newPassword, setNewPassword] = useState('');

    const handleSecurityDilogClose = () => {
        setOpenSecurityDilog(false);
    }

    const handleSaveChanges = async () => {
        
        if (!newPassword.trim()) {
            alert('Password cannot be blank');
            return false;
        }

        if (newPassword.trim().length < 6) {
            alert('Password must be at least 6 characters long');
            return false;
        }

        if (!verifyPassword.trim()) {
            alert('Password cannot be blank');
            return false;
        }

        if (verifyPassword.trim().length < 6) {
            alert('Password must be at least 6 characters long');
            return false;
        }

        if (verifyPassword !== newPassword) {
            alert('Passwords do not match');
            return false;
        }

        try {
            await updateUser({ password: newPassword });
            handleSecurityDilogClose();
        } catch (error) {
            handleError(error);
        }

    }

    const handleError = (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                alert('Unauthorized: Please enter a valid email and password.');
            } else {
                alert('An error occurred while processing your request. Please try again later.');
            }
        } else if (error.request) {
            alert('Network Error: Please check your internet connection.');
        } else {
            alert('An error occurred. Please try again later.');
        }
    };

    // useEffect(() => {
    //     if (openAccountDialog) {
    //         setUserName(loggedUser.name);
    //         setUserEmail(loggedUser.email);
    //     }
    // }, [openAccountDialog, setUserName, setUserEmail]);

    return (
        <Dialog
            open={openSecurityDialog}
            onClose={handleSecurityDilogClose}
            className={`securityDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='securityDilog' >
                <div className='dialogTitle'>
                    Security Password
                </div>

                <div className="dialogBody">

                    <p>Keep your account secure by regularly updating your password to a strong, unique one.</p>

                    <input
                        type='password'
                        placeholder='New Password'
                        className='input'
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />

                    <input
                        type='text'
                        placeholder='Verify Password'
                        className='input'
                        value={verifyPassword}
                        onChange={(event) => setVerifyPassword(event.target.value)}
                    />

                    {/* <p><b>Full Name :</b>
                        {editUserName ?
                            <input
                                type='text'
                                placeholder='Name'
                                className='input'
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                            : <span className='info'>{userName}</span>}
                        <EditOutlinedIcon className='editIcon' onClick={handleEditName} />

                    </p>

                    <p><b>Registered Email :</b>
                        {editUserEmail ?
                            <input
                                type='email'
                                placeholder='Email'
                                className='input'
                                value={userEmail}
                                onChange={(event) => setUserEmail(event.target.value)}
                            />
                            : <span className='info'>{userEmail}</span>}
                        <EditOutlinedIcon className='editIcon' onClick={handleEditEmail} />

                    </p> */}

                    {/* <p ><b>Password :</b><span className='info'>{userPassword}<EditOutlinedIcon className='editIcon' /></span></p> */}

                </div>

            </div>

            <DialogActions className='dialogAction'>
                <Button variant="outlined" autoFocus onClick={handleSecurityDilogClose} className='dialogButton' >
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleSaveChanges} className='dialogButton' >Update Password</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SecurityPassword;