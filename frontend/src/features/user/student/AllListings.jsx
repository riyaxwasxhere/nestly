import React from 'react'
import QuickSearch from '../components/QuickSearch'
import ListingCard from './ListingCard'

function AllListings() {
  return (
    <div>
      <QuickSearch/>
      <div>
        <div>
            <h2>🏠 All Listings</h2>
            <span>24 results found</span>
        </div>
        <div>
            <ListingCard/>
            <ListingCard/>
            <ListingCard/>
        </div>
      </div>
    </div>
  )
}

export default AllListings
