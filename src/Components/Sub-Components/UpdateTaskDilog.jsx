import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddTaskDialog.scss';
import { useDispatch, useSelector } from 'react-redux';
import { UseUpdateTask } from '../../Hooks/UseUpdateTask';

function UpdateTaskDilog({ taskId, openUpdateDialog, setOpenUpdateDialog, taskContent }) {
    const theme = useSelector(state => state.theme.theme);

    const updateTask = UseUpdateTask();

    const [updatedTask, setUpdatedTask] = useState('');

    const dispatch = useDispatch();

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const handleUpdateDialogClose = () => {
        setOpenUpdateDialog(false);
    }

    const handleUpdateTask = async (taskId) => {

        try {
            await updateTask(taskId, { task: updatedTask });
        } catch (error) {
            handleError(error);
        } finally {
            setUpdatedTask('');
            setOpenUpdateDialog(false);
        }

    };

    const handleError = (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                alert('Unauthorized: Please enter a valid email and password.');
            } else {
                alert('An error occurred while processing your request. Please try again later.');
            }
        } else if (error.request) {
            alert('Network Error: Please check your internet connection.');
        } else {
            alert('An error occurred. Please try again later.');
        }
    };

    useEffect(() => {
        if (openUpdateDialog) {
            setUpdatedTask(taskContent);
        }
    }, [openUpdateDialog, taskContent, setUpdatedTask]);

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
