import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { startOfWeek, addDays, format } from 'date-fns';

import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

import ProgressBar from '../Sub-Components/ProgressBar';
import { UseFetchTasks } from '../../Hooks/UseFetchTasks';

import '../../Style/WeakBreakdown.scss';
import { Badge } from '@mui/material';

const WeakBreakdown = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = useSelector(state => state.auth.loggedUser.id);
  const token = useSelector(state => state.auth.token);
  const tasks = useSelector(state => state.tasks.tasks);
  const theme = useSelector(state => state.theme.theme);

  const [tasksByWeek, setTasksByWeek] = useState([]);

  const fetchTasks = UseFetchTasks(apiUrl, userId, token);

  const columns = [
    { field: 'day', label: 'Day' },
    { field: 'date', label: 'Date' },
    { field: 'progressbar', label: 'Progress' },
    { field: 'percentage', label: 'Completion' },
    { field: 'overview', label: 'Status Overview' }
  ];

  const groupTasksByDay = useCallback(() => {
    const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(startOfWeekDate, i);
      return {
        day: format(date, 'EEEE'),
        date: format(date, 'yyyy-MM-dd'),
        tasks: [],
        statusCounts: { ToDo: 0, 'In Progress': 0, Completed: 0 },
        percentage: 0
      };
    });

    tasks.forEach(task => {
      const taskDate = format(new Date(task.date), 'yyyy-MM-dd');
      const dayObj = daysOfWeek.find(day => day.date === taskDate);
      if (dayObj) {
        dayObj.tasks.push(task);
        dayObj.statusCounts[task.status]++;
      }
    });

    daysOfWeek.forEach(day => {
      const totalTasks = day.tasks.length;
      const completedTasks = day.statusCounts.Completed;
      const inProgressTasks = day.statusCounts['In Progress'];
      day.completedPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
      day.inProgressPercentage = totalTasks ? Math.round((inProgressTasks/ totalTasks) * 100) : 0;
    });

    setTasksByWeek(daysOfWeek);
  }, [tasks]);

  const StatusCounts = ({ row }) => {
    return (
      <div>
        <span>{row.statusCounts.ToDo} ToDo</span>
        <span style={{ marginRight: '20px' }}></span>
        <span>{row.statusCounts['In Progress']} In Progress</span>
        <span style={{ marginRight: '20px' }}></span>
        <span>{row.statusCounts.Completed} Completed</span>
      </div>
    );
  };

  useEffect(() => {
    groupTasksByDay();
  }, [tasks, groupTasksByDay]);

  return (
    <div className={`WeakBreakdownWgt ${theme === 'light' ? 'light' : 'dark'}`}>
      <div className="wb-widget-header">
        <span>THIS WEAK BREAKDOWN</span>
        <div className='buttons'>
          <CachedOutlinedIcon className='icon' onClick={fetchTasks} />
        </div>
      </div>
      <div className="wb-widget-body">
        <table className="wb-grid">
          <tbody>
            {tasksByWeek.map((row, rowIndex) => (
              <tr key={rowIndex} className="wb-grid-row">
                {columns.map((column) => (
                  <td key={column.field} id={`td-${column.field}`} className="wb-grid-cell">
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
                    ) : column.field === 'day' ? (
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
                          }
                        }}
                        
                        >
                          {row[column.field]}
                        </Badge>
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
    </div>
  );
};

export default WeakBreakdown;