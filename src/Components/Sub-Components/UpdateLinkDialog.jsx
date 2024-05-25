import React from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddCommentDialog.scss';
import { useDispatch, useSelector } from 'react-redux';

function UpdateLinkDialog({ openUpdateLinkDialog, handleUpdateLinkDialogClose, handleUpdateLink, updatedLink, setUpdatedLink }) {

    const theme = useSelector(state => state.theme.theme);

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