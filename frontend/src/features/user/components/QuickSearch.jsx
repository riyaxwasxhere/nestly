import React from 'react'

function QuickSearch() {
  return (
    <div>
      <div>
        <h2>🔍 Quick Search</h2>
      </div>
      <div>
        <div>
            <div>
                <input type="text" placeholder='Search by area, college or locality...' />
            </div>
            <button>Search Rooms</button>
        </div>
      </div>
      <div>
        <button>
            <span>Any Budget</span>
            <span>▾</span>
        </button>
        <button>
            <span>Room Type</span>
            <span>▾</span>
        </button>
        <button>
            <span>Gender</span>
            <span>▾</span>
        </button>
      </div>
    </div>
  )
}

export default QuickSearch
