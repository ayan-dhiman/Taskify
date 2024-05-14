import React from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddTaskDialog.scss';

function UpdateTaskDilog({ taskId, openUpdateDialog, handleUpdateDialogClose, handleUpdateTask, updatedTask, setUpdatedTask }) {
    return (
        <Dialog
            open={openUpdateDialog}
            onClose={handleUpdateDialogClose}
            className='addTaskDilogContainer'
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
                        placeholder='New Task'
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
