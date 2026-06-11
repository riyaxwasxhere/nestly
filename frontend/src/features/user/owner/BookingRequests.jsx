import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../../../redux/bookingSlice";
import BookingCard from "./BookingCard";

function BookingRequests() {
  const [tab, setTab] = useState("All Requests");
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.booking?.bookings);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/bookings/getAllRequests`,
          { withCredentials: true }
        );
        dispatch(setBookings(response.data.requests));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllRequests();
  }, [dispatch]);

  const pendingCount = requests.filter((req) => req.status === "Pending").length;
  const acceptedCount = requests.filter((req) => req.status === "Accepted").length;
  const rejectedCount = requests.filter((req) => req.status === "Rejected").length;

  const tabs = [
    { title: "All Requests", count: requests.length },
    { title: "Pending", count: pendingCount },
    { title: "Accepted", count: acceptedCount },
    { title: "Rejected", count: rejectedCount }
  ];

  const filteredRequests =
    tab === "All Requests"
      ? requests
      : requests.filter((req) => req.status === tab);

  return (
    <div className="h-full px-4 py-4 overflow-y-auto sm:px-10 pb-30 no-scrollbar">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          style={{ fontFamily: "Playfair Display, serif" }}
          className="mb-2 text-base font-bold sm:mb-4 sm:text-lg"
        >
          📅 Booking Requests
        </h2>
        <span className="text-xs text-[#867a5f] mb-2 sm:mb-4">
          {pendingCount} pending requests
        </span>
      </div>

      <ul className="flex gap-4 pb-1 overflow-x-auto sm:gap-10 no-scrollbar">
        {tabs.map((t) => (
          <li
            key={t.title}
            onClick={() => setTab(t.title)}
            className={`shrink-0 cursor-pointer transition-all duration-300 text-sm sm:text-base ${
              tab === t.title
                ? "text-[#F5A623] border-b border-[#F5A623] pb-2 font-semibold"
                : "text-[#867a5f] scale-95"
            }`}
          >
            {t.title} <span>{t.count}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 my-4 sm:my-6">
        {filteredRequests?.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

export default BookingRequests;