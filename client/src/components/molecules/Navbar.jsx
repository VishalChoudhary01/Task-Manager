import React from 'react'
import Logo from '../atoms/Logo'
import { NavLink } from 'react-router'
import { navItems } from '../../constants/navitems'
const Navbar = () => {
  return (
    <div className='w-full flex '>
      <Logo/>
      {/* <ul className='flex gap-x-3'>
        {navItems.map((menuItem,idx)=>(
          <NavLink key={idx} to={menuItem.path}>{menuItem.name}</NavLink>
        ))}
      </ul> */}
    </div>
  )
}

export default Navbar