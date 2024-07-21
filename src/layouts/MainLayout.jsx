import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = ({user}) => {
  return (
    <>
        <Navbar user={user}/>
        <Outlet />
        <ToastContainer />
    </>
  )
}

export default MainLayout