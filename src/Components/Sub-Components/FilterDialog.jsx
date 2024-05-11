import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import React from 'react';
import '../../Style/FilterDialog.scss';

function FilterDialog({ openFilterDialog, handleFilterDialogClose, handleFilter, filterDate, setFilterDate, filterStatus, setFilterStatus }) {
    return (
        <Dialog open={openFilterDialog} onClose={handleFilterDialogClose} className='filterDilogContainer'>

            <div className='filterDilog' >
                <div className='dialogTitle'>
                    FILTER
                </div>

                <div className="dialogBody">

                    <p>
                        Once you have entered the filter details, click the "Apply" button to apply the filter to the task queue.
                    </p>

                    <TextField
                        label="Filter by Date"
                        type="date"
                        size='small'
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        margin="dense"
                        className='input'
                    />
                    <TextField
                        select
                        label="Filter by Status"
                        size='small'
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        fullWidth
                        margin="dense"
                        className='input'
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="ToDo">ToDo</MenuItem>
                    </TextField>

                </div>

            </div>

            <DialogActions>
                <Button onClick={handleFilterDialogClose} className='dialogButton'>Cancel</Button>
                <Button onClick={handleFilter} className='dialogButton' >Apply</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FilterDialog
