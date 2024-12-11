import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Contacts from './components/Contacts';

function App() {
  

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/contact' element={<Contacts/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  
  )
}

export default App
