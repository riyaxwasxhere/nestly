import React, { useEffect, useState } from "react";
import VisitCard from "./VisitCard";
import axios from "axios";
import { serverUrl } from "../../../App";

function ScheduledVisits() {
  const [visits, setVisits] = useState([]);
  
  useEffect(() => {
    const fetchVisitRequests = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/visits/studentVisitRequests`,
          {
            withCredentials: true
          }
        );

        setVisits(response.data.visitRequests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVisitRequests();
  }, []);


  const handleCancel = async (visitRequestId) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/visits/cancelRequest/${visitRequestId}`,
        {
          withCredentials: true
        }
      );

      alert(response.data.message);

      setVisits((prev) => prev.filter((visit) => visit._id !== visitRequestId));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-full px-10 py-4 overflow-y-auto pb-30 no-scrollbar">
      <div className="flex items-center justify-between mb-4">
        <h2
          style={{ fontFamily: "Playfair Display, serif" }}
          className="text-lg font-bold text-[#F0E8D8]"
        >
          📅 Scheduled Visits
        </h2>

        <span className="text-sm text-[#867a5f]">
          {visits.length} results found
        </span>
      </div>

      <div className="space-y-4">
        {visits.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-[#867a5f]">
            No visits scheduled yet
          </div>
        ) : (
          visits.map((visit) => (
            <VisitCard
              key={visit._id}
              visitRequest={visit}
              onCancel={handleCancel}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ScheduledVisits;
