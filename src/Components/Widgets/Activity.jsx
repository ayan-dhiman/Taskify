import React from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import '../../Style/Activity.scss';

function Activity() {
  return (
    <div className="ActivityWgt">
      <div className="widget-header">
        <>Activity</>
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

export default Activity