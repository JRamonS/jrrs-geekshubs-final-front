import React from 'react'
import "./Body.css"
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Register } from '../Register/Register'
import { Login } from '../Login/Login'
import { Service } from '../Servicios/Service'
import { UserProfile } from '../Profile/UserProfile'


export const Body = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>
      </Routes>
    </>
  )
}


