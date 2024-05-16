import { useState } from 'react';

const useSnackbar = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleClick = (message) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return {
        openSnackbar,
        snackbarMessage,
        handleClick,
        handleSnackBarClose
    };
};

export default useSnackbar;