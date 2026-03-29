import React from 'react'
import ListingCard from './ListingCard'
import SavedCard from './SavedCard'

function Saved() {
  return (
    <div>
      <div>
        <h2>❤️ Saved Properties</h2>
        <span>5 properties saved</span>
      </div>
      <div>
        <SavedCard/>
        <SavedCard/>
        <SavedCard/>
      </div>
    </div>
  )
}

export default Saved
