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

  const pendingCount = requests.filter(
    (req) => req.status === "Pending"
  ).length;
  const acceptedCount = requests.filter(
    (req) => req.status === "Accepted"
  ).length;
  const rejectedCount = requests.filter(
    (req) => req.status === "Rejected"
  ).length;

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
    <div className="h-full px-10 py-4 overflow-y-auto pb-30 no-scrollbar ">
      <div className="flex items-center justify-between">
        <h2
          style={{ fontFamily: "Playfair Display, serif" }}
          className="mb-4 text-lg font-bold"
        >
          📅 Booking Requests
        </h2>
        <span className="text-xs text-[#867a5f]">
          {pendingCount} pending requests
        </span>
      </div>
      <ul className="flex gap-10">
        {tabs.map((t) => (
          <li
            onClick={() => {
              setTab(t.title);
            }}
            className={`${tab === t.title && `text-[#F5A623] border-b pb-2 font-semibold scale-100`} cursor-pointer transition-all duration-300 scale-85 textlg `}
          >
            {t.title} <span>{t.count}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 my-6">
        {filteredRequests?.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

export default BookingRequests;
