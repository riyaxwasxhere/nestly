import React from "react";
import { useSelector } from "react-redux";

function Welcome({ listingsCount }) {
  const user = useSelector((state) => state?.user?.userData);
  const studentMsg = "You have 3 new messages and 2 upcoming visits this week";
  const ownerMsg = "You have 1 new message and 1 upcoming visit this week";
  const msg = user?.role === "student" ? studentMsg : ownerMsg;
  const savedListings = useSelector((state) => state.saved?.savedListings);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 p-5 sm:p-8 bg-[#261A0A] rounded-2xl mx-3 my-3 sm:m-6 border border-[#5a4626]">
      <div className="flex flex-col gap-1.5">
        <h1
          style={{ fontFamily: "Playfair Display, serif" }}
          className="text-2xl sm:text-3xl font-bold text-[#F0E8D8] leading-snug"
        >
          Welcome back,{" "}
          <span className="text-[#F5A623]">
            {user?.fullname?.split(" ")[0] || "User"}
          </span>{" "}
          👋
        </h1>
        <p className="text-[#867a5f] text-xs sm:text-sm font-medium leading-relaxed max-w-xs">
          {msg}
        </p>
      </div>

      <div className="flex w-full gap-3 sm:w-auto sm:gap-4">
        <div className="flex flex-col items-center flex-1 sm:flex-none bg-[#342310] px-4 sm:px-6 py-3 rounded-xl border border-[#5a4626] cursor-pointer">
          <h2 className="text-[#F5A623] text-2xl sm:text-[25px] font-mono font-bold leading-tight">
            {user?.role === "student" ? savedListings.length : listingsCount}
          </h2>
          <p className="text-[10px] sm:text-xs uppercase font-mono text-[#867a5f] font-medium tracking-wide mt-0.5">
            {user?.role === "student" ? "saved" : "listings"}
          </p>
        </div>
        <div className="flex flex-col items-center flex-1 sm:flex-none bg-[#342310] px-4 sm:px-6 py-3 rounded-xl border border-[#5a4626] cursor-pointer">
          <h2 className="text-[#F5A623] text-2xl sm:text-[25px] font-mono font-bold leading-tight">
            3
          </h2>
          <p className="text-[10px] sm:text-xs uppercase font-mono text-[#867a5f] font-medium tracking-wide mt-0.5">
            messages
          </p>
        </div>
        <div className="flex flex-col items-center flex-1 sm:flex-none bg-[#342310] px-4 sm:px-6 py-3 rounded-xl border border-[#5a4626]">
          <h2 className="text-[#F5A623] text-2xl sm:text-[25px] font-mono font-bold leading-tight">
            2
          </h2>
          <p className="text-[10px] sm:text-xs uppercase font-mono text-[#867a5f] font-medium tracking-wide mt-0.5">
            visits
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
