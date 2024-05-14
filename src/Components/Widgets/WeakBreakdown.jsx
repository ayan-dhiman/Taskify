import React, { useState } from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import '../../Style/WeakBreakdown.scss';
import ProgressBar from '../Sub-Components/ProgressBar';

function WeakBreakdown() {

  const [rows, setRows] = useState([
    {
      day: 'Mon',
      date: '2024-05-11',
      percentage: '10%',
      status: '4 completed, 1 in progress and 2 ToDo'
    },
    {
      day: 'Tue',
      date: '2024-05-12',
      percentage: '20%',
      status: '4 completed, 1 in progress and 2 ToDo'
    },
    {
      day: 'Wed',
      date: '2024-05-13',
      percentage: '30%',
      status: '4 completed, 1 in progress and 2 ToDo'
    },
    {
      day: 'Thu',
      date: '2024-05-14',
      percentage: '40%',
      status: '4 completed, 1 in progress and 2 ToDo'
    },
    {
      day: 'Fri',
      date: '2024-05-15',
      percentage: '50%',
      status: '4 completed, 1 in progress and 2 ToDo'
    },
    {
      day: 'Sat',
      date: '2024-05-16',
      percentage: '60%',
      status: '4 completed, 1 in progress and 2 ToDo'
    },
    {
      day: 'Sun',
      date: '2024-05-17',
      percentage: '70%',
      status: '4 completed, 1 in progress and 2 ToDo'
    }
  ]);

  const columns = [
    { field: 'day' },
    { field: 'date' },
    { field: 'progressbar' },
    { field: 'percentage' },
    { field: 'status' }
  ];

  return (
    <div className="WeakBreakdownWgt">
      <div className="wb-widget-header">
        <>WEAK BREAKDOWN</>
        <div className='buttons' >
          <CachedOutlinedIcon className='icon' />
        </div>
      </div>
      <div className="wb-widget-body">
        <table className="wb-grid">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={"wb-grid-row"}
              >
                {columns.map((column) => (
                  <td  key={column.field} id={`td-${column.field}`} className="wb-grid-cell">
                    {column.field === 'progressbar' ? (
                      <ProgressBar progress={row.percentage} />
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