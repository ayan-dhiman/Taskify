import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Settings from './Components/Settings';
import Login from './Components/Login';
import Register from './Components/Register';
import Alert from './Components/Sub-Components/Alert';
import ForgotPassword from './Components/ForgotPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/settings" element={<Settings/>} />
          </Routes>
        </div>
      </BrowserRouter>
      <Alert/>
    </div>
  );
}

export default App;