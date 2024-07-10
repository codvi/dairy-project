import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import Signup from './Pages/Signup';
import Dashboard from './Components/Dashboard';





function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;


