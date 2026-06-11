import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../../redux/userSlice";
import { setOwnerView } from "../../../redux/ownerSlice";
import axios from "axios";
import { serverUrl } from "../../../App";
import { updateVisitStatus } from "../../../redux/visitSlice";

function VisitCard({ visit }) {
  const dispatch = useDispatch();

  const handleMessage = () => {
    dispatch(setSelectedChat(visit.student));
    dispatch(setOwnerView("Messages"));
  };

  const handleAccept = async () => {
    try {
      await axios.put(
        `${serverUrl}/api/visits/updateRequestStatus/${visit._id}`,
        { status: "Accepted" },
        { withCredentials: true }
      );
      dispatch(updateVisitStatus({ visitId: visit._id, status: "Accepted" }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(
        `${serverUrl}/api/visits/updateRequestStatus/${visit._id}`,
        { status: "Rejected" },
        { withCredentials: true }
      );
      dispatch(updateVisitStatus({ visitId: visit._id, status: "Rejected" }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async () => {
    try {
      await axios.put(
        `${serverUrl}/api/visits/updateRequestStatus/${visit._id}`,
        { status: "Completed" },
        { withCredentials: true }
      );
      dispatch(updateVisitStatus({ visitId: visit._id, status: "Completed" }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      await axios.put(
        `${serverUrl}/api/visits/updateRequestStatus/${visit._id}`,
        { status: "Cancelled" },
        { withCredentials: true }
      );
      dispatch(updateVisitStatus({ visitId: visit._id, status: "Cancelled" }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#261A0A] rounded-xl border border-[#5a462657] px-4 sm:px-6 py-4 flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-0">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:pr-10">
        <div className="flex gap-3 sm:gap-6">
          <div className="rounded-full w-14 h-14 sm:w-20 sm:h-20 bg-amber-50 shrink-0">
            <img
              src={visit?.student?.profilePic}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1 text-xs sm:text-sm">
            <p className="font-semibold">{visit?.student?.fullname}</p>
            <p className="flex items-center gap-2 text-[#867a5f]">
              <Phone size={12} /> {visit?.student?.mobile}
            </p>
            <p className="flex items-center gap-2 text-[#867a5f]">
              <Mail size={12} /> {visit?.student?.email}
            </p>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-6">
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-red-50 rounded-xl shrink-0">
            <img
              src={visit?.listing?.photos?.[0]}
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-1 text-xs sm:text-sm">
            <p className="font-semibold">{visit.listing?.title}</p>
            <p className="flex items-center gap-2 text-[#867a5f]">
              <MapPin size={12} /> {visit.listing?.address?.locality},{" "}
              {visit.listing?.address?.city}
            </p>
            <p className="flex items-center gap-2 text-[#F5A623]">
              <FaRupeeSign size={12} /> {visit.listing?.pricePerMonth} / month
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between border-t sm:border-t-0 sm:border-l border-[#5a462691] pt-3 sm:pt-0 sm:pl-10 gap-3 sm:gap-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1 pb-2">
            <p className="flex items-center gap-2 text-xs sm:text-sm">
              <Calendar size={13} />
              {visit.visitDate?.split("T")?.[0]}
            </p>
            {visit.message && (
              <p className="text-xs sm:text-sm italic text-[#867a5f]">
                Note: "{visit.message}"
              </p>
            )}
          </div>
          <span className="w-fit h-fit px-3 py-1 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs shrink-0">
            {visit.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button
            onClick={handleMessage}
            className="w-fit px-3 py-1 text-xs sm:text-sm rounded-lg cursor-pointer bg-[#989898]/20 border border-[#989898]/40 text-[#c7c6c6]"
          >
            Message
          </button>
          {visit.status === "Pending" && (
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
          {visit.status === "Accepted" && (
            <>
              <button
                onClick={handleComplete}
                className="w-fit px-3 py-1 text-xs sm:text-sm rounded-lg cursor-pointer bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623]"
              >
                Complete
              </button>
              <button
                onClick={handleCancel}
                className="w-fit px-3 py-1 text-xs sm:text-sm rounded-lg cursor-pointer bg-[#f52323]/20 border border-[#f52323]/40 text-[#f52323]"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VisitCard;
