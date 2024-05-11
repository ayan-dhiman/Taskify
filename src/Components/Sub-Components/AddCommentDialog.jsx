import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import '../../Style/AddCommentDialog.scss';

function AddCommentDialog({ openCommentDialog, handleCommentDialogClose, handleAddComment, newComment, setNewComment }) {
    return (
        <Dialog
            open={openCommentDialog}
            onClose={handleCommentDialogClose}
            className='addCommentDilogContainer'
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

            <DialogActions>
                <Button autoFocus onClick={handleCommentDialogClose} className='dialogButton' >
                    Cancel
                </Button>
                <Button onClick={handleAddComment} className='dialogButton' >Add Comment</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCommentDialog;