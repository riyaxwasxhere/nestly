import React from 'react'

const BudgetCard = (props) => {
  return (
    <div className='bg-yellow-800/30 p-2 rounded-lg flex items-center justify-center hover:scale-105 cursor-pointer transition-all duration-200 border border-white/20 h-15 w-50'>
      <h4>{props.budget}</h4>
    </div>
  )
}

export default BudgetCard
