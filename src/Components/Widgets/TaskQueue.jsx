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

    const theme = useSelector(state => state.theme.theme);

    const tasks = useSelector(state => state.tasks.tasks);

    const teams = useSelector(state => state.tasks.teams);



    const dispatch = useDispatch();

    const fetchTasks = UseFetchTasks();

    const fetchTeams = UseFetchTeams();

    const updateTask = UseUpdateTask();

    const deleteTask = UseDeleteTask();



    const columns = [
        { field: 'checkbox' },
        { field: 'colorcode' },
        { field: 'task' },
        { field: 'priority' },
        { field: 'status' },
        //{ field: 'comments' },
    ];

    const [selectedRows, setSelectedRows] = useState([]);

    const [expandedRow, setExpandedRow] = useState(null);

    const [openAddTaskDilog, setOpenAddTaskDilog] = useState(false);

    const [updateTaskId, setUpdateTaskId] = useState('');

    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const [taskContent, setTaskContent] = useState('');

    const [taskToBeUpdated, setTaskToBeUpdated] = useState('');

    const [openCommentDialog, setOpenCommentDialog] = useState(false);

    const [openUpdateLinkDialog, setOpenUpdateLinkDialog] = useState(false);

    const [openUpdateTeamDialog, setOpenUpdateTeamDilog] = useState(false);

    const [openCreateTeamDialog, setOpenCreateTeamDialog] = useState(false);

    const [currentDilog, setCurrentDilog] = useState("");

    const [openFilterDialog, setOpenFilterDialog] = useState(false);

    const [filteredRows, setFilteredRows] = useState([]);

    const [filterDate, setFilterDate] = useState('');

    const [filterDateCondition, setFilterDateCondition] = useState('');

    const [selectedStatus, setSelectedStatus] = useState([]);

    const [selectePriority, setSelectedPriority] = useState([]);

    const [selectedTeams, setSelectedTeams] = useState([]);

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const handleCreateTeamDialogOpenFromAddTask = () => {
        setCurrentDilog("AddTask");
        setOpenAddTaskDilog(false);
        setOpenCreateTeamDialog(true);
    };

    const handleCreateTeamDialogOpenFromUpdateTeam = () => {
        setCurrentDilog("UpdateTeam");
        setOpenUpdateTeamDilog(false);
        setOpenCreateTeamDialog(true);
    };

    const handleOpenAddTaskDilog = () => {
        dispatch({ type: 'SET_OPEN', payload: false });
        setOpenAddTaskDilog(true);
    };

    const handleEditTask = (taskId) => {
        setUpdateTaskId(taskId);
        setTaskContent((tasks.find(task => task.taskId === taskId)).task);
        setOpenUpdateDialog(true);
    };

    const handleCommentClickOpen = (taskId) => {
        setTaskToBeUpdated(taskId);
        setOpenCommentDialog(true);
    };

    const handleUpdateLinkClickOpen = (taskId) => {
        setTaskToBeUpdated(taskId);
        setTaskContent((tasks.find(task => task.taskId === taskId)).link);
        setOpenUpdateLinkDialog(true);
    };

    const handleTeamClickOpen = (taskId) => {
        setTaskToBeUpdated(taskId);
        setOpenUpdateTeamDilog(true);
    };

    const handleFilterClickOpen = () => {
        setOpenFilterDialog(true);
    };

    const handleClearFilters = () => {
        setFilteredRows([]);
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

    const handleFilter = () => {

        dispatch({ type: 'SET_OPEN', payload: false });

        if (!filterDate && !filterDateCondition && !selectePriority.length && !selectedStatus.length && !selectedTeams.length) {
            alert('Please select at least one filter criteria');
            return;
        }

        let filteredData = tasks;

        if (filterDate && filterDateCondition) {
            const dateConditionMap = {
                'less': (taskDate) => new Date(taskDate) < new Date(filterDate),
                'equal': (taskDate) => new Date(taskDate).toDateString() === new Date(filterDate).toDateString(),
                'greater': (taskDate) => new Date(taskDate) > new Date(filterDate),
                'less_equal': (taskDate) => new Date(taskDate) <= new Date(filterDate),
                'greater_equal': (taskDate) => new Date(taskDate) >= new Date(filterDate)
            }

            filteredData = filteredData.filter(task => dateConditionMap[filterDateCondition](task.date));

        }

        if(selectedStatus.length > 0){
            filteredData = filteredData.filter(task => selectedStatus.includes(task.status));
        }

        if(selectePriority.length > 0){
            filteredData = filteredData.filter(task => selectePriority.includes(task.priority));
        }

        if(selectedTeams.length > 0){
            filteredData = filteredData.filter(task => selectedTeams.includes(task.team));
        }

        setFilteredRows(filteredData);
        dispatch({ type: 'SET_OPEN', payload: false });
        setOpenFilterDialog(false);
    };



    useEffect(() => {
        fetchTasks();
        fetchTeams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(filteredRows.length > 0){
            handleFilter();
        }
    }, [tasks]);

    return (
        <div className={`TQC ${theme === 'light' ? 'light' : 'dark'}`} >
            <div className="taskQueueWgt">
                <div className="widget-header">
                    <>TASK QUEUE</>
                    <div>You've got {tasks.length} tasks today</div>
                    <div className='buttons' >
                        {selectedRows.length > 0 && (
                            <>
                                <div className="selection">
                                    {selectedRows.length} are selected out of {filteredRows.length > 0 ? filteredRows.length : tasks.length}
                                </div>
                                <Button variant="outlined" className='clearButton' onClick={handleDeleteSelectedRows}>Delete</Button>
                            </>
                        )}
                        {(filteredRows.length > 0) && (
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
                setOpenAddTaskDilog={setOpenAddTaskDilog}
                teams={teams}
                handleCreateTeamDialogOpen={handleCreateTeamDialogOpenFromAddTask}
            />
            <AddCommentDialog
                openCommentDialog={openCommentDialog}
                taskId={taskToBeUpdated}
                setOpenCommentDialog={setOpenCommentDialog}
            />
            <UpdateLinkDialog
                openUpdateLinkDialog={openUpdateLinkDialog}
                setOpenUpdateLinkDialog={setOpenUpdateLinkDialog}
                taskIdToBeUpdated={taskToBeUpdated}
                taskContent={taskContent}
            />
            <UpdateTaskDilog
                openUpdateDialog={openUpdateDialog}
                setOpenUpdateDialog={setOpenUpdateDialog}
                taskId={updateTaskId}
                taskContent={taskContent}
            />
            <UpdateTeamDilog
                setOpenUpdateTeamDilog={setOpenUpdateTeamDilog}
                openUpdateTeamDialog={openUpdateTeamDialog}
                taskId={taskToBeUpdated}
                teams={teams}
                handleCreateTeamDialogOpen={handleCreateTeamDialogOpenFromUpdateTeam}
            />
            <AddTeamDialog
                openAddTeamDialog={openCreateTeamDialog}
                currentDilog={currentDilog}
                setOpenAddTaskDilog={setOpenAddTaskDilog}
                setOpenCreateTeamDialog={setOpenCreateTeamDialog}
                setOpenUpdateTeamDilog={setOpenUpdateTeamDilog}
            />
            <FilterDialog
                openFilterDialog={openFilterDialog}
                teams={teams}
                setOpenFilterDialog={setOpenFilterDialog}
                tasks={tasks}
                setFilteredRows={setFilteredRows}
                handleFilter = {handleFilter}
                filterDate = {filterDate}
                setFilterDate = {setFilterDate}
                filterDateCondition = {filterDateCondition}
                setFilterDateCondition = {setFilterDateCondition}
                selectePriority = {selectePriority}
                setSelectedPriority = {setSelectedPriority}
                selectedStatus = {selectedStatus}
                setSelectedStatus = {setSelectedStatus}
                selectedTeams = {selectedTeams}
                setSelectedTeams = {setSelectedTeams}
            />
        </div>
    );
}

export default TaskQueue;