import React from 'react'

const CategoryCard = (props) => {
  return (
    <div className='flex flex-col justify-between h-48 mx-1 transition-all duration-200 cursor-pointer sm:h-64 lg:h-80 sm:mx-2 hover:scale-103 rounded-xl'>
      <div 
        className='w-full h-full bg-center bg-cover rounded-t-xl'
        style={{backgroundImage: `url(${props.photo})`}}
      ></div>
      <p className='py-1 text-sm text-center font-extralight sm:text-base lg:text-lg'>{props.category}</p>
    </div>
  )
}

export default CategoryCard