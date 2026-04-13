import React, { useState } from "react";
import Logo from "../../../components/ui/Logo";
import { useDispatch, useSelector } from "react-redux";
import { setStudentView } from "../../../redux/studentSlice";

function Navbar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const handleActiveItem = (item) => {
    setActiveItem(item);
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  const navItems = [
    {
      label: "Dashboard",
      icon: "🏠"
    },
    {
      label: "All Listings",
      icon: "🔍"
    },
    {
      label: "Saved",
      icon: "❤️"
    },
    {
      label: "Messages",
      icon: "💬"
    },
    {
      label: "Scheduled Visits",
      icon: "📅"
    },
    {
      label: "Recently Viewed",
      icon: "🕐"
    },
    {
      label: "Find Roommate",
      icon: "👥"
    },
    {
      label: "Notifications",
      icon: "🔔"
    },
    {
      label: "Profile",
      icon: "👤"
    },
    {
      label: "Help And Support",
      icon: "💡"
    }
  ];

  return (
    <div className="flex flex-col w-60 p-2 text-white border-r border-[#2c1a00b3] h-screen bg-[#2517035c]">
      <div className="flex items-center h-16 px-3 ">
        <Logo />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar ">
        <div className="my-6">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div
                onClick={() => {
                  handleActiveItem(item.label);
                  dispatch(setStudentView(item.label));
                }}
                className={`flex text-sm items-center gap-3 text-[#F0E8D8] font-medium py-3 px-4 cursor-pointer ${activeItem === item.label ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100" : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-3 mb-5 cursor-pointer">
        <div className="bg-[#F5A623] w-8 h-8 rounded-full flex items-center justify-around text-lg font-bold">
          {user.fullname[0]}
        </div>
        <div>
          <h3 className="text-sm">{user.fullname}</h3>
          <p className="text-xs">{user.role} · SIT Siliguri</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
