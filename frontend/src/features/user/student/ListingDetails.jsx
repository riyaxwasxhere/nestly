import React, { useState } from "react";
import {
  Blocks,
  Calendar,
  Delete,
  House,
  MessageCircle,
  Trash,
  X
} from "lucide-react";
import ImageSlider from "./ImageSlider";
import BookVisitModal from "./BookVisitModal";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../../redux/userSlice";
import { setStudentView } from "../../../redux/studentSlice";
import axios from "axios";
import { serverUrl } from "../../../App";
import { useEffect } from "react";
import ViewReviewsModal from "./ViewReviewsModal";

function ListingDetails({ listing, onClose, onDeleteSuccess }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [hasRequested, setHasRequested] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const listingId = listing._id;
  const user = useSelector((state) => state.user?.userData);

  const handleDeleteListing = async () => {
    try {
      await axios.delete(`${serverUrl}/api/listings/delete/${listingId}`, {
        withCredentials: true
      });
      onDeleteSuccess(listingId);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkRequest = async () => {
      const response = await axios.get(
        `${serverUrl}/api/bookings/check/${listingId}`,
        { withCredentials: true }
      );
      setHasRequested(response.data.hasRequested);
      setRequestId(response.data.requestId);
    };
    checkRequest();
  }, [listingId]);

  if (!listing) return null;

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleMessage = () => {
    dispatch(setSelectedChat(listing.owner));
    dispatch(setStudentView("Messages"));
  };

  const handleBookingRequest = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/bookings/request`,
        { listingId: listing._id },
        { withCredentials: true }
      );
      alert("Booking request sent");
      setHasRequested(true);
      setRequestId(response.data.requestId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      await axios.delete(`${serverUrl}/api/bookings/cancel/${requestId}`, {
        withCredentials: true
      });
      alert("Booking request cancelled!");
      setHasRequested(false);
      setRequestId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 bg-black/40 backdrop-blur-xs sm:px-4">
      <div className="relative w-full max-w-[1100px] max-h-[95vh] overflow-y-auto no-scrollbar rounded-2xl sm:rounded-3xl bg-[#2a180a] p-3 sm:p-6 shadow-2xl border">
        <div className="overflow-y-auto no-scrollbar">
          <div className="relative overflow-hidden h-52 sm:h-80 md:h-96 lg:h-120 rounded-2xl sm:rounded-3xl bg-[#121001]/40">
            <div className="absolute top-0 left-0 z-50 flex items-center justify-between w-full px-3 py-3 sm:px-6 sm:py-4">
              <span
                className={`px-3 py-1 text-xs sm:text-sm backdrop-blur-md bg-black/30 border rounded-2xl ${
                  listing.bookingStatus === "open"
                    ? "border-green-500 text-green-400"
                    : "border-red-500 text-red-400"
                }`}
              >
                {listing.bookingStatus}
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/40 backdrop-blur-md"
              >
                <X className="w-4 h-4 text-white cursor-pointer sm:w-5 sm:h-5" />
              </button>
            </div>
            <ImageSlider photos={listing.photos} />
          </div>

          <div className="p-3 sm:p-6 md:p-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start pb-3 border-b border-[#3d2b0f] gap-2 sm:gap-0">
              <div className="flex-1 min-w-0">
                <h2
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-xl sm:text-2xl font-semibold text-[#F5A623]"
                >
                  {listing.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm">
                  📍 {listing.address.house}, {listing.address.street},
                  {listing.address.landmark
                    ? ` near ${listing.address.landmark},`
                    : ``}{" "}
                  {listing.address.locality}, {listing.address.city},{" "}
                  {listing.address.state} - {listing.address.pincode}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-end sm:gap-0">
                <p
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-2xl font-semibold sm:text-3xl"
                >
                  ₹{listing.pricePerMonth}
                </p>
                <p className="text-xs text-gray-400 sm:text-sm">per month</p>
              </div>
            </div>

            <div className="border-b border-[#3d2b0f] py-3 flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs rounded-full sm:text-sm bg-amber-50/10">
                Room Type: {listing.roomType}
              </span>
              <span className="px-3 py-1 text-xs rounded-full sm:text-sm bg-amber-50/10">
                Gender: {listing.genderPreference}
              </span>
              <span className="px-3 py-1 text-xs rounded-full sm:text-sm bg-amber-50/10">
                Food: {listing.foodIncluded ? `Yes` : `No`}
              </span>
            </div>

\            <div className="py-3 border-b border-[#3d2b0f]">
              <p className="pb-2 text-xs tracking-widest text-gray-400 uppercase sm:text-sm">
                Amenities
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                {listing.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 text-sm sm:px-4 sm:py-3 rounded-2xl bg-red-50/10"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="py-3 border-b border-[#3d2b0f]">
              <p className="text-xs tracking-widest text-gray-400 uppercase sm:text-sm">
                About this place
              </p>
              <p className="mt-1 text-sm">{listing.description}</p>
            </div>

            <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <div className="flex items-center gap-2">
                <div className="bg-[#F5A623] w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shrink-0">
                  {user?.profilePic ? (
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src={user?.profilePic}
                      alt="profile"
                    />
                  ) : (
                    <p>{user?.fullname?.[0] || "U"}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base">{listing.owner?.fullname}</h3>
                  <p className="text-xs text-gray-400">
                    Posted on: {listing.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-green-900 rounded-full sm:text-sm">
                  {listing.averageRating > 0
                    ? `⭐ ${listing.averageRating} · `
                    : ``}
                  {listing.totalReviews} reviews
                </span>
                {listing.totalReviews > 0 && (
                  <button
                    onClick={() => setReviewModal(true)}
                    className="px-3 py-1 text-xs rounded-full cursor-pointer sm:text-sm bg-amber-900/70"
                  >
                    View Reviews
                  </button>
                )}
              </div>
            </div>

            {user?.role === "student" ? (
              <div className="grid grid-cols-1 gap-3 py-3 sm:grid-cols-3">
                <button
                  onClick={handleMessage}
                  className="flex items-center justify-center gap-2 py-3 text-sm bg-[#F5A623]/70 border cursor-pointer rounded-xl"
                >
                  <MessageCircle className="w-4 h-4" /> Message
                </button>
                <button
                  onClick={handleOpenModal}
                  className="flex items-center justify-center gap-2 py-3 text-sm bg-[#F5A623]/70 border cursor-pointer rounded-xl"
                >
                  <Calendar className="w-4 h-4" /> Book Visit
                </button>
                {hasRequested ? (
                  <button
                    onClick={handleCancelRequest}
                    className="flex items-center justify-center gap-2 py-3 text-sm border cursor-pointer bg-red-500/40 rounded-xl"
                  >
                    <Delete className="w-4 h-4" /> Cancel Request
                  </button>
                ) : (
                  <button
                    onClick={handleBookingRequest}
                    className="flex items-center justify-center gap-2 py-3 text-sm border cursor-pointer bg-[#F5A623]/70 rounded-xl"
                  >
                    <House className="w-4 h-4" /> Request Booking
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleDeleteListing}
                className="flex items-center justify-center w-full gap-4 px-4 py-3 mt-4 text-sm border cursor-pointer bg-red-600/40 rounded-xl"
              >
                <Trash className="w-4 h-4" /> Delete post
              </button>
            )}
          </div>

          {open && (
            <BookVisitModal listing={listing} onClose={handleCloseModal} />
          )}
          {reviewModal && (
            <ViewReviewsModal
              listing={listing}
              onClose={() => setReviewModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;