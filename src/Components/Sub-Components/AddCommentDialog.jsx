import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddCommentDialog.scss';
import { useDispatch, useSelector } from 'react-redux';
import { UseUpdateTask } from '../../Hooks/UseUpdateTask';

function AddCommentDialog({ openCommentDialog, setOpenCommentDialog, taskId }) {

    const theme = useSelector(state => state.theme.theme);

    const [updatedComment, setUpdatedComment] = useState('');

    const dispatch = useDispatch();

    const updateTask = UseUpdateTask();

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const handleCommentDialogClose = () => {
        setOpenCommentDialog(false);
        dispatch({ type: 'SET_OPEN', payload: false });
    };

    const handleAddComment = async () => {

        dispatch({ type: 'SET_OPEN', payload: false });

        if (!updatedComment.trim()) {
            alert('Comment cannot be blank');
            return;
        }

        try {
            await updateTask(taskId, { comment: updatedComment });
        } catch (error) {
            handleError(error);
        } finally {
            setUpdatedComment('');
            handleCommentDialogClose();
        }

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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddComment();
        }
        if (event.key === 'Escape' ) {
            handleCommentDialogClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [updatedComment]);

    return (
        <Dialog
            open={openCommentDialog}
            onClose={handleCommentDialogClose}
            className={`addCommentDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='addCommentDilog' >
                <div className='dialogTitle'>
                    ADD COMMENT
                </div>

                <div className="dialogBody">

                    <p>
                        Once you have entered the comment, click the "Add Comment" button to create the comment and add it to the comment queue.
                    </p>

                    <input
                        type='text'
                        placeholder='New Comment'
                        className='newCommentInput'
                        value={updatedComment}
                        onChange={(event) => setUpdatedComment(event.target.value)}
                    />

                </div>

            </div>

            <DialogActions className='dialogAction'>
                <Button variant="outlined" autoFocus onClick={handleCommentDialogClose} className='dialogButton' >
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleAddComment} className='dialogButton' >Add Comment</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCommentDialog;