import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddCommentDialog.scss';
import { useDispatch, useSelector } from 'react-redux';
import { UseUpdateTask } from '../../Hooks/UseUpdateTask';

function UpdateLinkDialog({ openUpdateLinkDialog, setOpenUpdateLinkDialog, taskIdToBeUpdated, taskContent }) {

    const theme = useSelector(state => state.theme.theme);

    const [updatedLink, setUpdatedLink] = useState('');

    const dispatch = useDispatch();

    const updateTask = UseUpdateTask();

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const handleUpdateLinkDialogClose = () => {
        setOpenUpdateLinkDialog(false);
        dispatch({ type: 'SET_OPEN', payload: false });
    };

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

    const handleUpdateLink = async () => {

        dispatch({ type: 'SET_OPEN', payload: false });

        if (!updatedLink.trim()) {
            alert('Link cannot be blank');
            return;
        }

        try {
            await updateTask(taskIdToBeUpdated, { link: updatedLink });
        } catch (error) {
            handleError(error);
        } finally {
            setUpdatedLink('');
            handleUpdateLinkDialogClose();
        }

    };

    useEffect(() => {
        if (openUpdateLinkDialog) {
            setUpdatedLink(taskContent);
        }
    }, [openUpdateLinkDialog, taskContent, setUpdatedLink]);

    return (
        <Dialog
            open={openUpdateLinkDialog}
            onClose={handleUpdateLinkDialogClose}
            className={`addCommentDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='addCommentDilog' >
                <div className='dialogTitle'>
                    Update Link
                </div>

                <div className="dialogBody">

                    <p>
                        Once you have entered the link, click the "Update Link" button to update the link.
                    </p>

                    <input
                        type='text'
                        placeholder='link'
                        className='newCommentInput'
                        value={updatedLink}
                        onChange={(event) => setUpdatedLink(event.target.value)}
                    />

                </div>

            </div>

            <DialogActions className='dialogAction'>
                <Button variant="outlined" autoFocus onClick={handleUpdateLinkDialogClose} className='dialogButton' >
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleUpdateLink} className='dialogButton' >Update Link</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateLinkDialog;