import React from 'react'
import Navbar from './Navbar'
import Header from '../student/Header'
import { useSelector } from 'react-redux'
import OwnerDashboard from './OwnerDashboard'
import MyListings from './MyListings'
import Tenants from './Tenants'
import Messages from './Messages'
import ScheduledVisits from './ScheduledVisits'
import Notifications from './Notifications'
import Profile from './Profile'
import HelpAndSupport from './HelpAndSupport'
import AddListing from './AddListing'

function OwnerLayout() {
  const activeView = useSelector((state) => state.owner.ownerView)
  return (
    <div className="bg-[#0E0A07] text-[#F0E8D8] flex ">
      <div className="flex h-screen overflow-hidden">
        <Navbar />
      </div>
      <div className="flex-1 h-screen overflow-hidden">
        <Header />
        {activeView === "Dashboard" && <OwnerDashboard />}
        {activeView === "My Listings" && <MyListings />}
        {activeView === "Add Listing" && <AddListing />}
        {activeView === "Tenants" && <Tenants />}
        {activeView === "Messages" && <Messages />}
        {activeView === "Scheduled Visits" && <ScheduledVisits />}
        {activeView === "Notifications" && <Notifications />}
        {activeView === "Profile" && <Profile />}
        {activeView === "Help And Support" && <HelpAndSupport />}
      </div>
    </div>
  )
}

export default OwnerLayout
