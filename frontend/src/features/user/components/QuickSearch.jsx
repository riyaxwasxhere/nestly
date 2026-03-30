import React, { useState } from "react";

function QuickSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-8 bg-[#261A0A] rounded-2xl m-6 border border-[#5a4626]">
      <div>
        <h2 className="font-bold text-[#F0E8D8] ">🔍 Quick Search</h2>
      </div>
      <div className="flex gap-2 mb-3 ">
        <div className="flex-1 items-center justify-between my-4 bg-[#1A1208] py-2 px-4 rounded-xl border border-[#5a4626] ">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm text-[#867a5f] w-full outline-0"
            type="text"
            placeholder="Search by area, college or locality..."
          />
        </div>
        <button className="bg-[#F5A623] items-center justify-between my-4 cursor-pointer py-2 px-5 rounded-xl text-black text-sm font-semibold hover:shadow-sm hover:shadow-[#F5A623] transition-shadow duration-100">
          Search Rooms
        </button>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center justify-between bg-[#1A1208] py-2 px-4 rounded-xl border border-[#5a4626] text-[#F0E8D8] text-sm">
          <p>Any Budget</p>
          <span>▾</span>
        </button>
        <button className="flex items-center justify-between bg-[#1A1208] py-2 px-4 rounded-xl border border-[#5a4626] text-[#F0E8D8] text-sm">
          <p>Room Type</p>
          <span>▾</span>
        </button>
        <button className="flex items-center justify-between bg-[#1A1208] py-2 px-4 rounded-xl border border-[#5a4626] text-[#F0E8D8] text-sm">
          <p>Gender</p>
          <span>▾</span>
        </button>
      </div>
    </div>
  );
}

export default QuickSearch;
