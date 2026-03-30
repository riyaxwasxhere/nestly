import React, { useState } from "react";

function Header() {
  const [activeBtn, setActiveBtn] = useState("");
  const handleActiveBtn = (btn) => {
    setActiveBtn(btn);
  }
  return (
    <div className="flex items-center justify-between h-20 px-8 border-b border-[#2c1a00b3]">
      <h1 style={{fontFamily: "Playfair Display, serif"}} className="text-xl text-[#F0E8D8] font-bold ">Dashboard <span className="text-[#F5A623]">OverView</span></h1>
      <div className="flex items-center gap-4">
        <button onClick={()=>handleActiveBtn("Notifications")} className={`text-lg bg-[#1E1509] p-1.5 rounded-lg border cursor-pointer border-[#2d1f08] ${activeBtn === "Notifications" ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100" : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"}`} >🔔</button>
        <button onClick={()=>handleActiveBtn("Messages")} className={`text-lg bg-[#1E1509] p-1.5 rounded-lg border cursor-pointer border-[#2d1f08] ${activeBtn === "Messages" ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100" : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"}`} >💬</button>
        <button onClick={()=>handleActiveBtn("Profile")} className={`text-lg bg-[#1E1509] p-1.5 rounded-lg border cursor-pointer border-[#2d1f08] ${activeBtn === "Profile" ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100" : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"}`} >👤</button>
      </div>
    </div>
  );
}

export default Header;
