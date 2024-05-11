import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import '../../Style/AddTaskDialog.scss';

function AddTaskDialog({ open, handleClose, handleAddTask, newTask, setNewTask }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className='addTaskDilogContainer'
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

                </div>

            </div>

            <DialogActions>
                <Button autoFocus onClick={handleClose} className='dialogButton' >
                    Cancel
                </Button>
                <Button onClick={handleAddTask} className='dialogButton' >Add Task</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddTaskDialog;