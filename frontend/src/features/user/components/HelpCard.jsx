import React from "react";

function HelpCard({ icon, heading, desc, btn }) {
  return (
    <div className="bg-[#211608] p-6 rounded-2xl hover:-translate-y-1 border border-[#5a462657] transition-all duration-300">
      <div className="flex items-center gap-3">
        <p className="text-2xl">{icon}</p>
        <p className="text-[16px] font-semibold">{heading}</p>
      </div>
      <p className="text-[13px] font-medium text-[#867a5f] ">{desc}</p>
      <button className="px-4 py-2 text-[#F5A623] text-sm bg-[#2f210f] cursor-pointer font-semibold rounded-lg mt-5 border border-[#f5a5233f] hover:text-black hover:bg-[#F5A623] transition-all duration-200">{btn}</button>
    </div>
  );
}

export default HelpCard;
