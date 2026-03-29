import React from 'react'

function HelpCard(props) {
    const {icon, heading, desc, btn} = props
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
