import React from "react";

function NotificationCard() {
  return (
    <div className="bg-[#1E1509] rounded-xl px-4 sm:px-5 py-3 flex gap-3 cursor-pointer border border-[#492b0275]">
      <div className="bg-[#2C1E0D] w-10 h-10 min-w-10 text-2xl rounded-xl flex items-center justify-center shrink-0">
        🏠
      </div>

      <div className="flex flex-col flex-1 min-w-0 gap-1 sm:flex-row sm:items-start sm:gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold leading-snug sm:text-sm">
            New listing near SIT — Single Room ₹4,800
          </h3>
          <p className="text-[#867a5f] font-medium text-[11px] sm:text-xs mt-0.5 leading-snug">
            A verified PG just listed a room 400m from SIT Siliguri matching
            your preferences
          </p>
        </div>
        <div className="text-[10px] sm:text-[11px] text-[#6e5c35e8] shrink-0 whitespace-nowrap">
          2 min ago
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
