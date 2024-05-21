import React from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import '../../Style/NotificationCenter.scss';
import { useSelector } from 'react-redux';

function NotificationCenter() {

  const theme = useSelector(state => state.theme.theme);

  return (
    <div className={`NotificationsWgt ${theme === 'light' ? 'light' : 'dark'}`} >
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