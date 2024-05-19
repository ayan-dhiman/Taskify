import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

import ProgressBar from '../Sub-Components/ProgressBar';

import '../../Style/TeamsOverview.scss';
import { UseFetchTasks } from '../../Hooks/UseFetchTasks';

function TeamsOverview() {

  const apiUrl = process.env.REACT_APP_API_URL;

  const userId = useSelector(state => state.auth.loggedUser.id);

  const token = useSelector(state => state.auth.token);

  const tasks = useSelector(state => state.tasks.tasks);

  const theme = useSelector(state => state.theme.theme);

  const [TasksByTeam, setTasksByTeam] = useState([]);

  const fetchTasks = UseFetchTasks(apiUrl, userId, token);

  const columns = [
    { field: 'team' },
    { field: 'percentage' },
    { field: 'progressbar' },
    { field: 'overview' }
  ];

  const groupTasksByTeam = () => {
    const teams = {};

    tasks.forEach(task => {
      if (!teams[task.team]) {
        teams[task.team] = {
          team: task.team,
          tasks: [],
          statusCounts: {
            ToDo: 0,
            'In Progress': 0,
            Completed: 0
          },
          percentage: 0
        };
      }
      teams[task.team].tasks.push(task);
      teams[task.team].statusCounts[task.status]++;
    });

    Object.keys(teams).forEach(teamKey => {
      const team = teams[teamKey];
      const totalTasks = team.tasks.length;
      const completedTasks = team.statusCounts.Completed;
      team.percentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
    });

    setTasksByTeam(Object.values(teams));

  };

  useEffect(() => {
    groupTasksByTeam();
  }, );

  return (
    <div className={`TeamOverviewWgt ${theme === 'light' ? 'light' : 'dark'}`}>
      <div className="widget-header">
        <>TEAM / GROUP OVERVIEW</>
        <div className='buttons' >
          <CachedOutlinedIcon className='icon' onClick={fetchTasks} />
        </div>
      </div>
      <div className="widget-body">
        <table className="grid">
          <tbody>
          {TasksByTeam.map((row, rowIndex) => (
              <tr key={rowIndex} className="grid-row">
                {columns.map((column) => (
                  <td key={column.field} id={`td-${column.field}`} className="grid-cell">
                    {column.field === 'progressbar' ? (
                      <ProgressBar progress={row.percentage} />
                    ) : column.field === 'overview' ? (
                      `${row.statusCounts.ToDo} ToDo, ${row.statusCounts['In Progress']} In Progress, ${row.statusCounts.Completed} Completed`
                    ) : column.field === 'percentage' ? (
                      `${row[column.field]} %`
                    ): (
                      row[column.field]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeamsOverview