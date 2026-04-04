import React from 'react'
import QuickSearch from '../components/QuickSearch'
import ListingCard from './ListingCard'

function AllListings() {
  return (
    <div className='h-screen overflow-y-auto no-scrollbar'>
      <div className='px-3'><QuickSearch/></div>
      <div className='px-10'>
        <div className='flex items-center justify-between mb-4'>
            <h2 style={{fontFamily:  "Playfair Display, serif"}} className='text-lg font-bold text-[#F0E8D8]'>🏠 All Listings</h2>
            <span className='text-sm text-[#867a5f] '>24 results found</span>
        </div>
        <div className='grid grid-cols-4 gap-4'>
            <ListingCard/>
            <ListingCard/>
            <ListingCard/>
            <ListingCard/>
            <ListingCard/>
        </div>
      </div>
    </div>
  )
}

export default AllListings
