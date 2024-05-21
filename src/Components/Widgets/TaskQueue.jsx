import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

import { UseFetchTasks } from '../../Hooks/UseFetchTasks';
import { UseFetchTeams } from '../../Hooks/UseFetchTeams';
import { UseAddTask } from '../../Hooks/UseAddTask';
import { UseUpdateTask } from '../../Hooks/UseUpdateTask';
import { UseDeleteTask } from '../../Hooks/UseDeleteTask';

import AddTaskDialog from '../Sub-Components/AddTaskDialog';
import AddCommentDialog from '../Sub-Components/AddCommentDialog';
import FilterDialog from '../Sub-Components/FilterDialog';
import UpdateTaskDilog from '../Sub-Components/UpdateTaskDilog';
import UpdateTeamDilog from '../Sub-Components/UpdateTeamDilog';
import StatusDropdownCell from '../Sub-Components/StatusDropdownCell';

import '../../Style/TaskQueue.scss';

function TaskQueue({ loading, setLoading }) {

    const userId = useSelector(state => state.auth.loggedUser.id);

    const theme = useSelector(state => state.theme.theme);

    const tasks = useSelector(state => state.tasks.tasks);

    const teams = useSelector(state => state.tasks.teams);


    const dispatch = useDispatch();

    const fetchTasks = UseFetchTasks();

    const fetchTeams = UseFetchTeams();

    const addTask = UseAddTask();

    const updateTask = UseUpdateTask();

    const deleteTask = UseDeleteTask();


    const [selectedRows, setSelectedRows] = useState([]);

    const [expandedRow, setExpandedRow] = useState(null);

    const columns = [
        { field: 'colorcode' },
        { field: 'task' },
        { field: 'status' },
        { field: 'comments' },
    ];

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    //add task states---------------------------------------------------

    const [openAddTaskDilog, setOpenAddTaskDilog] = useState(false);

    const [newTask, setNewTask] = useState('');

    const [newTeam, setNewTeam] = useState('');

    const [newComment, setNewComment] = useState('');

    //------------------------------------------------------------------

    //update task states------------------------------------------------

    const [updateTaskId, setUpdateTaskId] = useState('');

    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const [updatedTask, setUpdatedTask] = useState('');

    const [taskToBeUpdated, setTaskToBeUpdated] = useState('');

    //------------------------------------------------------------------

    //Update Comment states------------------------------------------------

    const [openCommentDialog, setOpenCommentDialog] = useState(false);

    //same state for newComment of adding a task

    const [taskIdForComment, setTaskIdForComment] = useState(null);

    //----------------------------------------------------------------------

    //Update Team states------------------------------------------------

    //same state for newTeam of adding a task

    //same state for tasktobeupdated of updating a task

    const [openUpdateTeamDialog, setOpenUpdateTeamDilog] = useState(false);

    //--------------------------------------------------------------------

    //Update Filter states------------------------------------------------

    const [openFilterDialog, setOpenFilterDialog] = useState(false);

    const [filterDate, setFilterDate] = useState('');

    const [filterStatus, setFilterStatus] = useState('');

    const [filteredRows, setFilteredRows] = useState([]);

    //--------------------------------------------------------------------

    //add Task Dilog Handlers------------------------------------------------------

    const handleOpenAddTaskDilog = () => {
        setNewTask('');
        setNewTeam('');
        setNewComment('');
        dispatch({ type: 'SET_OPEN', payload: false });
        setOpenAddTaskDilog(true);
    };

    const handleAddTaskDilogClose = () => {
        setOpenAddTaskDilog(false);
        dispatch({ type: 'SET_OPEN', payload: false });
    };

    const handleAddTask = async () => {
        setLoading(true);
        dispatch({ type: 'SET_OPEN', payload: false });

        if (!newTask.trim()) {
            setLoading(false);
            alert('Task cannot be blank');
            return;
        }

        if (!newTeam.trim()) {
            setLoading(false);
            alert('Team cannot be blank');
            return;
        }

        const newTaskBody = {
            task: newTask,
            date: currentDate(),
            userId: userId,
            status: 'ToDo',
            team: newTeam,
            comment: newComment
        }

        try {

            await addTask(newTaskBody);;
        } catch (error) {
            handleError(error);
        } finally {
            setNewTask('');
            handleAddTaskDilogClose();
            setLoading(false);
        }

    };

    //-----------------------------------------------------------------------------

    //Update Task Dilog Handlers------------------------------------------------

    const handleEditTask = (taskId) => {
        setUpdateTaskId(taskId);
        setOpenUpdateDialog(true);
    };

    const handleUpdateDialogClose = () => {
        setOpenUpdateDialog(false);
    }

    const handleUpdateTask = async (taskId) => {

        setLoading(true);

        try {
            await updateTask(taskId, { task: updatedTask });
        } catch (error) {
            handleError(error);
        } finally {
            setUpdatedTask('');
            setLoading(false);
            setOpenUpdateDialog(false);
        }

    };

    //--------------------------------------------------------------------------

    //Update Comment Dilog Handlers------------------------------------------------

    const handleCommentDialogClose = () => {
        setOpenCommentDialog(false);
        dispatch({ type: 'SET_OPEN', payload: false });
    };

    const handleAddComment = async () => {

        setLoading(true);
        dispatch({ type: 'SET_OPEN', payload: false });

        if (!newComment.trim()) {
            setLoading(false);
            alert('Comment cannot be blank');
            return;
        }

        try {
            await updateTask(taskIdForComment, { comment: newComment });
        } catch (error) {
            handleError(error);
        } finally {
            setNewComment('');
            handleCommentDialogClose();
            fetchTasks();
            setLoading(false);
        }


    };

    const handleCommentClickOpen = (taskId) => {
        setTaskIdForComment(taskId);
        setOpenCommentDialog(true);
    };

    //--------------------------------------------------------------------------

    //Update Team Dilog Handlers------------------------------------------------

    const handleUpdateTeam = async () => {

        setLoading(true);
        dispatch({ type: 'SET_OPEN', payload: false });

        if (!newTeam.trim()) {
            setLoading(false);
            alert('Team cannot be blank');
            return;
        }
        
        try {
            await updateTask(taskToBeUpdated, { team: newTeam });
        } catch (error) {
            handleError(error);
        } finally {
            setNewTeam('');
            handleUpdateTeamDialogClose();
            fetchTasks();
            setLoading(false);
        }

    };

    const handleUpdateTeamDialogClose = () => {
        setOpenUpdateTeamDilog(false);
    };

    const handleTeamClickOpen = (taskId) => {
        setTaskToBeUpdated(taskId);
        setOpenUpdateTeamDilog(true);
    };

    //--------------------------------------------------------------------

    //Filter Dilog Handlers ---------------------------------------------------

    const handleFilterClickOpen = () => {
        setFilterDate('');
        setFilterStatus('');
        setOpenFilterDialog(true);
    };

    const handleFilterDialogClose = () => {
        dispatch({ type: 'SET_OPEN', payload: false });
        setOpenFilterDialog(false);
    };

    const handleFilter = () => {

        dispatch({ type: 'SET_OPEN', payload: false });

        if (!filterDate && !filterStatus) {
            alert('Filters cannot be blank');
            return;
        }

        const filteredData = tasks.filter(row => {
            const dateMatch = filterDate ? row.date === filterDate : true;
            const statusMatch = filterStatus ? row.status === filterStatus : true;
            return dateMatch && statusMatch;
        });

        setFilteredRows(filteredData);
        handleFilterDialogClose();
    };

    const handleClearFilters = () => {
        setFilteredRows([]);
    };

    //-------------------------------------------------------------------------

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

    const toggleRow = (rowIndex) => {
        if (expandedRow === rowIndex) {
            setExpandedRow(null);
        } else {
            setExpandedRow(rowIndex);
        }
    };

    const toggleRowSelection = (rowIndex) => {
        if (selectedRows.includes(rowIndex)) {
            setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
        } else {
            setSelectedRows([...selectedRows, rowIndex]);
        }
    };

    const HandleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
        } catch (error) {
            handleError(error);
        }
    }

    const handleDeleteSelectedRows = async () => {
        selectedRows.forEach(rowIndex => {
            const taskId = tasks[rowIndex].taskId;

            HandleDeleteTask(taskId);

        });
        setSelectedRows([]);
    };

    const handleStatusChange = async (taskId, newStatus) => {

        setLoading(true);

        setLoading(false);

        try {
            await updateTask(taskId, { status: newStatus });
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }

    };

    const currentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        fetchTasks();
        fetchTeams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`TQC ${theme === 'light' ? 'light' : 'dark'}`} >
            <div className="taskQueueWgt">
                <div className="widget-header">
                    <>TASK QUEUE</>
                    <div className='buttons' >
                        {selectedRows.length > 0 && (
                            <>
                                <div className="selection">
                                    {selectedRows.length} are selected out of {filteredRows.length > 0 ? filteredRows.length : tasks.length}
                                </div>
                                <Button variant="outlined" className='clearButton' onClick={handleDeleteSelectedRows}>Delete</Button>
                            </>
                        )}
                        {filteredRows.length > 0 && (
                            <Button variant="outlined" className='clearButton' onClick={handleClearFilters}>Clear Filters</Button>
                        )}

                        <Button variant="outlined" className='addButton' onClick={handleOpenAddTaskDilog}>Add</Button>

                        <FilterAltOutlinedIcon className='icon' onClick={handleFilterClickOpen} />

                        <CachedOutlinedIcon onClick={fetchTasks} className='icon' />
                    </div>
                </div>
                <div className="widget-body">
                    <table className="grid">
                        <tbody>
                            {(filteredRows.length > 0 ? filteredRows : tasks).map((row, rowIndex) => (
                                <React.Fragment key={rowIndex}>
                                    <tr
                                        className={`grid-row ${selectedRows.includes(rowIndex) ? 'selected-row' : ''}`}
                                    >
                                        {columns.map((column) => (
                                            <td
                                                key={column.field}
                                                className={`grid-cell ${column.field !== 'status' ? 'clickable' : ''}`}
                                                onClick={(column.field !== 'status' && column.field !== 'comments') ? () => toggleRowSelection(rowIndex) : (column.field === 'comments' ? () => toggleRow(rowIndex) : undefined)}
                                                style={{
                                                    width: column.field === 'colorcode' ? '0px' : (column.field === 'status' ? '70px' : (column.field === 'comments' ? '20px' : '500px')),
                                                    textAlign: column.field === 'task' ? 'left' : 'center',
                                                }}
                                            >
                                                {column.field === 'status' ? (
                                                    <StatusDropdownCell
                                                        id={row.taskId}
                                                        value={row[column.field]}
                                                        onChange={(id, newStatus) => handleStatusChange(id, newStatus)}
                                                    />
                                                ) : column.field === 'comments' ? (
                                                    <RateReviewOutlinedIcon className='commentsIcon' />
                                                ) : column.field === 'colorcode' ? (
                                                    <div className={row.status === 'In Progress' ? 'InProgress' : row.status}></div>
                                                ) : (
                                                    <>
                                                        {row[column.field]}
                                                        {column.field === 'task' && (
                                                            <EditOutlinedIcon
                                                                className="editIcon"
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    setTaskToBeUpdated(row.task);
                                                                    handleEditTask(row.taskId);
                                                                }}
                                                            />
                                                        )}
                                                    </>
                                                )}

                                            </td>
                                        ))}
                                    </tr>
                                    {expandedRow === rowIndex && (
                                        <tr className="accordion-content">
                                            <td colSpan={columns.length}>
                                                <div className="accordion-item">

                                                    <div className="headerContent">

                                                        <div className='commentLogs'>
                                                            <div>Created on {row.date}</div> <div><b>Team :</b> {row.team}</div>
                                                        </div>

                                                        <div className="buttons">

                                                            <Button variant="outlined" className='addCommentButton' onClick={() => handleTeamClickOpen(row.taskId)} >Update Team</Button>
                                                            <Button variant="outlined" className='addCommentButton' onClick={() => handleCommentClickOpen(row.taskId)}>Update Comment</Button>

                                                        </div>

                                                    </div>

                                                    <div className="comment">

                                                        <p><b>Comment:</b> {row.comment}</p>

                                                    </div>

                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddTaskDialog
                open={openAddTaskDilog}
                handleClose={handleAddTaskDilogClose}
                handleAddTask={handleAddTask}
                newTask={newTask}
                setNewTask={setNewTask}
                newTeam={newTeam}
                setNewTeam={setNewTeam}
                teams={teams}
                newComment={newComment}
                setNewComment={setNewComment}
            />
            <AddCommentDialog
                openCommentDialog={openCommentDialog}
                handleCommentDialogClose={handleCommentDialogClose}
                handleAddComment={handleAddComment}
                newComment={newComment}
                setNewComment={setNewComment}
            />
            <FilterDialog
                openFilterDialog={openFilterDialog}
                handleFilterDialogClose={handleFilterDialogClose}
                handleFilter={handleFilter}
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
            />
            <UpdateTaskDilog
                openUpdateDialog={openUpdateDialog}
                handleUpdateDialogClose={handleUpdateDialogClose}
                handleUpdateTask={handleUpdateTask}
                setUpdatedTask={setUpdatedTask}
                updatedTask={updatedTask}
                taskId={updateTaskId}
                taskToUpdate={taskToBeUpdated}
            />
            <UpdateTeamDilog
                handleUpdateTeam={handleUpdateTeam}
                handleUpdateTeamDialogClose={handleUpdateTeamDialogClose}
                newTeam={newTeam}
                openUpdateTeamDialog={openUpdateTeamDialog}
                setNewTeam={setNewTeam}
                taskId={taskToBeUpdated}
                teams={teams}
            />

        </div>
    );
}

export default TaskQueue;