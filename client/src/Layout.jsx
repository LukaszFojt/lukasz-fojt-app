import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'

const Layout = () => {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout