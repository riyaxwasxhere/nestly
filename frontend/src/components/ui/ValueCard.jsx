import React from 'react'

const ValueCard = (props) => {
  return (
    <div className='bg-white/20 rounded-2xl p-5 flex justify-between'>
      <div>
        <h3 className='text-xl font-semibold'>{props.heading}</h3>
        <p className='text-sm'>{props.text}</p>
      </div>
      <div
        className='h-20 w-20 bg-center bg-size-[110%] '
        style={{backgroundImage: `url(${props.photo})`}} 
      >
        
      </div>
    </div>
  )
}

export default ValueCard
