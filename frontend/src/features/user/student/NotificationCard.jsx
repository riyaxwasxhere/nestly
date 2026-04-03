import React from 'react'

function NotificationCard() {
  return (
    <div className='bg-[#1E1509] rounded-xl px-5 py-3 flex cursor-pointer border border-[#492b0275]'>
      <div className='flex flex-1 gap-3'>
        <div className='bg-[#2C1E0D] w-10 h-10 text-2xl rounded-xl flex items-center justify-center'>🏠</div>
        <div>
            <h3 className='text-sm font-semibold'>New listing near SIT — Single Room ₹4,800</h3>
            <p className='text-[#867a5f] font-medium text-xs'>A verified PG just listed a room 400m from SIT Siliguri matching your preferences</p>
        </div>
      </div>
      <div className='text-[11px] text-[#6e5c35e8]'>2 min ago</div>
    </div>
  )
}

export default NotificationCard
