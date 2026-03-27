import React from 'react'
import logo from '../../assets/images/logo.jpg'
import { FaUser } from 'react-icons/fa'
const Navbar = () => {
  return (
    <div className='absolute flex items-center justify-between w-full p-10 text-white border-b border-black max-h-12 z-100'>
      <div className='flex items-center gap-3'>
        <div 
          className='h-10 w-10 bg-center rounded-full bg-size-[180%]'
          style={{backgroundImage: `url(${logo})`}}
        >
        </div>
        <h3 className='text-2xl font-extrabold text-amber-500'>Nestly</h3>
      </div>

      <div className='flex justify-between gap-10 text-xl '>
        <div className='px-5 py-1 border cursor-pointer rounded-2xl'>
          <h3>Find Room</h3>
        </div>
        <div className='px-5 py-1 border cursor-pointer rounded-2xl'>
          <h3>List Property</h3>
        </div>
      </div>

      <div className='flex items-center justify-between gap-6'>
        <div className='px-5 py-1 font-semibold transition-all duration-200 ease-in-out cursor-pointer bg-amber-500 rounded-4xl border-3 hover:bg-amber-600'>
          <h3>Get Started</h3>
        </div>
        <button className='hidden p-2 bg-gray-600 rounded-full'>
          <FaUser/>
        </button>
      </div>
    </div>
  )
}

export default Navbar
