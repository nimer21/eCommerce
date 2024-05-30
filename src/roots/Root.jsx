import React from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import AppDownload from '../components/AppDownload/AppDownload.jsx'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Login from '../pages/Login/Login.jsx'


export default function Root() {
  const [showLogin,setShowLogin] = useState(false);
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <Navbar setShowLogin={setShowLogin}/>
    <Outlet />
    <AppDownload />
    <Footer />
    </>
  )
}
