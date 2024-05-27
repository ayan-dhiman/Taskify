import React from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Settings from './Components/Settings';
import Login from './Components/Login';
import Register from './Components/Register';
import Alert from './Components/Sub-Components/Alert';
import ForgotPassword from './Components/ForgotPassword';
import { useSelector } from 'react-redux';
import SecurityAlert from './Components/SecurityAlert';

function App() {

  const isAuthenticated = useSelector(state => state.auth.token !== null);

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {isAuthenticated ? (
              <Route path="/dashboard" element={<Dashboard />} />
            ) : (
              <Route path="/dashboard" element={<SecurityAlert />} />
            )}
            {/* <ProtectedRoute path="/dashboard" element={<Dashboard/>} /> */}
            {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
            {/* <Route path="/settings" element={<Settings/>} /> */}
          </Routes>
        </div>
      </BrowserRouter>
      <Alert />
    </div>
  );
}

export default App;