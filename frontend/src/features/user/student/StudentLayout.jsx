import Navbar from "./Navbar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import AllListings from './AllListings'
import Saved from './Saved'
import Messages from './Messages'
import ScheduledVisits from './ScheduledVisits'
import RecentlyViewed from './RecentlyViewed'
import FindRoommate from './FindRoommate'
import Notifications from './Notifications'
import Profile from './Profile'
import HelpAndSupport from './HelpAndSupport'
import { useSelector } from "react-redux";

function StudentLayout() {
  const activeView = useSelector((state)=> state.student.studentView)
  
  return (
    <div className="bg-[#0E0A07] text-[#F0E8D8] flex ">
      <div className="flex h-screen overflow-hidden">
        <Navbar />
      </div>
      <div className="flex-1 h-screen overflow-hidden">
        <Header />
        {activeView === "Dashboard" && <Dashboard />}
        {activeView === "All Listings" && <AllListings />}
        {activeView === "Saved" && <Saved />}
        {activeView === "Messages" && <Messages />}
        {activeView === "Scheduled Visits" && <ScheduledVisits />}
        {activeView === "Recently Viewed" && <RecentlyViewed />}
        {activeView === "Find Roommate" && <FindRoommate />}
        {activeView === "Notifications" && <Notifications />}
        {activeView === "Profile" && <Profile />}
        {activeView === "Help And Support" && <HelpAndSupport />}
      </div>
    </div>
  );
}

export default StudentLayout;
