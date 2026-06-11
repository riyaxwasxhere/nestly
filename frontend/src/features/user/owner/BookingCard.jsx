import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../../redux/userSlice";
import { setOwnerView } from "../../../redux/ownerSlice";
import { serverUrl } from "../../../App";
import axios from "axios";
import { updateBookingStatus } from "../../../redux/bookingSlice";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";

function BookingCard({ booking }) {
  const dispatch = useDispatch();

  const handleMessage = () => {
    dispatch(setSelectedChat(booking.student));
    dispatch(setOwnerView("Messages"));
  };

  const handleAccept = async () => {
    try {
      await axios.put(
        `${serverUrl}/api/bookings/updateBookingStatus/${booking._id}`,
        { status: "Accepted" },
        { withCredentials: true }
      );
      dispatch(updateBookingStatus({ bookingId: booking._id, status: "Accepted" }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(
        `${serverUrl}/api/bookings/updateBookingStatus/${booking._id}`,
        { status: "Rejected" },
        { withCredentials: true }
      );
      dispatch(updateBookingStatus({ bookingId: booking._id, status: "Rejected" }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#261A0A] rounded-xl border border-[#5a462657] px-4 py-4 sm:px-6 flex flex-col sm:flex-row gap-4 sm:gap-0">
      <div className="flex flex-col justify-between flex-1 gap-4 sm:flex-row sm:gap-10 sm:pr-10">
        <div className="flex gap-3 sm:gap-6">
          <div className="rounded-full w-14 h-14 sm:w-20 sm:h-20 bg-amber-50 shrink-0">
            <img
              src={booking?.student?.profilePic}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1 text-xs sm:text-sm">
            <p className="font-semibold">{booking?.student?.fullname}</p>
            <p className="flex items-center gap-2 text-[#867a5f]">
              <Phone size={12} /> {booking?.student?.mobile}
            </p>
            <p className="flex items-center gap-2 text-[#867a5f]">
              <Mail size={12} /> {booking?.student?.email}
            </p>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-6">
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-red-50 rounded-xl shrink-0">
            <img
              src={booking?.listing?.photos?.[0]}
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-1 text-xs sm:text-sm">
            <p className="flex items-center gap-2 font-semibold">{booking.listing?.title}</p>
            <p className="flex items-center gap-2 text-[#867a5f]">
              <MapPin size={12} /> {booking.listing?.address?.locality},{" "}
              {booking.listing?.address?.city}
            </p>
            <p className="flex items-center gap-2 text-[#F5A623]">
              <FaRupeeSign size={12} /> {booking.listing?.pricePerMonth} / month
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col justify-between items-center sm:items-start border-t sm:border-t-0 sm:border-l border-[#5a462691] pt-3 sm:pt-0 sm:pl-10 gap-3 sm:gap-0">
        <span className="w-fit h-fit px-3 py-1 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs">
          {booking.status}
        </span>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button
            onClick={handleMessage}
            className="w-fit px-3 py-1 text-xs sm:text-sm rounded-lg cursor-pointer bg-[#989898]/20 border border-[#989898]/40 text-[#c7c6c6]"
          >
            Message
          </button>
          {booking.status === "Pending" && (
            <>
              <button
                onClick={handleAccept}
                className="w-fit px-3 py-1 text-xs sm:text-sm rounded-lg cursor-pointer bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623]"
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className="w-fit px-3 py-1 text-xs sm:text-sm rounded-lg cursor-pointer bg-[#f52323]/20 border border-[#f52323]/40 text-[#f52323]"
              >
                Decline
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingCard;