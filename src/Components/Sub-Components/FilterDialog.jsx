import { Button, Chip, Dialog, DialogActions, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import '../../Style/FilterDialog.scss';
import { useSelector } from 'react-redux';

function FilterDialog({ openFilterDialog, handleFilterDialogClose, handleFilter, filterDate, setFilterDate, filterStatus, setFilterStatus, teams, selectedStatus, setSelectedStatus, selectePriority, setSelectedPriority, setSelectedTeams, selectedTeams }) {

    const theme = useSelector(state => state.theme.theme);

    const status = ["Completed", "In Progress", "ToDo"];

    const priority = ["High", "Medium", "Low"];

    const handleStatusSelection = (event) => {
        setSelectedStatus(event.target.value);
    }

    const handlePrioritySelection = (event) => {
        setSelectedPriority(event.target.value);
    }

    const handleTeamsSelection = (event) => {
        setSelectedTeams(event.target.value);
    }

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

                    <div className="date">

                        <select
                            className='select'
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="" disabled>Condition</option>
                            <option value="less">&lt;</option>
                            <option value="equal">=</option>
                            <option value="greater">&gt;</option>
                            <option value="less_equal">&le;</option>
                            <option value="greater_equal">&ge;</option>
                        </select>

                        <input
                            className='input'
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />

                    </div>

                    <Select
                        className='select'
                        size='small'
                        multiple
                        displayEmpty
                        value={selectedStatus}
                        onChange={handleStatusSelection}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <span style={{ color: 'black', fontSize: '14px' }}>Select status</span>;
                            }
                            return (
                                <div>
                                    {selected.map((status) => (
                                        <Chip key={status} label={status} />
                                    ))}
                                </div>
                            );
                        }}
                        sx={{
                            '& .MuiChip-root': {
                                color: theme === 'light' ? 'black' : 'white',
                                fontSize: "12px",
                                backgroundColor: "transparent"
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: theme === 'light' ? '1px solid black !important ' : '1px solid white !important ',
                                borderRadius: "0px"
                            },
                            '.css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
                                color: theme === 'light' ? 'black' : 'white',
                            },
                            '.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root': {
                                fontSize: "12px"
                            }
                        }}
                    >
                        <MenuItem disabled value="">
                            Select status
                        </MenuItem>
                        {status.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        className='select'
                        size='small'
                        multiple
                        displayEmpty
                        value={selectePriority}
                        onChange={handlePrioritySelection}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <span style={{ color: 'black', fontSize: '14px' }}>Select Priority</span>;
                            }
                            return (
                                <div>
                                    {selected.map((priority) => (
                                        <Chip key={priority} label={priority} />
                                    ))}
                                </div>
                            );
                        }}
                        sx={{
                            '& .MuiChip-root': {
                                color: theme === 'light' ? 'black' : 'white',
                                fontSize: "12px",
                                backgroundColor: "transparent"
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: theme === 'light' ? '1px solid black !important ' : '1px solid white !important ',
                                borderRadius: "0px"
                            },
                            '.css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
                                color: theme === 'light' ? 'black' : 'white',
                            },
                            '.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root': {
                                fontSize: "12px"
                            }
                        }}
                    >
                        <MenuItem disabled value="">
                            Select Priority
                        </MenuItem>
                        {priority.map((priority) => (
                            <MenuItem key={priority} value={priority}>
                                {priority}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        className='select'
                        size='small'
                        multiple
                        displayEmpty
                        value={selectedTeams}
                        onChange={handleTeamsSelection}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <span style={{ color: 'black', fontSize: '14px' }}>Select Teams</span>;
                            }
                            return (
                                <div>
                                    {selected.map((teams) => (
                                        <Chip key={teams} label={teams} />
                                    ))}
                                </div>
                            );
                        }}
                        sx={{
                            '& .MuiChip-root': {
                                color: theme === 'light' ? 'black' : 'white',
                                fontSize: "12px",
                                backgroundColor: "transparent"
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: theme === 'light' ? '1px solid black !important ' : '1px solid white !important ',
                                borderRadius: "0px"
                            },
                            '.css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
                                color: theme === 'light' ? 'black' : 'white',
                            },
                            '.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root': {
                                fontSize: "12px"
                            }
                        }}
                    >
                        <MenuItem disabled value="">
                            Select Teams
                        </MenuItem>
                        {teams.map((teams) => (
                            <MenuItem key={teams.name} value={teams.name}>
                                {teams.name}
                            </MenuItem>
                        ))}
                    </Select>


                </div>

            </div>

            <DialogActions className='dialogAction'>
                <Button onClick={handleFilterDialogClose} variant='outlined' className='dialogButton'>Reset</Button>
                <Button onClick={handleFilterDialogClose} variant='outlined' className='dialogButton'>Cancel</Button>
                <Button onClick={handleFilter} className='dialogButton' variant='outlined' >Apply</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FilterDialog