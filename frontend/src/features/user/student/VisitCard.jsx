import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  MessageCircle,
  Star,
  Trash,
  User,
  View,
  X
} from "lucide-react";
import RateModal from "./RateModal";

function VisitCard({ visitRequest, onCancel }) {
  const [open, setOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleOpenModal = (listing) => {
    setSelectedListing(listing);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedListing(null);
  };

  const post = visitRequest.listing;
  if (!visitRequest) return null;

  return (
    <div className="flex flex-col sm:flex-row bg-[#2a180a] rounded-2xl overflow-hidden">
      <div className="w-full h-44 sm:h-auto sm:w-44 md:w-50 shrink-0 bg-[#121001]/40">
        <img src={post?.photos?.[0]} className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <div className="flex flex-col justify-between gap-2 mb-1 xs:flex-row">
          <h2 className="text-base font-bold leading-tight sm:text-lg">
            {post.title}
          </h2>
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 text-xs backdrop-blur-md bg-black/30 border rounded-2xl flex items-center whitespace-nowrap ${
                post.bookingStatus === "open"
                  ? "border-green-500 text-green-400"
                  : "border-red-500 text-red-400"
              }`}
            >
              {post.bookingStatus}
            </span>
            <span
              className={`px-3 text-xs backdrop-blur-md bg-black/30 border rounded-2xl flex items-center whitespace-nowrap ${
                visitRequest.status === "Pending"
                  ? "border-amber-500 bg-amber-600/10 text-amber-400"
                  : visitRequest.status === "Accepted"
                    ? "border-green-500 text-green-400 bg-green-600/10"
                    : visitRequest.status === "Completed"
                      ? "border-blue-500 bg-blue-600/10 text-blue-400"
                      : "border-red-500 bg-red-600/10 text-red-400"
              }`}
            >
              {visitRequest.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1 my-1 sm:grid-cols-3 sm:gap-2">
          <p className="flex items-start gap-1 text-xs sm:text-sm text-[#c9b18b]">
            <MapPin size={14} className="shrink-0 mt-0.5" />
            <span className="line-clamp-2">
              {post.address.house}, {post.address.street},{" "}
              {post.address.locality}, {post.address.city}
            </span>
          </p>
          <p className="flex items-center gap-1 text-xs sm:text-sm text-[#c9b18b]">
            <User size={14} className="shrink-0" />
            Owner: {visitRequest.owner.fullname}
          </p>
          <p className="flex items-center gap-1 text-xs sm:text-sm text-[#c9b18b]">
            <Calendar size={14} className="shrink-0" />
            {visitRequest.visitDate?.split("T")[0]}
          </p>
        </div>

        <p className="mb-2 text-xs sm:text-sm italic text-[#867a5f]">
          {visitRequest.message ? `"${visitRequest.message}"` : ""}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {visitRequest.status === "Pending" && (
            <button
              onClick={() => onCancel(visitRequest._id)}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs transition-all duration-200 border cursor-pointer sm:text-sm rounded-2xl hover:text-red-400 whitespace-nowrap"
            >
              <X size={13} /> Cancel Request
            </button>
          )}
          {visitRequest.status === "Accepted" && (
            <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs border cursor-pointer sm:text-sm rounded-2xl whitespace-nowrap">
              <MessageCircle size={14} />
              Message Owner
            </button>
          )}
          {visitRequest.status === "Accepted" && (
            <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs border cursor-pointer sm:text-sm rounded-2xl whitespace-nowrap">
              <View size={14} />
              View Property
            </button>
          )}
          {visitRequest.status === "Rejected" && (
            <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs border cursor-pointer sm:text-sm rounded-2xl whitespace-nowrap">
              <Trash size={14} />
              Remove
            </button>
          )}
          {visitRequest.status === "Completed" && (
            <button
              onClick={() => handleOpenModal(post)}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs border cursor-pointer sm:text-sm rounded-2xl whitespace-nowrap"
            >
              <Star size={14} />
              Leave a Review
            </button>
          )}
        </div>
      </div>

      {open && (
        <RateModal listing={selectedListing} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default VisitCard;
