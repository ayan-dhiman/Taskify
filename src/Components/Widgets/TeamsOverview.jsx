import React, { useState } from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import '../../Style/TeamsOverview.scss';
import ProgressBar from '../Sub-Components/ProgressBar';

function TeamsOverview() {

  const [rows, setRows] = useState([
    {
      team: 'Team-a',
      percentage: '10%',
      status: '4 completed, 1 in progress and 2 ToDo'
    },
    {
      team: 'Team-b',
      percentage: '80%',
      status: '4 completed, 1 in progress and 2 ToDo'
    },
    {
      team: 'Team-c',
      percentage: '30%',
      status: '4 completed, 1 in progress and 2 ToDo'
    }
  ]);

  const columns = [
    { field: 'team' },
    { field: 'percentage' },
    { field: 'progressbar' },
    { field: 'status' }
  ];


  return (
    <div className="TeamOverviewWgt">
      <div className="widget-header">
        <>TEAM OVERVIEW</>
        <div className='buttons' >
          <CachedOutlinedIcon className='icon' />
        </div> 
      </div>
      <div className="widget-body">
        <table className="grid">
          <tbody>
          {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={"grid-row"}
              >
                {columns.map((column) => (
                  <td  key={column.field} id={`td-${column.field}`} className="grid-cell">
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

export default TeamsOverview