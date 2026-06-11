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

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleMessage = () => {
    dispatch(setSelectedChat(listing.owner));
    dispatch(setStudentView("Messages"));
  };

  const handleBookingRequest = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/bookings/request`,
        {
          listingId: listing._id
        },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="relative w-[90%] max-w-[1100px] max-h-[90vh] overflow-y-auto  no-scrollbar rounded-3xl bg-[#2a180a] p-6 shadow-2xl border">
        <div className="h-screen overflow-y-auto no-scrollbar">
          <div className="relative overflow-hidden h-120 rounded-3xl bg-[#121001]/40">
            <div className="absolute top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-4">
              <span
                className={`px-4 py-1 backdrop-blur-md bg-black/30 border rounded-2xl ${
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
                <X className="w-5 h-5 text-white cursor-pointer" />
              </button>
            </div>

            <ImageSlider photos={listing.photos} />
          </div>

          <div className="p-10 ">
            <div className="flex justify-between pb-3 border-b border-[#3d2b0f]">
              <div>
                <h2
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-2xl font-semibold text-[#F5A623]"
                >
                  {listing.title}
                </h2>
                <p className="text-sm">
                  📍 {listing.address.house},{listing.address.street},
                  {listing.address.landmark
                    ? `near ${listing.address.landmark}`
                    : ``}
                  , {listing.address.locality},{listing.address.city},
                  {listing.address.state}-{listing.address.pincode}{" "}
                </p>
              </div>
              <div className="flex flex-col items-end ">
                <p
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-3xl font-semibold"
                >
                  ₹{listing.pricePerMonth}
                </p>
                <p className="text-sm">per month</p>
              </div>
            </div>

            <div className="border-b border-[#3d2b0f] py-3 flex gap-2">
              <span className="px-4 py-1 rounded-full bg-amber-50/10">
                Room Type: {listing.roomType}
              </span>
              <span className="px-4 py-1 rounded-full bg-amber-50/10">
                Gender Preference: {listing.genderPreference}
              </span>
              <span className="px-4 py-1 rounded-full bg-amber-50/10">
                Food Included: {listing.foodIncluded ? `Yes` : `No`}
              </span>
            </div>

            <div className="py-3  border-b border-[#3d2b0f]">
              <p className="pb-2 text-[16px] uppercase">Amenities</p>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map((item) => (
                  <div className="px-4 py-3 rounded-2xl bg-red-50/10">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="py-3  border-b border-[#3d2b0f]">
              <p className="text-[16px] uppercase">about this place</p>
              <p className="text-sm">{listing.description}</p>
            </div>

            <div className="flex items-center justify-between py-3 ">
              <div className="flex gap-2">
                <div className="bg-[#F5A623] w-8 h-8 rounded-full flex items-center justify-around text-lg font-bold">
                  {user?.profilePic ? (
                    <img
                      className="flex items-center w-8 h-8 rounded-full"
                      src={user?.profilePic}
                    />
                  ) : (
                    <p>{user?.fullname[0] || "U"}</p>
                  )}
                </div>
                <div className="flex flex-col ">
                  <h3 className="text-lg">{listing.owner?.fullname}</h3>
                  <p className="text-sm leading-2">
                    Posted on: {listing.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-1 text-sm bg-green-900 rounded-full">
                  {listing.averageRating > 0
                    ? `⭐ ${listing.averageRating} · `
                    : ``}{" "}
                  {listing.totalReviews} reviews{" "}
                </span>
                {listing.totalReviews > 0 && (
                  <button
                    onClick={() => {
                      setReviewModal(true);
                    }}
                    className="px-4 py-1 text-sm rounded-full cursor-pointer bg-amber-900/70"
                  >
                    View Reviews
                  </button>
                )}
              </div>
            </div>

            {user?.role === "student" ? (
              <div className="grid grid-cols-3 gap-4 py-3">
                <button
                  onClick={handleMessage}
                  className="flex items-center justify-center gap-2 py-3 bg-[#F5A623]/70 border cursor-pointer rounded-xl"
                >
                  <MessageCircle /> Message
                </button>
                <button
                  onClick={handleOpenModal}
                  className="flex items-center justify-center bg-[#F5A623]/70 gap-2 py-3 border cursor-pointer rounded-xl"
                >
                  <Calendar /> Book Visit
                </button>
                {hasRequested ? (
                  <button
                    onClick={handleCancelRequest}
                    className="flex items-center justify-center gap-2 py-3 border cursor-pointer bg-red-500/40 rounded-xl"
                  >
                    <Delete />
                    Cancel Request
                  </button>
                ) : (
                  <button
                    onClick={handleBookingRequest}
                    className="flex items-center justify-center gap-2 py-3 border cursor-pointer bg-[#F5A623]/70 rounded-xl"
                  >
                    <House />
                    Request Booking
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleDeleteListing}
                className="flex items-center justify-center w-full gap-4 px-4 py-3 mt-4 border cursor-pointer bg-red-600/40 rounded-xl"
              >
                {" "}
                <Trash /> Delete post
              </button>
            )}
          </div>

          {open && (
            <BookVisitModal listing={listing} onClose={handleCloseModal} />
          )}
          
          {reviewModal && (
            <ViewReviewsModal
              listing={listing}
              onClose={() => {
                setReviewModal(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
