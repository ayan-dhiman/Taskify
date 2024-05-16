import { useState } from 'react';

const useTaskDialogs = () => {
    const [open, setOpen] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [updatedTask, setUpdatedTask] = useState('');
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [updateTaskId, setUpdateTaskId] = useState('');
    const [taskToBeUpdated, setTaskToBeUpdated] = useState('');

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCommentClickOpen = () => setOpenCommentDialog(true);
    const handleCommentDialogClose = () => setOpenCommentDialog(false);

    const handleClickOpenUpdatedDialog = () => setOpenUpdateDialog(true);
    const handleUpdateDialogClose = () => setOpenUpdateDialog(false);

    const handleFilterClickOpen = () => setOpenFilterDialog(true);
    const handleFilterDialogClose = () => setOpenFilterDialog(false);

    return {
        open,
        newTask,
        setNewTask,
        openCommentDialog,
        newComment,
        setNewComment,
        openUpdateDialog,
        updatedTask,
        setUpdatedTask,
        openFilterDialog,
        filterDate,
        setFilterDate,
        filterStatus,
        setFilterStatus,
        updateTaskId,
        taskToBeUpdated,
        setTaskToBeUpdated,
        handleClickOpen,
        handleClose,
        handleCommentClickOpen,
        handleCommentDialogClose,
        handleClickOpenUpdatedDialog,
        handleUpdateDialogClose,
        handleFilterClickOpen,
        handleFilterDialogClose
    };
};

export default useTaskDialogs;