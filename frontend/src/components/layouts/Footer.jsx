import React from 'react'
import logo from '../../assets/images/logo.jpg'

const Footer = () => {
  return (
    <div className='bg-amber-950 border-t-[0.3px] border-t-white/10'>
      <div className='bg-black/80 inset-0 h-full p-10 px-55 text-white grid grid-cols-[2fr_5fr]'>
        <div className='flex items-center'>
          <div
            className='h-20 w-20 rounded-full bg-center bg-cover'
            style={{backgroundImage: `url(${logo})`}}
          ></div>
          <h2 className='text-5xl font-extrabold text-amber-500'>Nestly</h2>
        </div>
        <div className='grid grid-cols-4'>
          <div>
            <h3 className='text-xl font-semibold mb-3'>Quick Links</h3>
            <ul className='text-sm flex flex-col gap-2'>
              <li>Home</li>
              <li>Browse Properties</li>
              <li>Search by Budget</li>
              <li>Search by Type</li>
              <li>Map View</li>
              <li>Contact Owner</li>
              <li>Owner Dashboard</li>
              <li>Post Your Property</li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-3'>For Students</h3>
            <ul className='text-sm flex flex-col gap-2'>
              <li>How It Works</li>
              <li>Safety Tips</li>
              <li>Student Reviews</li>
              <li>PG vs Flat Guide</li>
              <li>Move-In Checklist</li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-3'>For  Owners</h3>
            <ul className='text-sm flex flex-col gap-2'>
              <li>Post Your Property</li>
              <li>Owner Login</li>
              <li>Pricing / Free Listing</li>
              <li>Verification Guide</li>
              <li>Photo/Video Guidelines</li>
              <li>Owner Support</li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-3'> Support & Policies</h3>
            <ul className='text-sm flex flex-col gap-2'>
              <li>Contact Us</li>
              <li>Help Center / FAQ</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='bg-black/80 inset-0 h-full p-5 px-55 text-white text-center text-sm'> 
        <p>© 2025 Nestly. All rights reserved.</p>       
      </div>
    </div>
  )
}

export default Footer
