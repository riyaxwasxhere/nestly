import { Calendar, MessageCircle, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { serverUrl } from "../../../App";

function BookVisitModal({ listing, onClose }) {
  const [visitDate, setVisitDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!listing) return null;

  const handleSendRequest = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${serverUrl}/api/visits/requestVisit`,
        { listingId: listing._id, visitDate, message },
        { withCredentials: true }
      );
      alert("Visit request sent successfully");
      onClose();
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] px-0 sm:px-4">
      <div className="relative w-full sm:w-[500px] max-h-[90vh] overflow-y-auto no-scrollbar rounded-t-3xl sm:rounded-3xl bg-[#2c1402] p-5 sm:p-6 shadow-2xl border">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold sm:text-2xl">Book a Visit</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#53453595] backdrop-blur-md"
          >
            <X className="w-4 h-4 text-white cursor-pointer sm:w-5 sm:h-5" />
          </button>
        </div>

        <p className="my-2 text-xs sm:text-sm italic text-[#867a5f]">
          Schedule a visit to explore the property in person.
        </p>

        <div className="flex flex-col gap-2 my-2">
          <label className="flex items-center gap-2 text-xs font-medium sm:text-sm">
            <Calendar size={15} />
            Visit date
          </label>
          <DatePicker
            selected={visitDate}
            minDate={new Date()}
            onChange={(date) => setVisitDate(date)}
            className="w-full px-4 py-3 text-white border bg-[#53453547] border-[#4a3720] rounded-xl text-sm"
          />
        </div>

        <div className="flex flex-col gap-2 my-2">
          <label className="flex items-center gap-2 text-xs font-medium sm:text-sm">
            <MessageCircle size={15} />
            Message <span className="font-extralight">(optional)</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a note for the owner..."
            rows={4}
            className="w-full px-4 py-3 text-sm transition-all border outline-none resize-none bg-[#53453547] border-[#4a3720] rounded-2xl"
          />
        </div>

        <button
          disabled={loading}
          onClick={handleSendRequest}
          className="w-full px-4 py-3 border outline-none cursor-pointer bg-[#F5A623]/70 border-[#4a3720] rounded-2xl disabled:opacity-50 text-sm font-semibold mt-1"
        >
          {loading ? "Sending..." : "Request visit"}
        </button>
      </div>
    </div>
  );
}

export default BookVisitModal;
