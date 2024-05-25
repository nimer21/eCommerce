import React from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import AppDownload from '../components/AppDownload/AppDownload.jsx'
import { Outlet } from 'react-router-dom'


export default function Root() {
  return (
    <>
    <Navbar />
    <Outlet />
    <AppDownload />
    <Footer />
    </>
  )
}
