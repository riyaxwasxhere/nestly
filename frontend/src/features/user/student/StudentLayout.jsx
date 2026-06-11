import Navbar from "./Navbar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import AllListings from "./AllListings";
import Saved from "./Saved";
import Messages from "./Messages";
import ScheduledVisits from "./ScheduledVisits";
import Notifications from "./Notifications";
import Profile from "./Profile";
import HelpAndSupport from "./HelpAndSupport";
import { useSelector } from "react-redux";

function StudentLayout() {
  const activeView = useSelector((state) => state.student.studentView);

  return (
    <div className="bg-[#0E0A07] text-[#F0E8D8] flex h-screen overflow-hidden">
      <div className="hidden h-screen overflow-hidden shrink-0 md:flex">
        <Navbar />
      </div>

      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <div className="shrink-0 md:hidden">
          <Navbar />
        </div>

        <Header />

        <div className="flex-1 pb-16 overflow-y-auto md:pb-0">
          {activeView === "Dashboard" && <Dashboard />}
          {activeView === "All Listings" && <AllListings />}
          {activeView === "Saved" && <Saved />}
          {activeView === "Messages" && <Messages />}
          {activeView === "Scheduled Visits" && <ScheduledVisits />}
          {activeView === "Notifications" && <Notifications />}
          {activeView === "Profile" && <Profile />}
          {activeView === "Help And Support" && <HelpAndSupport />}
        </div>
      </div>
    </div>
  );
}

export default StudentLayout;
