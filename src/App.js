import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Settings from './Components/Settings';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/settings" element={<Settings/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;