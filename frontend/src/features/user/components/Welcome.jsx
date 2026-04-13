import React from 'react'
import { useSelector } from 'react-redux'

function Welcome() {
  const user = useSelector(state=>state.user?.userData)
  const studentMsg = "You have 3 new messages and 2 upcoming visits this week"
  const ownerMsg = "You have 1 new message and 1 upcoming visit this week"
  const msg = user?.role === "student" ? studentMsg : ownerMsg
  return (
    <div className='flex items-center justify-between p-8 bg-[#261A0A] rounded-2xl m-6 border border-[#5a4626]'>
      <div className='flex flex-col gap-2 '>
        <h1 style={{fontFamily: "Playfair Display, serif"}} className='text-3xl font-bold text-[#F0E8D8]'>Welcome back, <span className='text-[#F5A623]'>{user?.fullname.split(" ")[0] || 'User'}</span> 👋</h1>
        <p className='text-[#867a5f] text-sm font-medium '>{msg}</p>
      </div>
      <div className='flex gap-8'>
        <div className='flex flex-col items-center bg-[#342310] px-5 py-2 rounded-lg border border-[#5a4626] leading-7 cursor-pointer'>
            <h2 className='text-[#F5A623] text-[25px] font-mono font-bold'>4</h2>
            <p className='text-xs uppercase font-mono text-[#867a5f] font-medium' >{user?.role === "student" ? "saved" : "listings"}</p>
        </div>
        <div className='flex flex-col items-center bg-[#342310] px-5 py-2 rounded-lg border border-[#5a4626] leading-7 cursor-pointer'>
            <h2 className='text-[#F5A623] text-[25px] font-mono font-bold'>3</h2>
            <p className='text-xs uppercase font-mono text-[#867a5f] font-medium' >messages</p>
        </div>
        <div className='flex flex-col items-center bg-[#342310] px-5 py-2 rounded-lg border border-[#5a4626] leading-7'>
            <h2 className='text-[#F5A623] text-[25px] font-mono font-bold'>2</h2>
            <p className='text-xs uppercase font-mono text-[#867a5f] font-medium' >visits</p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
