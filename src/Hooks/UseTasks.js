import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useTasks = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const userId = useSelector(state => state.auth.loggedUser.id);
    const token = useSelector(state => state.auth.token);

    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [filteredRows, setFilteredRows] = useState([]);

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

    useEffect(() => {
        fetchTasks();
    }, []);

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

    const handleUpdateTask = async (taskId, updatedTask) => {
        try {
            await axios.put(`${apiUrl}/tasks/${taskId}`, { task: updatedTask }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task status:', error.message);
        }
    };

    const handleAddTask = async (newTask, handleClose) => {
        if (!newTask.trim()) {
            return 'Task cannot be blank';
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

            handleClose();
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };

    const currentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleAddComment = async (taskId, comment, handleCommentDialogClose) => {
        // if (!comment.trim()) {
        //     return 'Comment cannot be blank';
        // }

        // try {
        //     await axios.post(`${apiUrl}/tasks/${taskId}/comments`, {
        //         comment: comment,
        //         date: currentDate(),
        //     }, {
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         }
        //     });

        //     handleCommentDialogClose();
        //     fetchTasks();
        // } catch (error) {
        //     console.error('Error adding comment:', error.message);
        // }
    };

    return {
        rows,
        selectedRows,
        expandedRow,
        filteredRows,
        setSelectedRows,
        setExpandedRow,
        setFilteredRows,
        fetchTasks,
        deleteTaskById,
        handleStatusChange,
        handleUpdateTask,
        handleAddTask,
        handleAddComment
    };
};

export default useTasks;