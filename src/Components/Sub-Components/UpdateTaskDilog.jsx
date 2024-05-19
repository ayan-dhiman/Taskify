import React, { useEffect } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddTaskDialog.scss';
import { useSelector } from 'react-redux';

function UpdateTaskDilog({ taskId, openUpdateDialog, handleUpdateDialogClose, handleUpdateTask, updatedTask, setUpdatedTask, taskToUpdate }) {
    const theme = useSelector(state => state.theme.theme);

    useEffect(() => {
        if (openUpdateDialog) {
            setUpdatedTask(taskToUpdate);
        }
    }, [openUpdateDialog, taskToUpdate, setUpdatedTask]);

    return (
        <Dialog
            open={openUpdateDialog}
            onClose={handleUpdateDialogClose}
            className={`addTaskDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='addTaskDilog'>
                <div className='dialogTitle'> 
                    Update TASK
                </div>

                <div className="dialogBody">
                    <p>
                        Once you have entered the updated task, click the "Update Task" button to UPDATE the task.
                    </p>

                    <input
                        type='text'
                        //placeholder={taskToUpdate}
                        placegolder="Enter the Updated Task"
                        className='newTaskInput'
                        value={updatedTask}
                        onChange={(event) => setUpdatedTask(event.target.value)}
                    />
                </div>
            </div>

            <DialogActions className='dialogAction'>
                <Button variant="outlined" autoFocus onClick={handleUpdateDialogClose} className='dialogButton'>
                    Cancel
                </Button>
                <Button variant="outlined" onClick={() => handleUpdateTask(taskId)} className='dialogButton'>
                    Update Task
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateTaskDilog;
