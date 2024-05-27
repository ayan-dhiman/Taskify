import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import DateComponent from './Sub-Components/DateComponet';
import TaskQueue from './Widgets/TaskQueue';
import NotificationCenter from './Widgets/NotificationCenter';
import WeakBreakdown from './Widgets/WeakBreakdown';
import TeamsOverView from './Widgets/TeamsOverview';
import Activity from './Widgets/Activity';

import { Menu, MenuItem, LinearProgress } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';

import '../Style/DashboardStyle.scss';
import Account from './Sub-Components/Account';
import SecurityPassword from './Sub-Components/SecurityPassword';

function Dashboard() {
  const loggedUser = useSelector(state => state.auth.loggedUser.name);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);
  const [openAccountDilog, setOpenAccountDilog] = useState(false);
  const [openSecurityDilog, setOpenSecurityDilog] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch({ type: 'SET_TOKEN', payload: null });
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/login');
  };

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME' });
  };

  return (
    <div className={`dashboardContainer ${theme === 'light' ? 'light' : 'dark'}`}>
      <div className="dashboardHeader" style={{
        borderTop: loading ? 'none' : `4px solid ${theme === 'light' ? '#2a91eb' : '#5a4c8d'}`,
        paddingTop: loading ? '5px' : '1px',
      }}>
        {loading && <LinearProgress className='lProgress' sx={{
          '.MuiLinearProgress-bar1': {
            backgroundColor: theme === 'light' ? '#2a91eb' : '#5a4c8d',
          },
          '.MuiLinearProgress-bar2': {
            backgroundColor: theme === 'light' ? '#2a91eb' : '#5a4c8d',
          }
        }} />}
        <div className="topBar">
          <div className="appName">
            <p>Taskify</p>
          </div>
          <DateComponent />
          <div className="loggedUser">
            <p>Hi {loggedUser}!</p>
            <KeyboardArrowDownOutlinedIcon onClick={handleMenuOpen} className='menuIcon' />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              sx={{ '& .MuiMenu-paper': { marginTop: '10px', padding: '0px 5px' }}}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={toggleTheme} sx={menuItemStyle}>
                <ContrastOutlinedIcon className='MenuItemIcon' />
                {theme === 'light' ? 'Dark' : 'Light'}
              </MenuItem>
              <MenuItem onClick={() => {
                setOpenAccountDilog(true);
                handleMenuClose();
                }} sx={menuItemStyle}>
                <AccountBoxOutlinedIcon className='MenuItemIcon' />
                Account
              </MenuItem>
              <MenuItem onClick={() => {
                setOpenSecurityDilog(true);
                handleMenuClose();
                }} sx={menuItemStyle}>
                <SettingsOutlinedIcon className='MenuItemIcon' />
                Security
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ ...menuItemStyle, '&:hover': { backgroundColor: '#ff000019' } }}>
                <ExitToAppOutlinedIcon className='MenuItemIcon' />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div className="dashboardBody">
        <div className="widgetRow">
          <TaskQueue loading={loading} setLoading={setLoading} />
          {/* <NotificationCenter /> */}
        </div>
        <div className="widgetRow">
          <WeakBreakdown />
          <TeamsOverView />
          <Activity />
        </div>
      </div>

      <Account
        openAccountDialog={openAccountDilog}
        setOpenAccountDilog={setOpenAccountDilog}
      />

      <SecurityPassword 
        openSecurityDialog={openSecurityDilog}
        setOpenSecurityDilog={setOpenSecurityDilog}
      />

    </div>
  );
}

const menuItemStyle = {
  fontSize: '14px',
  height: '10px',
  padding: '10px',
  margin: '5px 0px',
  fontFamily: 'Raleway',
  gap: '10px',
};

export default Dashboard;