import { Button, Dialog, DialogActions } from '@mui/material';
import React from 'react';
import '../../Style/FilterDialog.scss';
import { useSelector } from 'react-redux';

function FilterDialog({ openFilterDialog, handleFilterDialogClose, handleFilter, filterDate, setFilterDate, filterStatus, setFilterStatus }) {

    const theme = useSelector(state => state.theme.theme);

    return (
        <Dialog open={openFilterDialog} onClose={handleFilterDialogClose} className={`filterDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}>

            <div className='filterDilog' >
                <div className='dialogTitle'>
                    FILTER
                </div>

                <div className="dialogBody">

                    <p>
                        Once you have entered the filter details, click the "Apply" button to apply the filter to the task queue.
                    </p>

                    <input
                        className='input'
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />

                    <select
                        className='select'
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="" disabled>Select Status </option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="ToDo">ToDo</option>
                    </select>


                </div>

            </div>

            <DialogActions className='dialogAction'>
                <Button onClick={handleFilterDialogClose} variant='outlined' className='dialogButton'>Cancel</Button>
                <Button onClick={handleFilter} className='dialogButton' variant='outlined' >Apply</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FilterDialog