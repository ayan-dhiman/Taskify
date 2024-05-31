import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AccountDelConfirmation.scss';
import { useDispatch, useSelector } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { UseUpdateUser } from '../../Hooks/UseUpdateUser';
import { UseFetchUser } from '../../Hooks/UseFetchUser';
import { UseVerifyEmail } from '../../Hooks/UseVerifyEmail';
import useAlert from '../../Hooks/UseAlert';
import { UseDeleteAccount } from '../../Hooks/UseDeleteAccount';
import { useNavigate } from 'react-router-dom';

function AccountDelConfirmation({ accDelConfirmOpen, setAccDelConfirmOpen }) {

    const theme = useSelector(state => state.theme.theme);

    const deleteAccount = UseDeleteAccount();

    const alert = useAlert();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleADDilogClose = () => {
        setAccDelConfirmOpen(false);
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

    const handleDeleteAccount = async () => {

        try {
            //await deleteAccount();
            dispatch({ type: 'SET_TOKEN', payload: null });
            dispatch({ type: 'SET_USER', payload: null });
            navigate('/login');
            alert("Thankyou for using TASKIFY, Hope you'll be back soon !");
        } catch (error) {
            handleError(error);
        }

    }

    return (
        <Dialog
            open={accDelConfirmOpen}
            onClose={handleADDilogClose}
            className={`confirmDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='confirmDilog' >
                <div className='dialogTitle'>
                    CONFIRMATION
                </div>

                <div className="dialogBody">

                    <p>Are you sure you want to delete your TASKIFY account ?</p>

                </div>

            </div>

            <DialogActions className='dialogAction'>
                <Button variant="outlined" autoFocus onClick={handleADDilogClose} className='YesButton' >
                    No
                </Button>
                <Button variant="outlined" onClick={handleDeleteAccount} className='NoButton' >Yes</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AccountDelConfirmation;