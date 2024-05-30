import React, { useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddTaskDialog.scss';
import { useDispatch, useSelector } from 'react-redux';
import { UseUpdateTask } from '../../Hooks/UseUpdateTask';
import { UseFetchTasks } from '../../Hooks/UseFetchTasks';

function UpdateTeamDilog({ taskId,openUpdateTeamDialog, teams, handleCreateTeamDialogOpen, setOpenUpdateTeamDilog }) {
    const theme = useSelector(state => state.theme.theme);

    const [updatedTeam, setUpdatedTeam] = useState('');

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const dispatch = useDispatch();

    const updateTask = UseUpdateTask();

    const handleUpdateTeamDialogClose = () => {
        setOpenUpdateTeamDilog(false);
    };

    const handleUpdateTeam = async () => {

        dispatch({ type: 'SET_OPEN', payload: false });

        if (!updatedTeam.trim()) {
            alert('Choose any team');
            return;
        }

        try {
            await updateTask(taskId, { team: updatedTeam });
        } catch (error) {
            handleError(error);
        } finally {
            setUpdatedTeam('');
            handleUpdateTeamDialogClose();
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
            open={openUpdateTeamDialog}
            onClose={handleUpdateTeamDialogClose}
            className={`addTaskDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='addTaskDilog'>
                <div className='dialogTitle'> 
                    UPDATE TEAM
                </div>

                <div className="dialogBody">
                    <p>
                        Once you have entered the updated team, click the "Update Team" button to UPDATE the task.
                    </p>

                    <div className="addTeam">

                        <Button variant='Contained' className='createTeamBTN' onClick={handleCreateTeamDialogOpen}>Create Team / Group</Button>

                    </div>

                    <select
                        className='select'
                        value={updatedTeam}
                        onChange={(e) => setUpdatedTeam(e.target.value)}
                        
                    >
                        <option value="" disabled>Select Team</option>
                        {teams.map((team) => (
                            <option value={team.name}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <DialogActions className='dialogAction'>
                <Button variant="outlined" autoFocus onClick={handleUpdateTeamDialogClose} className='dialogButton'>
                    Cancel
                </Button>
                <Button variant="outlined" onClick={() => handleUpdateTeam(taskId)} className='dialogButton'>
                    Update Team
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateTeamDilog;
