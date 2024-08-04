import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import '../../Style/AddTaskDialog.scss';
import { useDispatch, useSelector } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { UseAddTask } from '../../Hooks/UseAddTask';

function AddTaskDialog({ open, setOpenAddTaskDilog, handleCreateTeamDialogOpen, teams }) {

    const theme = useSelector(state => state.theme.theme);

    const userId = useSelector(state => state.auth.loggedUser.id);

    const addTask = UseAddTask();

    const [task, setTask] = useState('');
    const [team, setTeam] = useState('');
    const [comment, setComment] = useState('');
    const [link, setLink] = useState('');

    const dispatch = useDispatch();

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const handleClose = () => {
        setOpenAddTaskDilog(false);
        setTask('');
        setTeam('');
        setComment('');
        setLink('');
        dispatch({ type: 'SET_OPEN', payload: false });
    };

    const currentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleAddTask = async () => {
        dispatch({ type: 'SET_OPEN', payload: false });

        if (!task.trim()) {
            alert('Task cannot be blank');
            return;
        }

        if (!team.trim()) {
            alert('Team cannot be blank');
            return;
        }

        const newTaskBody = {
            task: task,
            date: currentDate(),
            userId: userId,
            status: 'ToDo',
            team: team,
            comment: comment,
            link: link
        }

        try {

            await addTask(newTaskBody);;
        } catch (error) {
            handleError(error);
        } finally {
            handleClose();
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
        if (event.key === 'Escape' ) {
            handleClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [task, team, comment, link]);

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
                        value={task}
                        onChange={(event) => setTask(event.target.value)}
                    />

                    <div className="addTeam">

                        <Button variant='Contained' className='createTeamBTN' onClick={handleCreateTeamDialogOpen}>Create Team / Group</Button>

                    </div>

                    <select
                        className='select'
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}

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
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />

                    <input
                        type='text'
                        placeholder='Add Related Link (Optional)'
                        className='newTaskInput'
                        value={link}
                        onChange={(event) => setLink(event.target.value)}
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