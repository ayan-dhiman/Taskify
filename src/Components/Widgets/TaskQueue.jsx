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
import AddTeamDialog from '../Sub-Components/AddTeamDilog';

import '../../Style/TaskQueue.scss';
import { UseAddTeam } from '../../Hooks/UseAddTeam';
import UpdateLinkDialog from '../Sub-Components/UpdateLinkDialog';

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

    const addTeam = UseAddTeam();

    const [selectedRows, setSelectedRows] = useState([]);

    const [expandedRow, setExpandedRow] = useState(null);

    const columns = [
        { field: 'checkbox' },
        { field: 'colorcode' },
        { field: 'task' },
        { field: 'priority' },
        { field: 'status' },
        //{ field: 'comments' },
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

    const [link, setLink] = useState('');

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

    //Update Link states------------------------------------------------

    const [openUpdateLinkDialog, setOpenUpdateLinkDialog] = useState(false);

    //same state for newComment of adding a task

    //same state for tasktobeupdated of updating a task

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

    //Create Team States-----------------------------------------------------

    const [openCreateTeamDialog, setOpenCreateTeamDialog] = useState(false);

    const [currentDilog, setCurrentDilog] = useState("");

    const [newCreatedTeam, setNewCreatedTeam] = useState('');

    //--------------------------------------------------------------------

    //Create Team Handlers------------------------------------------------

    const handleCreateTeamDialogClose = () => {
        debugger
        setOpenCreateTeamDialog(false);
        dispatch({ type: 'SET_OPEN', payload: false });
        currentDilog === "AddTask" ? handleOpenAddTaskDilog() : handleTeamClickOpen();
    };

    const handleCreateTeamDialogOpenFromAddTask = () => {
        debugger
        setCurrentDilog("AddTask");
        handleAddTaskDilogClose();
        setOpenCreateTeamDialog(true);
    };

    const handleCreateTeamDialogOpenFromUpdateTeam = () => {
        debugger
        setCurrentDilog("UpdateTeam");
        handleUpdateTeamDialogClose();
        setOpenCreateTeamDialog(true);
    };

    const handleCreateTeam = async () => {

        try {
            await addTeam({ name: newCreatedTeam, userId: userId });
        } catch (error) {
            handleError(error);
        } finally {

            setOpenCreateTeamDialog(false);
            debugger
            currentDilog === "AddTask" ? handleOpenAddTaskDilog() : handleTeamClickOpen();

        }
    };

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
            comment: newComment,
            link: link
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

        console.log("Tasks After Adding new task - ");
        console.log(tasks);

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

    //Update Link Dilog Handlers------------------------------------------------

    const handleUpdateLinkDialogClose = () => {
        setOpenUpdateLinkDialog(false);
        dispatch({ type: 'SET_OPEN', payload: false });
    };

    const handleUpdateLink = async () => {

        setLoading(true);
        dispatch({ type: 'SET_OPEN', payload: false });

        if (!link.trim()) {
            setLoading(false);
            alert('Link cannot be blank');
            return;
        }

        try {
            await updateTask(taskIdForComment, { link: link });
        } catch (error) {
            handleError(error);
        } finally {
            setLink('');
            handleUpdateLinkDialogClose();
            fetchTasks();
            setLoading(false);
        }


    };

    const handleUpdateLinkClickOpen = (taskId) => {
        setTaskIdForComment(taskId);
        setOpenUpdateLinkDialog(true);
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
        setFilterDate('');
        setFilterStatus('');
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

    const toggleRowSelection = (taskId) => {
        if (selectedRows.includes(taskId)) {
            setSelectedRows(selectedRows.filter((id) => id !== taskId));
        } else {
            setSelectedRows([...selectedRows, taskId]);
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
        selectedRows.forEach(taskId => {

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

    const handlePriorityChange = async (taskId, newPriority) => {

        setLoading(true);

        setLoading(false);

        try {
            await updateTask(taskId, { priority: newPriority });
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

    const StatusDropdownCell = ({ id, value, onChange }) => {
        const [status, setStatus] = useState(value);

        const handleChange = (event) => {
            const newStatus = event.target.value;
            setStatus(newStatus);
            onChange(id, newStatus);
        };

        return (
            <select value={status} onChange={handleChange} className="status-dropdown">
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="ToDo">ToDo</option>
            </select>
        );
    };

    const PriorityDropdownCell = ({ id, value, onChange }) => {
        const [priority, setPriority] = useState(value);

        const handleChange = (event) => {
            const newPriority = event.target.value;
            setPriority(newPriority);
            onChange(id, newPriority);
        };

        return (
            <select value={priority} onChange={handleChange} className="status-dropdown">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        );
    };

    useEffect(() => {
        let filtered = tasks;
        if (filterDate) {
            filtered = filtered.filter(task => task.date === filterDate);
        }
        if (filterStatus) {
            filtered = filtered.filter(task => task.status === filterStatus);
        }
        setFilteredRows(filtered);
    }, [tasks, filterDate, filterStatus]);

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
                        {(filterDate || filterStatus) && (
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
                                                id={`td-${column.field}`}
                                                className={`grid-cell ${column.field !== 'status' ? 'clickable' : ''}`}
                                                onClick={(column.field === 'comments' || column.field === "task" ? () => toggleRow(rowIndex) : undefined)}
                                                style={{
                                                    // width: column.field === 'colorcode' ? '0px' : (column.field === 'status' ? '70px' : (column.field === 'comments' ? '20px' : (column.field === 'checkbox' ? '10px' : (column.field === 'priority' ? '10px' : '500px')))),
                                                    textAlign: column.field === 'task' ? 'left' : 'center',
                                                    textDecoration: row.status === 'Completed' ? 'line-through' : 'none'
                                                }}
                                            >
                                                {column.field === 'status' ? (
                                                    <StatusDropdownCell
                                                        id={row.taskId}
                                                        value={row[column.field]}
                                                        onChange={(id, newStatus) => handleStatusChange(id, newStatus)}
                                                    />
                                                ) : column.field === 'priority' ? (
                                                    <PriorityDropdownCell
                                                        id={row.taskId}
                                                        value={row[column.field]}
                                                        onChange={(id, newStatus) => handlePriorityChange(id, newStatus)}
                                                    />
                                                ) : column.field === 'comments' ? (
                                                    <RateReviewOutlinedIcon className='commentsIcon' />
                                                ) : column.field === 'colorcode' ? (
                                                    <div className={row.status === 'In Progress' ? 'InProgress' : row.status}></div>
                                                ) : column.field === 'checkbox' ? (
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(row.taskId)}
                                                        onChange={() => toggleRowSelection(row.taskId)}
                                                        className='checkbox'
                                                    />
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
                                                            <div>Created on {row.date}</div> <div><b>Team / Group :</b> {row.team}</div> <div><b>Related Link :</b> <a href={row.link} target="_blank" rel="noopener noreferrer">{row.link}</a></div>
                                                        </div>

                                                        <div className="buttons">

                                                            <Button variant="outlined" className='addCommentButton' onClick={() => handleTeamClickOpen(row.taskId)} >Update Team</Button>
                                                            <Button variant="outlined" className='addCommentButton' onClick={() => handleCommentClickOpen(row.taskId)}>Update Comment</Button>
                                                            <Button variant="outlined" className='addCommentButton' onClick={() => handleUpdateLinkClickOpen(row.taskId)}>Update Link</Button>

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
                handleCreateTeamDialogOpen={handleCreateTeamDialogOpenFromAddTask}
                newLink={link}
                setNewLink={setLink}
            />
            <AddCommentDialog
                openCommentDialog={openCommentDialog}
                handleCommentDialogClose={handleCommentDialogClose}
                handleAddComment={handleAddComment}
                newComment={newComment}
                setNewComment={setNewComment}
            />
            <UpdateLinkDialog
                openUpdateLinkDialog={openUpdateLinkDialog}
                handleUpdateLinkDialogClose={handleUpdateLinkDialogClose}
                handleUpdateLink={handleUpdateLink}
                updatedLink={link}
                setUpdatedLink={setLink}
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
                handleCreateTeamDialogOpen={handleCreateTeamDialogOpenFromUpdateTeam}
            />
            <AddTeamDialog
                openAddTeamDialog={openCreateTeamDialog}
                handleAddTeamDialogClose={handleCreateTeamDialogClose}
                handleAddTeam={handleCreateTeam}
                newTeam={newCreatedTeam}
                setNewTeam={setNewCreatedTeam}
            />

        </div>
    );
}

export default TaskQueue;