import React, { useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/Suggestion.scss';
import { useDispatch, useSelector } from 'react-redux';
import { UseUpdateTask } from '../../Hooks/UseUpdateTask';

function Suggestion({ openSuggestionDialog, setOpenSuggestionDialog }) {

    const theme = useSelector(state => state.theme.theme);

    const [suggestion, setSuggestion] = useState('');

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const handleSuggestionDialogClose = () => {
        setOpenSuggestionDialog(false);
        dispatch({ type: 'SET_OPEN', payload: false });
    };

    const handleSuggestionSubmit = async () => {

        dispatch({ type: 'SET_OPEN', payload: false });

        // if (!updatedComment.trim()) {
        //     alert('Comment cannot be blank');
        //     return;
        // }

        // try {
        //     await updateTask(taskId, { comment: updatedComment });
        // } catch (error) {
        //     handleError(error);
        // } finally {
        //     setUpdatedComment('');
        //     handleCommentDialogClose();
        // }

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

    return (
        <Dialog
            open={openSuggestionDialog}
            onClose={handleSuggestionDialogClose}
            className={`suggestionDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='suggestionDilog' >
                <div className='dialogTitle'>
                    Your Feedback Matters
                </div>

                <div className="dialogBody">

                    <p>
                        Committed to enhancing the Taskify experience, any suggestions or ideas on improving the user experience are greatly appreciated. Your feedback is invaluable and helps make Taskify better for everyone.
                    </p>

                    <input
                        type='text'
                        placeholder='Name'
                        className='input'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />

                    <input
                        type='text'
                        placeholder='Email'
                        className='input'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input
                        type='text'
                        placeholder='Suggestion'
                        className='input box'
                        value={suggestion}
                        onChange={(event) => setSuggestion(event.target.value)}
                    />

                </div>

            </div>

            <DialogActions className='dialogAction'>
                <Button variant="outlined" autoFocus onClick={handleSuggestionDialogClose} className='dialogButton' >
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleSuggestionSubmit} className='dialogButton' >Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Suggestion;