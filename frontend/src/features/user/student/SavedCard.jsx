import axios from "axios";
import React from "react";
import { serverUrl } from "../../../App";

function SavedCard({ savedListing, userId, onRemove, onClick }) {
  if (!savedListing) {
    return null;
  }
  const handleRemove = async () => {
    try {
      await axios.delete(`${serverUrl}/api/saved/remove`, {
        data: {
          userId,
          savedListingId: savedListing._id
        },
        withCredentials: true
      });
      onRemove(savedListing._id);
    } catch (error) {
      console.error("Error removing saved listing:", error);
    }
  };

  return (
    <div className="hover:bg-[#2C1E0D] bg-[#1f160f] flex flex-col sm:flex-row p-3 justify-between gap-3 rounded-xl border border-[#492b0275] transition-all duration-200">
      {/* Image + Info */}
      <div className="flex min-w-0 gap-3 sm:gap-4">
        <img
          className="object-cover w-16 h-16 rounded-lg shrink-0 sm:w-20 sm:h-20"
          src={
            savedListing.photos?.[0] ||
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=70"
          }
          alt=""
        />
        <div className="flex flex-col justify-center min-w-0">
          <h3 className="text-[#F0E8D8] font-semibold text-sm truncate">
            {savedListing.title}
          </h3>
          <p className="text-[#867a5f] text-xs my-1 font-medium truncate">
            📍 {savedListing.address?.locality}, {savedListing.address?.city}
          </p>
          <p className="text-[#F4A523] font-bold font-mono text-sm">
            ₹ {savedListing.pricePerMonth}/month
          </p>
        </div>
      </div>

      <div
        onClick={onClick}
        className="flex flex-wrap items-center gap-2 sm:gap-2 sm:flex-nowrap"
      >
        <span
          className={`px-3 py-1.5 backdrop-blur-md bg-black/30 border rounded-lg flex items-center text-xs whitespace-nowrap ${
            savedListing.bookingStatus === "open"
              ? "border-green-500 text-green-400"
              : "border-red-500 text-red-400"
          }`}
        >
          {savedListing.bookingStatus === "open" ? "Available" : "Occupied"}
        </span>

        <button className="flex-1 sm:flex-none bg-[#0e0701] border border-[#3e2d05cc] px-3 py-1.5 rounded-lg text-xs text-[#867a5f] cursor-pointer font-medium hover:border-[#F4A523] hover:text-[#F4A523] transition-all duration-200 whitespace-nowrap">
          View Details
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          className="flex-1 sm:flex-none bg-[#0e0701] border border-[#3e2d05cc] px-3 py-1.5 rounded-lg text-xs text-[#867a5f] cursor-pointer font-medium hover:border-red-400 hover:text-red-400 transition-all duration-200 whitespace-nowrap"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default SavedCard;
