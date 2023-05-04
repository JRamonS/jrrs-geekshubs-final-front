import React from 'react'
import "./Body.css"
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Register } from '../Register/Register'
import { Login } from '../Login/Login'
import { UserProfile } from '../Profile/UserProfile'
import { Appointment } from '../User/Appointment/Appointment'
import { SeeAppointment } from '../User/SeeAppointment/SeeAppointment'
import { PetRegistration } from '../User/PetRegistration/PetRegistration'
import { SeePet } from '../User/SeePet/SeePet'
import { UpdateApp } from '../User/UpdateApp/UpdateApp'
import { DeleteApp } from '../User/DeleteApp/DeleteApp'
import { AdmUser } from '../Admin/AdmUser/AdmUser'
import { AdmApp } from '../Admin/AdmApp/AdmApp'
import { DeleteUser } from '../Admin/DeleteUser/DeleteUser'
import { Services } from '../Servis/Services'



export const Body = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>
        <Route path='/petRegistration' element={<PetRegistration/>}/>
        <Route path='/appointment' element={<Appointment/>}/>
        <Route path='/seeAppointment' element={<SeeAppointment/>}/>
        <Route path='/seePet' element={<SeePet/>}/>
        <Route path='/updateApp' element={<UpdateApp/>}/>
        <Route path='/deleteApp' element={<DeleteApp/>}/>
        <Route path='/admUser' element={<AdmUser/>}/>
        <Route path='/admApp' element={<AdmApp/>}/>
        <Route path='/deleteUser/:id' element={<DeleteUser/>}/>
      </Routes>
    </>
  )
};


