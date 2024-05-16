import React, { useEffect, useState } from 'react';
import '../../Style/TaskQueue.scss';
import { Button, Snackbar, SnackbarContent } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import AddTaskDialog from '../Sub-Components/AddTaskDialog';
import AddCommentDialog from '../Sub-Components/AddCommentDialog';

import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import FilterDialog from '../Sub-Components/FilterDialog';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import axios from 'axios';
import UpdateTaskDilog from '../Sub-Components/UpdateTaskDilog';

import { useSelector } from 'react-redux';

function TaskQueue() {
    
    const apiUrl = process.env.REACT_APP_API_URL;

    const [selectedRows, setSelectedRows] = useState([]);

    const [expandedRow, setExpandedRow] = useState(null);

    const [open, setOpen] = useState(false);

    const [newTask, setNewTask] = useState('');

    const [openCommentDialog, setOpenCommentDialog] = useState(false);

    const [newComment, setNewComment] = useState('');

    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const [updatedTask, setUpdatedTask] = useState('');

    const [openFilterDialog, setOpenFilterDialog] = useState(false);

    const [filterDate, setFilterDate] = useState('');

    const [filterStatus, setFilterStatus] = useState('');

    const [filteredRows, setFilteredRows] = useState([]);

    const [updateTaskId, setUpdateTaskId] = useState('');

    const [taskToBeUpdated, setTaskToBeUpdated] = useState('');

    const [rows, setRows] = useState([]);

    const userId = useSelector(state => state.auth.loggedUser.id);

    const token = useSelector(state => state.auth.token);

    const [openSnackbar, setOpenSnackBar] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const columns = [
        { field: 'colorcode' },
        { field: 'task' },
        { field: 'status' },
        { field: 'comments' },
    ];

    const handleClick = (message) => {
        setSnackbarMessage(message);
        setOpenSnackBar(true);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${apiUrl}/tasks/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRows(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
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

    const deleteTaskById = async (taskId) => {
        try {
            await axios.delete(`${apiUrl}/tasks/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    const handleDeleteSelectedRows = () => {
        selectedRows.forEach(rowIndex => {
            console.log("TASK", rows[rowIndex]);
            const taskId = rows[rowIndex].taskId;
            console.log("TASK ID-", taskId);
            deleteTaskById(taskId);
        });
        setSelectedRows([]);
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await axios.put(`${apiUrl}/tasks/${taskId}`, { status: newStatus }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            fetchTasks();
        } catch (error) {
            console.error('Error updating task status:', error.message);
        }
    };

    const handleUpdateTask = async (taskId) => {
        try {
            await axios.put(`${apiUrl}/tasks/${taskId}`, { task: updatedTask }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            fetchTasks();
            handleUpdateDialogClose();
        } catch (error) {
            console.error('Error updating task status:', error.message);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenUpdatedDialog = () => {
        setOpenUpdateDialog(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenSnackBar(false);
    };

    const handleUpdateDialogClose = () => {
        setOpenUpdateDialog(false);
    }

    const currentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleAddTask = async () => {

        setOpenSnackBar(false);

        if (!newTask.trim()) {
            handleClick('Task cannot be blank');
            return;
        }

        try {
            await axios.post(`${apiUrl}/tasks`, {
                task: newTask,
                date: currentDate(),
                userId: userId,
                status: 'ToDo'
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setNewTask('');
            handleClose();

            fetchTasks();

        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };

    const handleCommentClickOpen = () => {
        setOpenCommentDialog(true);
    };

    const handleCommentDialogClose = () => {
        setOpenCommentDialog(false);
        setOpenSnackBar(false);
    };

    const handleAddComment = () => {

        setOpenSnackBar(false);

        if(!newComment.trim())
            {
                handleClick('Task cannot be blank');
                return;
            }
        setNewComment('');
        handleCommentDialogClose();
    };

    const handleFilterClickOpen = () => {
        setOpenFilterDialog(true);
    };

    const handleFilterDialogClose = () => {
        setOpenSnackBar(false);
        setOpenFilterDialog(false);
    };

    const handleFilter = () => {

        setOpenSnackBar(false);

        if(!filterDate && !filterStatus)
            {
                handleClick('Filters cannot be blank');
                return;
            }

        const filteredData = rows.filter(row => {
            const dateMatch = filterDate ? row.date === filterDate : true;
            const statusMatch = filterStatus ? row.status === filterStatus : true;
            return dateMatch && statusMatch;
        });
        console.log(filteredData);
        setFilteredRows(filteredData);
        handleFilterDialogClose();
    };

    const handleClearFilters = () => {
        setFilteredRows([]);
    };

    const handleEditTask = (taskId) => {
        setUpdateTaskId(taskId);
        handleClickOpenUpdatedDialog();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className='TQC'>
            <div className="taskQueueWgt">
                <div className="widget-header">
                    <>TASK QUEUE</>
                    <div className='buttons' >
                        {selectedRows.length > 0 && (
                            <>
                                <div className="selection">
                                    {selectedRows.length} are selected out of {filteredRows.length > 0 ? filteredRows.length : rows.length}
                                </div>
                                <Button variant="outlined" className='clearButton' onClick={handleDeleteSelectedRows}>Delete</Button>
                            </>
                        )}
                        {filteredRows.length > 0 && (
                            <Button variant="outlined" className='clearButton' onClick={handleClearFilters}>Clear Filters</Button>
                        )}

                        <Button variant="outlined" className='addButton' onClick={handleClickOpen}>Add</Button>

                        <FilterAltOutlinedIcon className='icon' onClick={handleFilterClickOpen} />
                    </div>
                </div>
                <div className="widget-body">
                    <table className="grid">
                        <tbody>
                            {(filteredRows.length > 0 ? filteredRows : rows).map((row, rowIndex) => (
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
                                                    <div className='commentLogs'>
                                                        <div className="accordion-body">{row.comments}  {row.date}</div>
                                                    </div>
                                                    <Button variant="outlined" className='addCommentButton' onClick={handleCommentClickOpen}>Add Comment</Button>
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
                open={open}
                handleClose={handleClose}
                handleAddTask={handleAddTask}
                newTask={newTask}
                setNewTask={setNewTask}
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

            <Snackbar className='snackbar'
                open={openSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                onClose={handleSnackBarClose}>
                <SnackbarContent
                    style={{
                        fontSize: '12px',
                        fontFamily: 'Raleway',
                        minWidth: 'fit-content',
                    }}
                    message={snackbarMessage}
                />
            </Snackbar>

        </div>
    );
}

export default TaskQueue;