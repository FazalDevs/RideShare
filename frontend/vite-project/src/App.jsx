import './App.css'
import CarpoolListing from './components/CarpoolListing'
import { Routes, Route, Navigate } from 'react-router-dom'
import CarpoolForm from './components/CarpoolForm'
import React from 'react';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
// import CarpoolLandingPage from './components/LandingPage';
import Navbar from './components/Navbar'
import RideShareLandingPage from './components/LandingPage';
import NavbarLogout from './components/NavbarLogout';
import { useState, useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import MyCarpool from './components/MyCapool';

function App() {
  const token = localStorage.getItem("jwt")
  return (
    <div>
      <div className=''>
        <Routes>
          <Route path="/carpoolform" element={<PrivateRoute><CarpoolForm /></PrivateRoute>} />
          <Route path="/listing" element={<PrivateRoute><CarpoolListing /></PrivateRoute>} />
          <Route path="/listing/mycarpool" element={<PrivateRoute><MyCarpool /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/" element={<RideShareLandingPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
