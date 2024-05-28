import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Badge, Button, Tooltip } from '@mui/material';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

import { UseFetchTasks } from '../../Hooks/UseFetchTasks';
import { UseAddTeam } from '../../Hooks/UseAddTeam';
import ProgressBar from '../Sub-Components/ProgressBar';
import AddTeamDialog from '../Sub-Components/AddTeamDilog';
import DeleteTeamDialog from '../Sub-Components/DeleteTeamDialog';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';

import '../../Style/TeamsOverview.scss';
import { UseDeleteTeam } from '../../Hooks/UseDeleteTeam';

const TeamsOverview = () => {

  const userId = useSelector(state => state.auth.loggedUser.id);
  const tasks = useSelector(state => state.tasks.tasks);
  const theme = useSelector(state => state.theme.theme);
  const teams = useSelector(state => state.tasks.teams);

  const dispatch = useDispatch();

  const [tasksByTeam, setTasksByTeam] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const alert = (message) => {
    dispatch({ type: 'SET_OPEN', payload: true });
    dispatch({ type: 'SET_MESSAGE', payload: message });
  };

  //const [openAddTeamDialog, setOpenAddTeamDialog] = useState(false);

  //const [newTeam, setNewTeam] = useState('');

  const [openDeleteTeamDialog, setOpenDeleteTeamDialog] = useState(false);

  const [selectedTeams, setSelectedTeams] = useState([]);

  const fetchTasks = UseFetchTasks();

  const deleteTeam = UseDeleteTeam();

  const handleDeleteTeamDialogClose = useCallback(() => {
    setOpenDeleteTeamDialog(false);
    dispatch({ type: 'SET_OPEN', payload: false });
  }, [dispatch]);

  const handleDeleteTeamDialogOpen = () => {
    setOpenDeleteTeamDialog(true);
  };

  const handleFetchTasks = async () => {

    try {
      await fetchTasks();
    } catch (error) {
      handleLoginError(error);
    }

  }

  const handleLoginError = (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        alert('Unauthorized: Please enter a valid email and password.');
      } else {
        alert('An error occurred while processing your request. Please try again later.');
      }
    } else if (error.request) {
      alert('Network Error: Please check your internet connection.');
    } else {
      alert('An error occurred. Please try again later.');
    }
  };

  const groupTasksByTeam = useCallback(() => {
    const teams = tasks.reduce((acc, task) => {
      if (!acc[task.team]) {
        acc[task.team] = {
          team: task.team,
          tasks: [],
          statusCounts: { ToDo: 0, 'In Progress': 0, Completed: 0 },
          completedPercentage: 0,
          inProgressPercentage: 0,
        };
      }
      acc[task.team].tasks.push(task);
      acc[task.team].statusCounts[task.status]++;
      return acc;
    }, {});

    Object.keys(teams).forEach(teamKey => {
      const team = teams[teamKey];
      const totalTasks = team.tasks.length;
      const completedTasks = team.statusCounts.Completed;
      const inProgressTasks = team.statusCounts['In Progress'];
      team.completedPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
      team.inProgressPercentage = totalTasks ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
    });
    setTasksByTeam(Object.values(teams));
  }, [tasks, tasksByTeam]);


  const validateDeletingTeams = () => {

    const selectedTeamsByName = selectedTeams.map(selectedTeamId => {

      const teamObject = teams.find(team => team.teamId === selectedTeamId);

      return teamObject ? teamObject.name : null;

    }).filter(teamName => teamName);

    const hasTasks = selectedTeamsByName.some(teamName => tasks.some(task => task.team === teamName));

    if (hasTasks) {
      alert(`Can't delete the following teams because they are assigned to one or more tasks: ${selectedTeamsByName.join(', ')}`);
      return false;
    }

    return true;
  };

  const handleDeleteTeam = async () => {

    if (validateDeletingTeams()) {

      try {
        await deleteTeam(selectedTeams);
      } catch (error) {
        handleLoginError(error);
      } finally {
        setOpenDeleteTeamDialog(false);
      }

    }

  };

  const sortTasksByPercentage = () => {
    const sortedTasks = [...tasksByTeam].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.completedPercentage - b.completedPercentage
        : b.completedPercentage - a.completedPercentage;
    });
    setTasksByTeam(sortedTasks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    groupTasksByTeam();
  }, [tasks]);

  const columns = [
    { field: 'team', label: 'Team' },
    { field: 'percentage', label: 'Completion' },
    { field: 'progressbar', label: 'Progress' },
    { field: 'overview', label: 'Status Overview' },
  ];

  return (
    <div className={`TeamOverviewWgt ${theme === 'light' ? 'light' : 'dark'}`}>
      <div className="widget-header">
        <span>TEAM / GROUP OVERVIEW</span>
        <div className='buttons'>
          {/* <Button variant="outlined" className='addButton' onClick={handleAddTeamDialogOpen}>Create</Button> */}
          <Button variant="outlined" className='addButton' onClick={handleDeleteTeamDialogOpen}>DELETE TEAMS / GROUP</Button>
          <ImportExportOutlinedIcon className='icon' onClick={sortTasksByPercentage} />
          <CachedOutlinedIcon className='icon' onClick={handleFetchTasks} />
        </div>
      </div>
      <div className="widget-body">
        <table className="grid">
          <tbody>
            {tasksByTeam.map((row, rowIndex) => (
              <tr key={rowIndex} className="grid-row">
                {columns.map((column) => (
                  <td key={column.field} id={`td-${column.field}`} className="grid-cell">
                    {column.field === 'progressbar' ? (
                      <ProgressBar completedProgress={row.completedPercentage} inProgressProgress={row.inProgressPercentage} />
                    ) : column.field === 'overview' ? (
                      //`${row.statusCounts.ToDo} ToDo, ${row.statusCounts['In Progress']} In Progress, ${row.statusCounts.Completed} Completed`
                      <>
                        <span>{row.statusCounts.ToDo} ToDo</span>
                        <span style={{ marginRight: '20px' }}></span>
                        <span>{row.statusCounts['In Progress']} In Progress</span>
                        <span style={{ marginRight: '20px' }}></span>
                        <span>{row.statusCounts.Completed} Completed</span>
                      </>
                    ) : column.field === 'percentage' ? (
                      `${row.completedPercentage}%`
                    ) : (
                      <Tooltip title={row[column.field]}>

                        <Badge

                          badgeContent={row.statusCounts.ToDo + row.statusCounts['In Progress']}
                          color="error"
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}

                          sx={{
                            '.css-wurjig-MuiBadge-badge': {
                              minWidth: "15px",
                              height: "15px",
                              backgroundColor: "#d21919b0",
                              fontSize: "8px",
                              top: "-2px",
                              left: "1px"
                            },
                            '.css-1gml0a9': {
                              minWidth: "15px",
                              height: "15px",
                              backgroundColor: "#d21919b0",
                              fontSize: "8px",
                              top: "-2px",
                              left: "1px"
                            }

                          }}

                        >
                          {row[column.field]}
                        </Badge>

                      </Tooltip>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <AddTeamDialog
        openAddTeamDialog={openAddTeamDialog}
        handleAddTeamDialogClose={handleAddTeamDialogClose}
        handleAddTeam={handleAddTeam}
        newTeam={newTeam}
        setNewTeam={setNewTeam}
      /> */}
      <DeleteTeamDialog
        openDeleteTeamDialog={openDeleteTeamDialog}
        handleDeleteTeamDialogClose={handleDeleteTeamDialogClose}
        handleDeleteTeams={handleDeleteTeam}
        selectedTeams={selectedTeams}
        setSelectedTeams={setSelectedTeams}
        teams={teams}
      />
    </div>
  );
};

export default TeamsOverview;