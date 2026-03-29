import React from 'react'
import Welcome from '../components/Welcome'
import QuickSearch from '../components/QuickSearch'
import ListingCard from './ListingCard'
function Dashboard() {
  return (
    <div className='h-screen overflow-y-auto '>
      <Welcome />
      <QuickSearch />
      <div>
          <div>
            <h2>⭐ Recommended for You</h2>
            <span>See all</span>
          </div>
          <ListingCard />
        </div>
    </div>
  )
}

export default Dashboard
