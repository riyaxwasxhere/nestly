import React from 'react'

function HelpCard({icon, heading, desc, btn}) {
  return (
    <div>
      <p>{icon}</p>
      <p>{heading}</p>
      <p>{desc}</p>
      <button>{btn}</button>
    </div>
  )
}

export default HelpCard
