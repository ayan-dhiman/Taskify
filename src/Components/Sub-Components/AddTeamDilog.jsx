import React, { useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddCommentDialog.scss';
import { useDispatch, useSelector } from 'react-redux';
import { UseAddTeam } from '../../Hooks/UseAddTeam';

function AddTeamDilog({ openAddTeamDialog, setOpenAddTaskDilog, setOpenCreateTeamDialog, currentDilog, setOpenUpdateTeamDilog }) {

    const theme = useSelector(state => state.theme.theme);

    const userId = useSelector(state => state.auth.loggedUser.id);

    const [newTeam, setNewTeam] = useState('');

    const dispatch = useDispatch();

    const addTeam = UseAddTeam();

    const handleCreateTeamDialogClose = () => {
        setOpenCreateTeamDialog(false);
        dispatch({ type: 'SET_OPEN', payload: false });
        currentDilog === "AddTask" ? setOpenAddTaskDilog(true) : setOpenUpdateTeamDilog(true);
    };

    const handleCreateTeam = async () => {

        try {
            await addTeam({ name: newTeam, userId: userId });
        } catch (error) {
            handleError(error);
        } finally {
            setOpenCreateTeamDialog(false);
            setNewTeam('');
            currentDilog === "AddTask" ? setOpenAddTaskDilog(true) : setOpenUpdateTeamDilog(true);
        }

    };

    const handleError = (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                alert('Unauthorized');
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
            open={openAddTeamDialog}
            onClose={handleCreateTeamDialogClose}
            className={`addCommentDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='addCommentDilog' >
                <div className='dialogTitle'>
                    CREATE NEW  TEAM/GROUP
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
                <Button variant="outlined" autoFocus onClick={handleCreateTeamDialogClose} className='dialogButton' >
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleCreateTeam} className='dialogButton' >Create Team/Group</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddTeamDilog;