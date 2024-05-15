import React, { useContext, useState } from 'react'
import '../Style/DashboardStyle.scss';
import logo from '../Assets/taskify.png';
import { Avatar, Menu, MenuItem } from '@mui/material';
import DateComponent from './Sub-Components/DateComponet';
import TaskQueue from './Widgets/TaskQueue';
import NotificationCenter from './Widgets/NotificationCenter';
import WeakBreakdown from './Widgets/WeakBreakdown';
import TeamsOverView from './Widgets/TeamsOverview';
import Activity from './Widgets/Activity';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import '../Style/Variables.scss';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';

function Dashboard() {

  const loggedUser = useSelector(state => state.auth.loggedUser.name);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleLogout = () => {
    navigate('/login');
  }

  const toggleTheme = () => {
    
  };

  return (
    <div className='dashboardContainer' >

      <div className="dashboardHeader">

        <div className="topBar">

          <div className="appName">

            {/* <img src={logo} alt="DSM Task Tracker" className='logo' /> */}

            <p>Taskify</p>

          </div>

          <DateComponent />

          <div className="loggedUser">

            <p>Hi {loggedUser} !</p>
            <KeyboardArrowDownOutlinedIcon onClick={handleMenu} className='menuIcon' />

            {isMenuOpen && (
              <div className="dropdown-menu">
                
                <div className="menu-item" onClick={handleLogout}>Logout</div>
                
              </div>
            )}

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                '& .MuiMenu-paper': {
                  //backgroundColor: 'white',
                  //color: 'black',
                  //width: 'auto',
                  marginTop: '10px',
                  padding: '0px 5px',
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem
                onClick={toggleTheme}
                sx={{
                  fontSize: '14px', // Font size
                  height: '10px', // Height
                  padding:'10px',
                  margin: '5px 0px',
                  fontFamily: 'Raleway',
                  gap: '10px'
                }}
              >
                <ContrastOutlinedIcon className='MenuItemIcon' />Theme
              </MenuItem>
              <MenuItem
                //onClick={handleLogout}
                sx={{
                  fontSize: '14px', // Font size
                  height: '10px', // Height
                  padding:'10px',
                  margin: '5px 0px',
                  fontFamily: 'Raleway',
                  gap: '10px'
                }}
              >
                <AccountBoxOutlinedIcon className='MenuItemIcon' />Account
              </MenuItem>
              <MenuItem
                //onClick={handleLogout}
                sx={{
                  fontSize: '14px', // Font size
                  height: '10px', // Height
                  padding:'10px',
                  margin: '5px 0px',
                  fontFamily: 'Raleway',
                  gap: '10px'
                }}
              >
                <SettingsOutlinedIcon className='MenuItemIcon' /> Settings
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{
                  fontSize: '14px',
                  height: '10px',
                  padding:'10px',
                  fontFamily: 'Raleway',
                  margin: '5px 0px',
                  gap: '10px',
                  '&:hover': {
                    backgroundColor: 'red'
                  },
                }}
              >
                <ExitToAppOutlinedIcon className='MenuItemIcon' /> Logout
              </MenuItem>
            </Menu>

            {/* <DragHandleOutlinedIcon  className='menuIcon'/> */}

            {/* <Avatar alt="A" src='' className='avatar' /> */}

          </div>

        </div>

      </div>

      <div className="dashboardBody">

        <div className="widgetRow">

          <TaskQueue />

          <NotificationCenter />

        </div>

        <div className="widgetRow">

          <WeakBreakdown />

          <TeamsOverView />

          <Activity />

        </div>

      </div>

    </div>
  )
}

export default Dashboard
