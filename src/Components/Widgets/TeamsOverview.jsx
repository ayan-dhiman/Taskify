import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

import { UseFetchTasks } from '../../Hooks/UseFetchTasks';
import { UseAddTeam } from '../../Hooks/UseAddTeam';
import ProgressBar from '../Sub-Components/ProgressBar';
import AddTeamDialog from '../Sub-Components/AddTeamDilog';

import '../../Style/TeamsOverview.scss';

const TeamsOverview = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = useSelector(state => state.auth.loggedUser.id);
  const token = useSelector(state => state.auth.token);
  const tasks = useSelector(state => state.tasks.tasks);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  const [tasksByTeam, setTasksByTeam] = useState([]);
  const [openAddTeamDialog, setOpenAddTeamDialog] = useState(false);
  const [newTeam, setNewTeam] = useState('');

  const fetchTasks = UseFetchTasks(apiUrl, userId, token);
  const addTeam = UseAddTeam(apiUrl, userId, token);

  const handleAddTeamDialogClose = useCallback(() => {
    setOpenAddTeamDialog(false);
    dispatch({ type: 'SET_OPEN', payload: false });
  }, [dispatch]);

  const handleAddTeamDialogOpen = () => {
    setOpenAddTeamDialog(true);
  };

  const handleFetchTasks = () => {
    fetchTasks();
  }

  const groupTasksByTeam = useCallback(() => {
    const teams = tasks.reduce((acc, task) => {
      if (!acc[task.team]) {
        acc[task.team] = {
          team: task.team,
          tasks: [],
          statusCounts: { ToDo: 0, 'In Progress': 0, Completed: 0 },
          percentage: 0,
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
      team.percentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
    });

    setTasksByTeam(Object.values(teams));
  }, [tasks]);

  const handleAddTeam = () => {
    addTeam(newTeam);
    setOpenAddTeamDialog(false);
  };

  useEffect(() => {
    groupTasksByTeam();
  }, [tasks, groupTasksByTeam]);

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
          <Button variant="outlined" className='addButton' onClick={handleAddTeamDialogOpen}>Add</Button>
          <CachedOutlinedIcon className='icon' onClick={handleFetchTasks} />
        </div>
      </div>
      <div className="widget-body">
        <table className="grid">
          <tbody>
            {tasksByTeam.map((row, rowIndex) => (
              <tr key={rowIndex} className="grid-row">
                {columns.map((column) => (
                  <td key={column.field} className="grid-cell">
                    {column.field === 'progressbar' ? (
                      <ProgressBar progress={row.percentage} />
                    ) : column.field === 'overview' ? (
                      `${row.statusCounts.ToDo} ToDo, ${row.statusCounts['In Progress']} In Progress, ${row.statusCounts.Completed} Completed`
                    ) : column.field === 'percentage' ? (
                      `${row[column.field]}%`
                    ) : (
                      row[column.field]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddTeamDialog
        openAddTeamDialog={openAddTeamDialog}
        handleAddTeamDialogClose={handleAddTeamDialogClose}
        handleAddTeam={handleAddTeam}
        newTeam={newTeam}
        setNewTeam={setNewTeam}
      />
    </div>
  );
};

export default TeamsOverview;