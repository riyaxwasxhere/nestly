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
      const response = await axios.post(
        `${serverUrl}/api/visits/requestVisit`,
        {
          listingId: listing._id,
          visitDate,
          message
        },
        { withCredentials: true }
      );

      console.log(response.data);
      alert("Visit request sent successfully");
      onClose();
    } catch (error) {
      alert(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="relative w-[500px]  overflow-y-auto  no-scrollbar rounded-3xl bg-[#2c1402] p-6 shadow-2xl border">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Book a Visit</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#53453595] backdrop-blur-md"
          >
            <X className="w-5 h-5 text-white cursor-pointer" />
          </button>
        </div>
        <p className="my-2 text-sm italic">
          Schedule a visit to explore the property in person.
        </p>
        <div className="flex flex-col gap-2 my-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Calendar size={16} />
            Visit date
          </label>
          <DatePicker
            selected={visitDate}
            minDate={new Date()}
            onChange={(date) => setVisitDate(date)}
            className="w-full px-4 py-3 text-white border bg-[#53453547] border-[#4a3720] rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2 my-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <MessageCircle size={16} />
            Message <span className="font-extralight">(optional)</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a note for the owner..."
            rows={4}
            className="w-full px-4 py-3 transition-all border outline-none resize-none bg-[#53453547] border-[#4a3720] rounded-2xl"
          ></textarea>
        </div>
        <button
          disabled={loading}
          onClick={handleSendRequest}
          className="
    w-full px-4 py-3
    transition-all
    border outline-none
    cursor-pointer
    bg-[#F5A623]/70
    border-[#4a3720]
    rounded-2xl
    disabled:opacity-50
  "
        >
          {loading ? "Sending..." : "Request visit"}
        </button>
      </div>
    </div>
  );
}

export default BookVisitModal;
