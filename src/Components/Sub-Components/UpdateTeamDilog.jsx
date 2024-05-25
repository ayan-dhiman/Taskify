import React from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddTaskDialog.scss';
import { useSelector } from 'react-redux';

function UpdateTeamDilog({ taskId,openUpdateTeamDialog, handleUpdateTeamDialogClose, newTeam, setNewTeam, teams, handleUpdateTeam, handleCreateTeamDialogOpen }) {
    const theme = useSelector(state => state.theme.theme);

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
                        value={newTeam}
                        onChange={(e) => setNewTeam(e.target.value)}
                        
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
