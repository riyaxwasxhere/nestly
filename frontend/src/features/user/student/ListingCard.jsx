import React from "react";

function ListingCard() {
  return (
    <div className="bg-[#261A0A] rounded-xl cursor-pointer ">
      <div className="relative">
        <div
          className="h-40 bg-center bg-cover rounded-t-xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=70')"
          }}
        >
          <div className="flex items-center justify-between px-3 py-2 text-xs text-[#867a5f]absolute">
            <span className="px-2 bg-[#362704cf] rounded-4xl border border-[#8d8269]">4.8 (120 reviews)</span>
            {/* <span>🤍</span> */}
            <span>❤️</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-4 py-2">
        <h3 className="text-sm font-semibold">Sunrise PG — Single Room</h3>
        <p className="text-xs text-[#867a5f] font-medium">📍Malviya Nagar, 400m from SIT</p>
        <div className="flex items-center justify-between my-2">
          <p className="text-xs text-[#867a5f]"><span className="text-[#F5A623] font-bold text-[16px]">₹5,500</span>/month</p>
          <p className="font-mono text-sm ">Girls PG</p>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
