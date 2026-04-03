import React from 'react'
import ListingCard from './ListingCard'
import SavedCard from './SavedCard'

function Saved() {
  return (
    <div className='px-10 py-8'>
      <div className='flex items-center justify-between'>
        <h2 style={{fontFamily: "Playfair Display, serif"}} className='mb-4 text-lg font-bold'>❤️ Saved Properties</h2>
        <span className='text-xs text-[#867a5f]'>5 properties saved</span>
      </div>
      <div className='flex flex-col gap-4'>
        <SavedCard/>
        <SavedCard/>
        <SavedCard/>
      </div>
    </div>
  )
}

export default Saved
