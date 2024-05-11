import React from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import '../../Style/WeakBreakdown.scss';

function WeakBreakdown() {
  return (
    <div className="WeakBreakdownWgt">
      <div className="widget-header">
        <>WEAK BREAKDOWN</>
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

export default WeakBreakdown