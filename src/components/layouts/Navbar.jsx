import React from 'react'
import logo from '../../assets/images/logo.jpg'
import { FaUser } from 'react-icons/fa'
const Navbar = () => {
  return (
    <div className='absolute p-10 max-h-12 text-white z-100 w-dvw flex items-center justify-between border-b border-black'>
      <div className='flex items-center gap-3'>
        <div 
          className='h-10 w-10 bg-center rounded-full bg-size-[180%]'
          style={{backgroundImage: `url(${logo})`}}
        >
        </div>
        <h3 className='text-amber-500 font-extrabold text-2xl'>Nestly</h3>
      </div>

      <div className='flex justify-between gap-10 text-xl '>
        <div className='border px-5 py-1 rounded-2xl cursor-pointer'>
          <h3>Find Room</h3>
        </div>
        <div className='border px-5 py-1 rounded-2xl cursor-pointer'>
          <h3>List Property</h3>
        </div>
      </div>

      <div className='flex items-center justify-between gap-6'>
        <div className='bg-amber-500 py-1 px-5 rounded-4xl border-3 cursor-pointer font-semibold hover:bg-amber-600 transition-all ease-in-out duration-200'>
          <h3>Sign Up</h3>
        </div>
        <button className='bg-gray-600 p-2 rounded-full'>
          <FaUser/>
        </button>
      </div>
    </div>
  )
}

export default Navbar
