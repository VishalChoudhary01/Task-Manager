import React from 'react';
import logoSvg from '../../assets/logo/logo.svg';

const Logo = () => {
  return (
    <div className='w-full h-full relative flex justify-center items-center'>
        <img src={logoSvg} alt="Leucine logo"  className='absolute w-full max-w-[5rem] h-auto  object-cover' 
        />
    </div>
  );
}

export default Logo;
