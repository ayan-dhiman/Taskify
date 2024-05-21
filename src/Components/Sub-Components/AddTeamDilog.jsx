import React from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddCommentDialog.scss';
import { useSelector } from 'react-redux';

function AddTeamDilog({ openAddTeamDialog, handleAddTeamDialogClose, handleAddTeam, newTeam, setNewTeam }) {

    const theme = useSelector(state => state.theme.theme);

    return (
        <Dialog
            open={openAddTeamDialog}
            onClose={handleAddTeamDialogClose}
            className={`addCommentDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='addCommentDilog' >
                <div className='dialogTitle'>
                    ADD NEW  TEAM/GROUP
                </div>

                <div className="dialogBody">

                    <p>
                        Once you have entered the new team/group name, click the "Add Team" button to create the Team/Group and add it with other Teams/Groups.
                    </p>

                    <input
                        type='text'
                        placeholder='New Team/Group'
                        className='newCommentInput'
                        value={newTeam}
                        onChange={(event) => setNewTeam(event.target.value)}
                    />

                </div>

            </div>

            <DialogActions className='dialogAction'>
                <Button variant="outlined" autoFocus onClick={handleAddTeamDialogClose} className='dialogButton' >
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleAddTeam} className='dialogButton' >Add Team/Group</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddTeamDilog;