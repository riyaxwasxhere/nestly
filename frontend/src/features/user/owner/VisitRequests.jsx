import React, { useState } from "react";
import VisitCard from "./VisitCard";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";

const tabs = [
  { title: "All Requests", count: 12 },
  { title: "Pending", count: 12 },
  { title: "Accepted", count: 12 },
  { title: "Rejected", count: 12 },
  { title: "Cancelled", count: 12 },
  { title: "Completed", count: 12 }
];

function VisitRequests() {
  const [tab, setTab] = useState("All Requests");
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/visits/ownerVisitRequests`,
          { withCredentials: true }
        );
        setRequests(response.data.visitRequests);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllRequests();
  }, [requests]);

  return (
    <div className="h-full px-10 py-4 overflow-y-auto pb-30 no-scrollbar ">
      <div className="flex items-center justify-between">
        <h2
          style={{ fontFamily: "Playfair Display, serif" }}
          className="mb-4 text-lg font-bold"
        >
          📅 Visit Requests
        </h2>
        <span className="text-xs text-[#867a5f]">0 visit requests</span>
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
        {requests.map((visit) => (
          <VisitCard key={visit._id} visit={visit}/>
        ))}
      </div>
    </div>
  );
}

export default VisitRequests;
