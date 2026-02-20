import React from 'react'
import './App.css'
import Products from './components/Products'
import Paints from './components/Paints'
import Sanitary from './components/Sanitary'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
   <>
   {/* <Products/> */}
   {/* <Paints/> */}
   {/* <Sanitary/> */}
   <Routes>
    <Route path='/' element={<Products/>}/>
    <Route path='/paints' element={<Paints/>}/>
    <Route path='/sanitary' element={<Sanitary/>}/>
   </Routes>
   
   </>
  )
}

export default App
