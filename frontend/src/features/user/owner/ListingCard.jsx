import React, { useState } from "react";

function ListingCard({listing}) {
  const [statusOpen, setStatusOpen] = useState(listing.bookingStatus === "open");
  return (
    <div className="bg-[#261A0A] rounded-xl cursor-pointer border border-[#5a462657] hover:-translate-y-1 transition-all duration-300">
      <div className="relative">
        <div
          className="h-40 bg-center bg-cover rounded-t-xl"
          style={{
            backgroundImage:
              `url('${listing.photos?.[0] ||"https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=70"}')`
          }}
        >
          <div className="flex items-center justify-between px-3 py-2 text-xs text-[#867a5f]absolute">
            <span className="px-2 bg-[#362704cf] rounded-4xl border border-[#8d8269]">{listing.averageRating > 0 ? `⭐ ${listing.averageRating} (${listing.totalReviews} reviews)` : "No reviews yet"}</span>
            <span className={`px-2 rounded-4xl border-[1.5px] ${statusOpen?"border-green-600 bg-green-900/70":"border-red-600 bg-red-900/70"}`}>{statusOpen ? "open" : "closed"}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-4 py-2">
        <h3 className="text-sm font-semibold">{listing.title}</h3>
        <p className="text-xs text-[#867a5f] font-medium">📍{listing.address?.locality}, {listing.address?.city}</p>
        <div className="flex items-center justify-between my-2">
          <p className="text-xs text-[#867a5f]"><span className="text-[#F5A623] font-bold text-[16px]">₹{listing.pricePerMonth}</span>/month</p>
          <button className="px-2 py-1 font-mono text-xs rounded-full cursor-pointer bg-amber-50/10">Edit✏️</button>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
