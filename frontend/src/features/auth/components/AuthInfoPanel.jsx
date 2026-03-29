import React from "react";
import bgImage from "../../../assets/images/authInfoPanelBg.jpg";

function AuthInfoPanel() {
  const badges = [
    {
      icon: "✅",
      title: "Verified Listings Only",
      desc: "Real photos, real owners, no scams"
    },
    {
      icon: "💬",
      title: "No Brokerage, Ever",
      desc: "Talk directly to the property owner"
    },
    {
      icon: "📍",
      title: "Map-Based Search",
      desc: "Find rooms closest to your college"
    }
  ];
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover bg-center  flex flex-col w-[45%] min-h-screen sticky top-0 h-screen"
    >
      <div className="absolute bg-black/80 border-r border-[#462c03] z-10 inset-0"></div>
      <div className="relative z-20 px-16 pt-16">
        <span className="border border-[#5a4626] text-[13px] uppercase font-semibold tracking-widest px-5 py-1.5 rounded-2xl bg-[#885e2b4b] text-[#F5A623] font-mono ">
          Trusted by 10,000+ students
        </span>
        <h1
          style={{ fontFamily: "Playfair Display, serif" }}
          className="mt-12 mb-5 leading-15 text-[54px] font-playfair font-black"
        >
          Your <span className="text-[#F5A623]">Perfect Room</span> Awaits You
        </h1>
        <p className="text-[#f0e3c77c] font-sans text-[16px] w-[75%]">
          Verified PGs, hostels & flats near your campus. Zero brokerage, direct
          owner contact, honest prices.
        </p>
      </div>
      <div className="z-20 flex flex-col gap-5 px-16 pb-16 mt-10 ">
        {badges.map((badge) => (
          <div className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center hover:border-[#F5A623] hover:translate-x-2 transition-all duration-400">
            <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
            <div className="z-9">
              <span className="text-2xl">{badge.icon}</span>
            </div>
            <div className="flex-1 z-9">
              <h3 className="text-sm font-semibold">{badge.title}</h3>
              <p className="text-xs font-light text-white/60">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthInfoPanel;
