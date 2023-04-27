import React from 'react'
import "./Body.css"
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Register } from '../Register/Register'
import { Login } from '../Login/Login'
import { Service } from '../Servicios/Service'
import { UserProfile } from '../Profile/UserProfile'
import { Appointment } from '../Appointment/Appointment'
import { SeeAppointment } from '../SeeAppointment/SeeAppointment'
import { PetRegistration } from '../PetRegistration/PetRegistration'
import { SeePet } from '../SeePet/SeePet'
import { UpdateApp } from '../UpdateApp/UpdateApp'
import { DeleteApp } from '../DeleteApp/DeleteApp'
import { AdmUser } from '../Admin/AdmUser/AdmUser'
import { AdmApp } from '../Admin/AdmApp/AdmApp'
import { DeleteUser } from '../Admin/DeleteUser/DeleteUser'







export const Body = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>
        <Route path='/petRegistration' element={<PetRegistration/>}/>
        <Route path='/appointment/:id' element={<Appointment/>}/>
        <Route path='/seeAppointment/:id' element={<SeeAppointment/>}/>
        <Route path='/seePet' element={<SeePet/>}/>
        <Route path='/updateApp/:id' element={<UpdateApp/>}/>
        <Route path='/deleteApp/:id' element={<DeleteApp/>}/>
        <Route path='/admUser' element={<AdmUser/>}/>
        <Route path='/admApp' element={<AdmApp/>}/>
        <Route path='/deleteUser/:id' element={<DeleteUser/>}/>
      </Routes>
    </>
  )
}


