import React from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddCommentDialog.scss';
import { useDispatch, useSelector } from 'react-redux';

function AddCommentDialog({ openCommentDialog, handleCommentDialogClose, handleAddComment, newComment, setNewComment }) {

    const theme = useSelector(state => state.theme.theme);

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
                        value={newComment}
                        onChange={(event) => setNewComment(event.target.value)}
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