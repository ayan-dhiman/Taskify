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

                    {/* <TextField
                        label="Filter by Date"
                        type="date"
                        size='small'
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                            style: { color: 'white' }
                        }}
                        fullWidth
                        margin="dense"
                        className='input'
                        style={{ color: 'white' }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                            '&:focus-within .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                  color: 'white',
                                },
                            },
                        }}
                    />
                    <TextField
                        select
                        label="Filter by Status"
                        size='small'
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        InputLabelProps={{
                            style: { color: 'white' }
                        }}
                        fullWidth
                        margin="dense"
                        className='input'
                        style={{ color: 'white' }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                            '&:focus-within .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                  color: 'white',
                                },
                            },
                        }}
                    >
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="ToDo">ToDo</MenuItem>
                    </TextField> */}

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
