import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Componant/Dashboard'
import Page404 from './Componant/Page404'
import Edit from './Componant/Edit.jsx'
import Register from './Componant/Register'
import Header from './Componant/Header'
import Detailes from './Componant/Detailes.jsx';


function App() { 
  return (
    <>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Dashboard></Dashboard>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>
        <Route path='/view/:id' element={<Detailes></Detailes>}></Route>
        <Route path='*' element={<Page404></Page404>}></Route>
      </Routes>
    </>
  )
}

export default App
