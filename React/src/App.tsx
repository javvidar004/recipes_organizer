import { useState } from 'react'
import React from 'react';
import Navbar from './components/Navbar';
import './App.css'





function App() {
  const [state, setState] = useState(0);
  return (
    <>
      <div>
        <Navbar state={state} setState={setState} />
      </div>
    </>
  )
}

export default App
