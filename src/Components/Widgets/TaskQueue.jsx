import React, { useState } from 'react';
import '../../Style/TaskQueue.scss';
import { Button } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import AddTaskDialog from '../Sub-Components/AddTaskDialog';
import AddCommentDialog from '../Sub-Components/AddCommentDialog';

import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import FilterDialog from '../Sub-Components/FilterDialog';

function TaskQueue() {

    const [selectedRows, setSelectedRows] = useState([]);

    const [expandedRow, setExpandedRow] = useState(null);

    const [open, setOpen] = useState(false);

    const [newTask, setNewTask] = useState('');

    const [openCommentDialog, setOpenCommentDialog] = useState(false);

    const [newComment, setNewComment] = useState('');

    const [openFilterDialog, setOpenFilterDialog] = useState(false);

    const [filterDate, setFilterDate] = useState('');
    
    const [filterStatus, setFilterStatus] = useState('');
    
    const [filteredRows, setFilteredRows] = useState([]);

    const columns = [
        { field: 'colorcode' },
        { field: 'task' },
        { field: 'status' },
        { field: 'comments' },
    ];

    const [rows, setRows] = useState([
        { id: 1, date: '2024-05-11', task: 'Style the Filter Dialog', status: 'ToDo', comments: 'Created On' },
        { id: 2, date: '2024-05-11', task: 'Reduce the size of color code to 10px', status: 'ToDo', comments: 'Created On' },
        { id: 3, date: '2024-05-11', task: 'Align the Task cell text to left', status: 'ToDo', comments: 'Created On' },
        { id: 4, date: '2024-05-11', task: 'Globalize the Main Color Scheme', status: 'ToDo', comments: 'Created On' },
        { id: 5, date: '2024-05-11', task: 'Create a dark-light theme toggle', status: 'ToDo', comments: 'Created On' },
        { id: 6, date: '2024-05-11', task: 'Try Post card yellow theme', status: 'ToDo', comments: 'Created On' },
        { id: 7, date: '2024-03-22', task: 'Task 7', status: 'Completed', comments: 'Comment 7' },
        { id: 8, date: '2024-03-23', task: 'Task 8', status: 'In Progress', comments: 'Comment 8' },
        { id: 9, date: '2024-03-24', task: 'Task 9', status: 'ToDo', comments: 'Comment 9' },
        { id: 10, date: '2024-03-25', task: 'Task 10', status: 'Completed', comments: 'Comment 10' },
        { id: 11, date: '2024-03-26', task: 'Task 11', status: 'In Progress', comments: 'Comment 11' },
        { id: 12, date: '2024-03-27', task: 'Task 12', status: 'ToDo', comments: 'Comment 12' },
        { id: 13, date: '2024-03-28', task: 'Task 13', status: 'Completed', comments: 'Comment 13' },
        { id: 14, date: '2024-03-29', task: 'Task 14', status: 'In Progress', comments: 'Comment 14' },
        { id: 15, date: '2024-03-30', task: 'Task 15', status: 'ToDo', comments: 'Comment 15' },
        { id: 16, date: '2024-03-31', task: 'Task 16', status: 'Completed', comments: 'Comment 16' },
        { id: 17, date: '2024-04-01', task: 'Task 17', status: 'In Progress', comments: 'Comment 17' },
        { id: 18, date: '2024-04-02', task: 'Task 18', status: 'ToDo', comments: 'Comment 18' },
        { id: 19, date: '2024-04-03', task: 'Task 19', status: 'Completed', comments: 'Comment 19' },
        { id: 20, date: '2024-04-04', task: 'Task 20', status: 'In Progress', comments: 'Comment 20' },
    ]);

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

    const handleDeleteSelectedRows = () => {
        const remainingRows = rows.filter((row, index) => !selectedRows.includes(index));
        setRows(remainingRows);
        setSelectedRows([]);
    };

    const handleStatusChange = (rowId, newStatus) => {

        const updatedRows = rows.map(row => {
            if (row.id === rowId) {
                return { ...row, status: newStatus };
            }
            return row;
        });

        setRows(updatedRows);

        const updatedFilteredRows = filteredRows.map(row => {
            if (row.id === rowId) {
                return { ...row, status: newStatus };
            }
            return row;
        });

        setFilteredRows(updatedFilteredRows);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTask = () => {
        console.log(newTask);
        setNewTask('');
        handleClose();
    };

    const handleCommentClickOpen = () => {
        setOpenCommentDialog(true);
    };

    const handleCommentDialogClose = () => {
        setOpenCommentDialog(false);
    };

    const handleAddComment = () => {
        console.log(newTask);
        setNewComment('');
        handleCommentDialogClose();
    };

    const handleFilterClickOpen = () => {
        setOpenFilterDialog(true);
    };

    const handleFilterDialogClose = () => {
        setOpenFilterDialog(false);
    };

    const handleFilter = () => {
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

    return (
        <div className='TQC'>
            <div className="taskQueueWgt">
                <div className="widget-header">
                    <>TASK QUEUE</>
                    <div className='buttons' >
                        {selectedRows.length > 0 && (
                            <>
                                <div className="selection">{selectedRows.length} are selected out of {rows.length}</div>
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
                                                onClick={ (column.field !== 'status' && column.field !== 'comments' ) ? () => toggleRowSelection(rowIndex) : ( column.field === 'comments' ? () => toggleRow(rowIndex) : undefined ) }
                                                style={{
                                                    width: column.field === 'colorcode' ? '0px' : (column.field === 'status' ? '70px' : ( column.field === 'comments' ? '20px' : '500px')),
                                                    textAlign: column.field === 'task' ? 'left' : 'center',
                                                    backgroundColor:
                                                        column.field === 'colorcode'
                                                            ? row.status === 'ToDo' ? '#E5524B' : row.status === 'In Progress' ? '#DBEF5A' : row.status === 'Completed' ? '#9ADF5A' : ''
                                                            : ''
                                                }}
                                            >
                                                {column.field === 'status' ? (
                                                    <StatusDropdownCell id={row.id} value={row[column.field]} onChange={(id, newStatus) => handleStatusChange(id, newStatus)} />
                                                ) : column.field === 'comments' ? (
                                                    <RateReviewOutlinedIcon className='commentsIcon' />
                                                ) : (
                                                    row[column.field]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                    {expandedRow === rowIndex && (
                                        <tr className="accordion-content">
                                            <td colSpan={columns.length}>
                                                <div className="accordion-item">
                                                    <div className='commentLogs'>
                                                        <div className="accordion-body">{row.date}</div>
                                                        <div className="accordion-body">{row.comments}</div>
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
        </div>
    );
}

export default TaskQueue;