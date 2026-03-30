import React, { useState } from "react";
import Logo from "../../../components/ui/Logo";

function Navbar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const handleActiveItem = (item) => {
    setActiveItem(item);
  }
  
  const mainItems = [
    {
      label: "Dashboard",
      icon: "🏠",
    },
    {
      label: "All Listings",
      icon: "🔍",
    },
    {
      label: "Saved",
      icon: "❤️",
    },
    {
      label: "Messages",
      icon: "💬",
    }
  ]
  const planningItems = [
    {
      label: "Scheduled Visits",
      icon: "📅",
    },
    {
      label: "Recently Viewed",
      icon: "🕐",
    },
    {
      label: "Find Roommate",
      icon: "👥",
    }
  ]
  const accountItems = [
    {
      label: "Notifications",
      icon: "🔔",
    },
    {
      label: "Profile",
      icon: "👤",
    },
    {
      label: "Help & Support",
      icon: "💡",
    }
  ]

  return (
    <div className="flex flex-col w-60 p-2 text-white border-r border-[#2c1a00b3] h-screen bg-[#2517035c]">
      <div className="flex items-center h-16 px-3 ">
        <Logo />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto ">
        <div className="mb-1">
          <h2 className="text-[#6A5C48] uppercase py-3 text-xs font-semibold px-3 tracking-widest">
            Main
          </h2>
          <div className="flex flex-col gap-1">
            {mainItems.map((item) => (
              <div onClick={()=>handleActiveItem(item.label)}  className={`flex text-sm items-center gap-3 text-[#F0E8D8] font-medium py-3 px-4 cursor-pointer ${activeItem === item.label ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100" : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"}`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-1">
          <h2 className="text-[#6A5C48] uppercase py-3 text-xs font-semibold px-3 tracking-widest">
            Planning
          </h2>
          <div className="flex flex-col gap-1">
            {planningItems.map((item) => (
              <div onClick={()=>handleActiveItem(item.label)}  className={`flex text-sm items-center gap-3 text-[#F0E8D8] font-medium py-3 px-4 cursor-pointer ${activeItem === item.label ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100" : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"}`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-1">
          <h2 className="text-[#6A5C48] uppercase py-3 text-xs font-semibold px-3 tracking-widest">
            Account
          </h2>
          <div className="flex flex-col gap-1">
            {accountItems.map((item) => (
              <div onClick={()=>handleActiveItem(item.label)}  className={`flex text-sm items-center gap-3 text-[#F0E8D8] font-medium py-3 px-4 cursor-pointer ${activeItem === item.label ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100" : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"}`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-3 mb-5 cursor-pointer">
        <div className="bg-[#F5A623] w-8 h-8 rounded-full flex items-center justify-around text-lg font-ebold">R</div>
        <div>
          <h3 className="text-sm">Riya Dutta</h3>
          <p className="text-xs">Student · SIT Siliguri</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
