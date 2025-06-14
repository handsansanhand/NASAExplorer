import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage'
import './App.css'

function App() {
  return (
    <>
      <Router basename="/NASAExplorer">
        <Routes>
            <Route path="/" element={<Homepage></Homepage>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
