import React from 'react'

const CategoryCard = (props) => {
  return (
    <div className='h-80  mx-2 flex flex-col justify-between cursor-pointer hover:scale-103 transition-all duration-200 rounded-xl'>
      <div 
        className='h-full w-full bg-center rounded-t-xl bg-cover '
        style={{backgroundImage: `url(${props.photo})`}}
      ></div>
      <p className='text-center font-extralight text-lg' >{props.category}</p>
    </div>
  )
}

export default CategoryCard
