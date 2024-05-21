import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { startOfWeek, addDays, format } from 'date-fns';

import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

import ProgressBar from '../Sub-Components/ProgressBar';
import { UseFetchTasks } from '../../Hooks/UseFetchTasks';

import '../../Style/WeakBreakdown.scss';

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
      day.percentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
    });

    setTasksByWeek(daysOfWeek);
  }, [tasks]);

  useEffect(() => {
    groupTasksByDay();
  }, [tasks, groupTasksByDay]);

  return (
    <div className={`WeakBreakdownWgt ${theme === 'light' ? 'light' : 'dark'}`}>
      <div className="wb-widget-header">
        <span>WEAK BREAKDOWN</span>
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
    </div>
  );
};

export default WeakBreakdown;