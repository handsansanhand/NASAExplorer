import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage'
import './App.css'
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';

function App() {
  return (
    <>
    <div className='main-content'>
       <Router basename="/NASAExplorer">
        <Header></Header>
        <Routes>
            <Route path="/" element={<Homepage></Homepage>}></Route>
        </Routes>
           
      </Router>
    </div>
  <Footer></Footer>
    </>
  )
}

export default App
