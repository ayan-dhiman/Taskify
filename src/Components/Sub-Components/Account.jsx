import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/Account.scss';
import { useDispatch, useSelector } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { UseUpdateUser } from '../../Hooks/UseUpdateUser';
import { UseFetchUser } from '../../Hooks/UseFetchUser';
import { UseVerifyEmail } from '../../Hooks/UseVerifyEmail';
import useAlert from '../../Hooks/UseAlert';
import { UseDeleteAccount } from '../../Hooks/UseDeleteAccount';
import { useNavigate } from 'react-router-dom';

function Account({ openAccountDialog, setOpenAccountDilog, handleDeleteAccount }) {

    const theme = useSelector(state => state.theme.theme);

    const loggedUser = useSelector(state => state.auth.loggedUser);

    const token = useSelector(state => state.auth.token);

    const updateUser = UseUpdateUser();

    const fetchUser = UseFetchUser();

    const verifyEmail = UseVerifyEmail();

    const deleteAccount = UseDeleteAccount();

    const alert = useAlert();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');

    const [userEmail, setUserEmail] = useState('');

    const [editUserName, setEditUserName] = useState(false);

    const [editUserEmail, setEditUserEmail] = useState(false);

    const handleEditName = () => {
        editUserName ? setEditUserName(false) : setEditUserName(true);
        setEditUserEmail(false)
    }

    const handleEditEmail = () => {
        editUserEmail ? setEditUserEmail(false) : setEditUserEmail(true);;
        setEditUserName(false);
    }

    const handleAccountDilogClose = () => {
        setOpenAccountDilog(false);
    }

    const handleVerifyEmail = async (email) => {
        try {
            return await verifyEmail(email);
        } catch (error) {
            handleError(error);
            return false;
        }
    };

    const handleSaveChanges = async () => {

        if (!userName.trim()) {
            alert('Name cannot be blank');
            return;
        }

        if (!userName.match(/^[a-zA-Z\s]+$/)) {
            alert('Name should only contain alphabets');
            return;
        }

        if (!userEmail.trim()) {
            alert('Email cannot be blank');
            return;
        }

        if (!userEmail.match(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            alert('Please enter a valid email address');
            return;
        }

        if (loggedUser.email !== userEmail) {
            if (await handleVerifyEmail(userEmail)) {
                alert('Email is already registered!');
                return;
            }
        }

        if (loggedUser.name === userName.trim() && loggedUser.email === userEmail.trim()) {
            alert('No changes to save !');
            return;
        }

        const updateBody = {
            name: userName,
            email: userEmail
        }

        try {

            await updateUser(updateBody);
            await fetchUser(userEmail, token);
        } catch (error) {
            handleError(error);
        } finally {
            handleAccountDilogClose();
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSaveChanges();
        }
        if (event.key === 'Escape' ) {
            handleAccountDilogClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [userName, userEmail]);

    useEffect(() => {
        if (openAccountDialog) {
            setUserName(loggedUser.name);
            setUserEmail(loggedUser.email);
        }
    }, [openAccountDialog, setUserName, setUserEmail]);

    return (
        <Dialog
            open={openAccountDialog}
            onClose={handleAccountDilogClose}
            className={`accountDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='accountDilog' >
                <div className='dialogTitle'>
                    ACCOUNT DETAILS

                    <Button variant="outlined" className='delAccButton' onClick={handleDeleteAccount}>Delete Account</Button>

                </div>

                <div className="dialogBody">

                    <p>Please review and update your account details to ensure your information is accurate and secure.</p>

                    <p><b>Account Created :</b> {loggedUser.createdOn}</p>

                    <p><b>Last Login :</b> {loggedUser.lastLogin}</p>

                    <p><b>Full Name :</b>
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

                    </p>

                    {/* <p ><b>Password :</b><span className='info'>{userPassword}<EditOutlinedIcon className='editIcon' /></span></p> */}

                </div>

            </div>

            <DialogActions className='dialogAction'>
                <Button variant="outlined" autoFocus onClick={handleAccountDilogClose} className='dialogButton' >
                    Close
                </Button>
                <Button variant="outlined" onClick={handleSaveChanges} className='dialogButton' >Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Account;