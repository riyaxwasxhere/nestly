import React from "react";

function HelpCard({ icon, heading, desc, btn }) {
  return (
    <div className="bg-[#211608] p-4 sm:p-6 rounded-2xl hover:-translate-y-1 border border-[#5a462657] transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2 sm:gap-3 sm:mb-3">
          <p className="text-xl sm:text-2xl">{icon}</p>
          <p className="text-[14px] sm:text-[16px] font-semibold leading-snug">
            {heading}
          </p>
        </div>
        <p className="text-[12px] sm:text-[13px] font-medium text-[#867a5f] leading-relaxed">
          {desc}
        </p>
      </div>
      <button className="w-full sm:w-auto px-4 py-2 text-[#F5A623] text-xs sm:text-sm bg-[#2f210f] cursor-pointer font-semibold rounded-lg mt-4 sm:mt-5 border border-[#f5a5233f] hover:text-black hover:bg-[#F5A623] transition-all duration-200">
        {btn}
      </button>
    </div>
  );
}

export default HelpCard;
