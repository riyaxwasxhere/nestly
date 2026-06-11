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
    <div className="flex bg-[#2a180a] rounded-2xl ">
      <div className="overflow-hidden w-50 rounded-2xl bg-[#121001]/40">
        <img src={post?.photos?.[0]} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col flex-1 p-4 rounded-2xl">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <div className="flex gap-2">
            <span
              className={`px-4 backdrop-blur-md bg-black/30 border rounded-2xl ${
                post.bookingStatus === "open"
                  ? "border-green-500 text-green-400"
                  : "border-red-500 text-red-400"
              }`}
            >
              {post.bookingStatus}
            </span>
            <span
              className={`px-4 backdrop-blur-md bg-black/30 border rounded-2xl ${
                visitRequest.status === "Pending"
                  ? "border-amber-500 bg-amber-600/10 text-amber-400"
                  : visitRequest.status === "Accepted"
                    ? "border-green-500 text-green-400 bg-green-600/10"
                    : visitRequest.status === "Completed"
                      ? "border-blue-500 bg-blue-600/10 text-blue-400 "
                      : "border-red-500 bg-red-600/10 text-red-400"
              } `}
            >
              {visitRequest.status}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 my-1 ">
          <p className="flex items-center gap-1 text-sm ">
            <MapPin size={15} />
            {post.address.house},{post.address.street},{post.address.locality},
            {post.address.city}
          </p>
          <p className="flex items-center gap-1 text-sm">
            <User size={15} /> Owner: {visitRequest.owner.fullname}
          </p>
          <p className="flex items-center gap-1 text-sm">
            <Calendar size={15} />
            Visit Date: {visitRequest.visitDate?.split("T")[0]}
          </p>
        </div>

        <p className="mb-2 text-sm italic">
          {visitRequest.message ? `"${visitRequest.message}"` : ""}
        </p>

        <div className="grid grid-cols-4 gap-4 mt-auto">
          {visitRequest.status === "Pending" && (
            <button
              onClick={() => onCancel(visitRequest._id)}
              className="flex items-center justify-center gap-4 py-2 transition-all duration-200 border cursor-pointer rounded-2xl hover:text-red-400"
            >
              <X size={15} /> <span className="text-sm">Cancel Request</span>
            </button>
          )}
          {visitRequest.status === "Accepted" && (
            <button className="flex items-center justify-center gap-4 py-2 border cursor-pointer rounded-2xl">
              <MessageCircle />
              <span>Message Owner</span>
            </button>
          )}
          {visitRequest.status === "Accepted" && (
            <button className="flex items-center justify-center gap-4 py-2 border cursor-pointer rounded-2xl">
              <View />
              <span>View Property</span>
            </button>
          )}
          {visitRequest.status === "Rejected" && (
            <button className="flex items-center justify-center gap-4 py-2 border cursor-pointer rounded-2xl">
              <Trash />
              <span>Remove</span>
            </button>
          )}
          {visitRequest.status === "Completed" && (
            <button
              onClick={() => handleOpenModal(post)}
              className="flex items-center justify-center gap-4 py-2 border cursor-pointer rounded-2xl"
            >
              <Star />
              Leave a Review
            </button>
          )}
        </div>
        {open && (
          <RateModal listing={selectedListing} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default VisitCard;
