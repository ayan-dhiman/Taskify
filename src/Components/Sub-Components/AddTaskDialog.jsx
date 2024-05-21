import React, { useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddTaskDialog.scss';
import { useSelector } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function AddTaskDialog({ open, handleClose, handleAddTask, newTask, setNewTask, newTeam, setNewTeam, teams, newComment, setNewComment }) {

    const theme = useSelector(state => state.theme.theme);

    const handleEditTask = (teamId) => {
        console.log(teamId);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className={`addTaskDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='addTaskDilog' >
                <div className='dialogTitle'>
                    ADD TASK
                </div>

                <div className="dialogBody">

                    <p>
                        Once you have entered the new task, click the "Add Task" button to create the task and add it to the task queue.
                    </p>

                    <input
                        type='text'
                        placeholder='New Task'
                        className='newTaskInput'
                        value={newTask}
                        onChange={(event) => setNewTask(event.target.value)}
                    />

                    <select
                        className='select'
                        value={newTeam}
                        onChange={(e) => setNewTeam(e.target.value)}

                    >
                        <option value="" disabled>Select Team / Group</option>
                        {teams.map((team) => (
                            <option value={team.name}>
                                {team.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type='text'
                        placeholder='Add comment (Optional)'
                        className='newTaskInput'
                        value={newComment}
                        onChange={(event) => setNewComment(event.target.value)}
                    />

                </div>

            </div>

            <DialogActions className='dialogAction' >
                <Button variant="outlined" autoFocus onClick={handleClose} className='dialogButton' >
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleAddTask} className='dialogButton' >Add Task</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddTaskDialog;