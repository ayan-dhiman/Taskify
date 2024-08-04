import React, { useEffect } from 'react';
import { Dialog, DialogActions, Button, Select, MenuItem, Chip } from '@mui/material';
import '../../Style/DeleteTeamDialog.scss';
import { useSelector } from 'react-redux';

function AddTeamDialog({ openDeleteTeamDialog, handleDeleteTeamDialogClose, handleDeleteTeams, selectedTeams, setSelectedTeams, teams }) {

    const theme = useSelector(state => state.theme.theme);

    const handleTeamSelection = (event) => {
        setSelectedTeams(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            //handleDeleteTeams();
        }
        if (event.key === 'Escape' ) {
            handleDeleteTeamDialogClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedTeams]);

    return (
        <Dialog
            open={openDeleteTeamDialog}
            onClose={handleDeleteTeamDialogClose}
            className={`deleteTeamDilogContainer ${theme === 'light' ? 'light' : 'dark'}`}
        >
            <div className='addCommentDilog' >
                <div className='dialogTitle'>
                    DELETE TEAM/GROUP
                </div>

                <div className="dialogBody">
                    <p>
                        Once you have entered the new team/group name, click the "Add Team" button to create the Team/Group and add it with other Teams/Groups.
                    </p>

                    <Select
                        className='select'
                        size='small'
                        multiple
                        value={selectedTeams}
                        onChange={handleTeamSelection}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((teamId) => (
                                    <Chip key={teamId} label={teams.find(team => team.teamId === teamId)?.name} />
                                ))}
                            </div>
                        )}
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
                        {teams.map((team) => (
                            <MenuItem key={team.teamId} value={team.teamId}>
                                {team.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>

            <DialogActions className='dialogAction'>
                <Button variant="outlined" autoFocus onClick={handleDeleteTeamDialogClose} className='dialogButton' >
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleDeleteTeams} className='dialogButton' >Delete Teams/Groups</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddTeamDialog;