import React from "react";

function SavedCard() {
  return (
    <div className="hover:bg-[#2C1E0D] bg-[#1f160f] flex p-3 justify-between rounded-xl border border-[#492b0275] transition-all duration-200">
      <div className="flex gap-4">
        <div>
          <img
            className="w-20 h-20 rounded-lg"
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=70"
            alt=""
          />
        </div>
        <div>
          <h3 className="text-[#F0E8D8] font-semibold text-sm ">
            Sunrise PG - Single Room
          </h3>
          <p className="text-[#867a5f] text-xs my-1 font-medium">
            📍 Malviya Nagar, 400m from SIT
          </p>
          <p className="text-[#F4A523] font-bold font-mono">₹ 8,000/month</p>
        </div>
      </div>
      <div className='flex items-center gap-2 '>
        <button className="bg-[#0e0701] border border-[#3e2d05cc] px-3 py-1.5 rounded-lg text-xs text-[#867a5f] cursor-pointer font-medium hover:border-[#F4A523] hover:text-[#F4A523] transition-all duration-200">View Details</button>
        <button className="bg-[#0e0701] border border-[#3e2d05cc] px-3 py-1.5 rounded-lg text-xs text-[#867a5f] cursor-pointer font-medium hover:border-red-400 hover:text-red-400 transition-all duration-200">Remove</button>
      </div>
    </div>
  );
}

export default SavedCard;
