import React from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import '../../Style/TeamsOverview.scss';

function TeamsOverview() {
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

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeamsOverview