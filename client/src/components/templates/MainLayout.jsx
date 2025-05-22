import React,{useState} from 'react'
import Navbar from '../molecules/Navbar'
import Footer from '../molecules/Footer'
import Sidebar from '../molecules/Sidebar'
const MainLayout = ({children}) => {
  const [sideMenuOpen,setSideMenuOpen]=useState(false);

  const handleSideMenu=()=>{
    setSideMenuOpen((prevState)=>!prevState)
  }
  return (
    <div className='flex w-full flex-col h-screen bg-background dark:bg-dark-background duration-700 transition-all' >
        <Navbar isOpen={sideMenuOpen} handleOpen={handleSideMenu}/>
        <Sidebar isOpen={sideMenuOpen} handleOpen={handleSideMenu}/>
        <main className='grow mt-18'>
        {children}
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout