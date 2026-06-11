import React from "react";
import Navbar from "./Navbar";
import Header from "../student/Header";
import { useSelector } from "react-redux";
import OwnerDashboard from "./OwnerDashboard";
import MyListings from "./MyListings";
import Messages from "../student/Messages";
import Notifications from "./Notifications";
import Profile from "./Profile";
import HelpAndSupport from "./HelpAndSupport";
import AddListing from "./AddListing";
import VisitRequests from "./VisitRequests";
import BookingRequests from "./BookingRequests";

function OwnerLayout() {
  const activeView = useSelector((state) => state.owner.ownerView);

  return (
    <div className="bg-[#0E0A07] text-[#F0E8D8] flex h-screen overflow-hidden">
      <div className="hidden h-screen overflow-hidden sm:flex">
        <Navbar />
      </div>

      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Header />
        {activeView === "Dashboard" && <OwnerDashboard />}
        {activeView === "My Listings" && <MyListings />}
        {activeView === "Add Listing" && <AddListing />}
        {activeView === "Messages" && <Messages />}
        {activeView === "Visit Requests" && <VisitRequests />}
        {activeView === "Booking Requests" && <BookingRequests />}
        {activeView === "Notifications" && <Notifications />}
        {activeView === "Profile" && <Profile />}
        {activeView === "Help And Support" && <HelpAndSupport />}
      </div>
      <div className="sm:hidden">
        <Navbar />
      </div>
    </div>
  );
}

export default OwnerLayout;
