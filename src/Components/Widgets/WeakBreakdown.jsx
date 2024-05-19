import React, { useEffect, useState } from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import '../../Style/WeakBreakdown.scss';
import ProgressBar from '../Sub-Components/ProgressBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { startOfWeek, addDays, format } from 'date-fns';
import { UseFetchTasks } from '../../Hooks/UseFetchTasks';

function WeakBreakdown() {

  const apiUrl = process.env.REACT_APP_API_URL;

  const userId = useSelector(state => state.auth.loggedUser.id);

  const token = useSelector(state => state.auth.token);

  const tasks = useSelector(state => state.tasks.tasks);

  const theme = useSelector(state => state.theme.theme);

  const [TasksByWeek, setTasksByWeek] = useState([]);

  const fetchTasks = UseFetchTasks(apiUrl, userId, token);

  const columns = [
    { field: 'day' },
    { field: 'date' },
    { field: 'progressbar' },
    { field: 'percentage' },
    { field: 'overview' }
  ];

  const groupTasksByDay = () => {
    const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(startOfWeekDate, i);
      return {
        day: format(date, 'EEEE'),
        date: format(date, 'yyyy-MM-dd'),
        tasks: [],
        statusCounts: {
          ToDo: 0,
          'In Progress': 0,
          Completed: 0
        },
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
  };

  useEffect(() => {
    groupTasksByDay();
  },);

  return (
    <div className={`WeakBreakdownWgt ${theme === 'light' ? 'light' : 'dark'}`} >
      <div className="wb-widget-header">
        <>WEAK BREAKDOWN</>
        <div className='buttons' >
          <CachedOutlinedIcon className='icon' onClick={fetchTasks} />
        </div>
      </div>
      <div className="wb-widget-body">
        <table className="wb-grid">
          <tbody>
            {TasksByWeek.map((row, rowIndex) => (
              <tr key={rowIndex} className="wb-grid-row">
                {columns.map((column) => (
                  <td key={column.field} id={`td-${column.field}`} className="wb-grid-cell">
                    {column.field === 'progressbar' ? (
                      <ProgressBar progress={row.percentage} />
                    ) : column.field === 'overview' ? (
                      `${row.statusCounts.ToDo} ToDo, ${row.statusCounts['In Progress']} In Progress, ${row.statusCounts.Completed} Completed`
                    ) : column.field === 'percentage' ? (
                      `${row[column.field]} %`
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
  )
}

export default WeakBreakdown