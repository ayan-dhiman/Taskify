import React from 'react'
import '../Style/DashboardStyle.scss';
import logo from '../Assets/taskify.png';
import { Avatar } from '@mui/material';
import DateComponent from './Sub-Components/DateComponet';
import TaskQueue from './Widgets/TaskQueue';
import NotificationCenter from './Widgets/NotificationCenter';
import WeakBreakdown from './Widgets/WeakBreakdown';
import TeamsOverView from './Widgets/TeamsOverview';
import Activity from './Widgets/Activity';
import { useSelector } from 'react-redux';

function Dashboard() {

  const loggedUser = useSelector(state => state.auth.loggedUser.name);

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
