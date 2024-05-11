import React from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import '../../Style/NotificationCenter.scss';

function NotificationCenter() {
  return (
    <div className="NotificationsWgt">
      <div className="widget-header">
        <>NOTIFICATION CENTER</>
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

export default NotificationCenter