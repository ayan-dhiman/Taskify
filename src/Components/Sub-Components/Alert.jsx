import { Snackbar, SnackbarContent } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Alert() {

    const dispatch = useDispatch();
    const open = useSelector(state => state.alert.open);
    const message = useSelector(state => state.alert.message);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: 'SET_OPEN', payload: false });
    };

    return (
        <Snackbar className='snackbar'
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={5000}
            onClose={handleClose}>
            <SnackbarContent
                style={{
                    fontSize: '12px',
                    fontFamily: 'Raleway',
                    minWidth: 'fit-content'
                }}
                message={message}
            />
        </Snackbar>

    )
}

export default Alert
