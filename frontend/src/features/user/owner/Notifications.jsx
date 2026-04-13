import React from 'react'
import NotificationCard from '../student/NotificationCard'

function Notifications() {
  return (
    <div className='px-10 py-8'>
      <div className='flex items-center justify-between'>
        <h2 style={{fontFamily: "Playfair Display, serif"}} className='mb-4 text-lg font-bold'>🔔 Notifications</h2>
        <span className='text-xs text-[#867a5f]'>5 properties saved</span>
      </div>
      <div className='flex flex-col gap-2'>
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  )
}

export default Notifications
