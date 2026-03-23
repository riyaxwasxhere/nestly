import React from 'react'

function AuthInfoPanel() {
    const badges =[{
        icon: "✅",
        title: "Verified Listings Only",
        desc: "Real photos, real owners, no scams"
    },{
        img: "💬",
        title: "No Brokerage, Ever",
        desc: "Talk directly to the property owner"
    },{
        img: "📍",
        title: "Map-Based Search",
        desc: "Find rooms closest to your college"
    }]
  return (
    <div>
      <div>
        <span>Trusted by 10,000+ students</span>
        <h1>Your <span>Perfect Room</span> Awaits You</h1>
        <p>Verified PGs, hostels & flats near your campus. Zero brokerage, direct owner contact, honest prices.</p>
      </div>
      <div>
        {
            badges.map((badge)=>(
                <div>
                    <div>
                        <span>{badge.icon}</span>
                    </div>
                    <div>
                        <h3>{badge.title}</h3>
                        <p>{badge.desc}</p>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default AuthInfoPanel
