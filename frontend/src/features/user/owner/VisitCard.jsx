import { Calendar, DollarSign, Mail, MapPin, Phone } from "lucide-react";
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

      dispatch(
        updateVisitStatus({
          visitId: visit._id,
          status: "Accepted"
        })
      );
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

      dispatch(
        updateVisitStatus({
          visitId: visit._id,
          status: "Rejected"
        })
      );
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

      dispatch(
        updateVisitStatus({
          visitId: visit._id,
          status: "Completed"
        })
      );
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

      dispatch(
        updateVisitStatus({
          visitId: visit._id,
          status: "Cancelled"
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#261A0A] rounded-xl  border border-[#5a462657] px-6 py-4 grid grid-cols-2">
      <div className="flex justify-between pr-10">
        <div className="flex gap-6">
          <div className="w-20 h-20 rounded-full bg-amber-50">
            <img
              src={visit?.student?.profilePic}
              className="object-cover overflow-hidden rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>{visit?.student?.fullname}</p>
            <p className="flex items-center gap-2">
              <Phone size={14} /> {visit?.student?.mobile}
            </p>
            <p className="flex items-center gap-2 ">
              <Mail size={14} /> {visit?.student?.email}
            </p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="w-20 h-20 bg-red-50 rounded-xl">
            <img
              src={visit?.listing?.photos?.[0]}
              className="object-cover overflow-hidden rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2">{visit.listing?.title}</p>
            <p className="flex items-center gap-2">
              <MapPin size={14} /> {visit.listing?.address?.locality},{" "}
              {visit.listing?.address?.city}
            </p>
            <p className="flex items-center gap-2 text-[#F5A623]">
              <FaRupeeSign size={14} /> {visit.listing?.pricePerMonth} / month
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between border-l border-[#5a462691] pl-10">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 pb-2">
            <p className="flex items-center gap-2">
              <Calendar size={14} />
              {visit.visitDate?.split("T")?.[0]}
            </p>
            {visit.message && (
              <p className="text-sm italic">Note: "{visit.message}"</p>
            )}
          </div>
          <span className="w-fit h-fit px-4 py-1 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs">
            {visit.status}
          </span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleMessage}
            className={`w-fit px-4 py-1 rounded-lg cursor-pointer
             bg-[#989898]/20 border border-[#989898]/40 text-[#c7c6c6]`}
          >
            Message
          </button>
          {visit.status === "Pending" && (
            <>
              <button
                onClick={handleAccept}
                className={`w-fit px-4 py-1 rounded-lg cursor-pointer
             bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623]`}
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className={`w-fit px-4 py-1 rounded-lg cursor-pointer
             bg-[#f52323]/20 border border-[#f52323]/40 text-[#f52323]`}
              >
                Decline
              </button>
            </>
          )}
          {visit.status === "Accepted" && (
            <>
              <button
                onClick={handleComplete}
                className={`w-fit px-4 py-1 rounded-lg cursor-pointer
             bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623]`}
              >
                Complete
              </button>
              <button
                onClick={handleCancel}
                className={`w-fit px-4 py-1 rounded-lg cursor-pointer
             bg-[#f52323]/20 border border-[#f52323]/40 text-[#f52323]`}
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
