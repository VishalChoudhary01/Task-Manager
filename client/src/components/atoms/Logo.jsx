import React from 'react'
import logoSvg from '../../assets/logo/logo.svg'
const Logo = () => {
  return (
    <div className='w-full h-full relative'>
        <img src={logoSvg} alt="Leucine logo"  className='absolute w-[5rem] h-[5rem]'/>
    </div>
  )
}

export default Logo