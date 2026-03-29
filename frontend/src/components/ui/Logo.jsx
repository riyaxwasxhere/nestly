import React from 'react'
import logo from '../../assets/images/logo.jpg'

function Logo() {
  return (
    <div className='flex items-center gap-3'>
        <div 
          className='h-10 w-10 bg-center rounded-full bg-size-[180%]'
          style={{backgroundImage: `url(${logo})`}}
        >
        </div>
        <h3 className='text-2xl font-extrabold text-amber-500'>Nestly</h3>
      </div>
  )
}

export default Logo
