import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import Home from './Pages/Home';
import Login from "./Pages/Login"
import PassRecov from "./Pages/PassRecov"
import Signup from "./Pages/Signup"
import HomePage from "./Pages/HomePage"
import './App.css';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/forgot-password' element={<PassRecov />} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/menus' element={<Home />} />
        <Route path='/superlist' element={<Home />} />
        <Route path='/recipes' element={<Home />} />
        <Route path='/search' element={<Home />} />
        <Route path='/favorites' element={<Home />} />
        <Route path='/configurations' element={<Home />} />
        <Route path='/logout' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
