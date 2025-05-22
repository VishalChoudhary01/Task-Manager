import React from 'react'
import Navbar from '../molecules/Navbar'
import Footer from '../molecules/Footer'
import Sidebar from '../molecules/Sidebar'
const MainLayout = ({children}) => {
  return (
    <div className='flex w-full flex-col h-screen'>
        <Navbar/>
        <Sidebar/>
        <main className='grow mt-12'>
        {children}
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout