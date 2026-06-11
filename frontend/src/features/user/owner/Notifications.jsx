import React from "react";
import NotificationCard from "../student/NotificationCard";

function Notifications() {
  return (
    <div className="px-4 py-6 sm:px-10 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2
          style={{ fontFamily: "Playfair Display, serif" }}
          className="text-base font-bold sm:text-lg"
        >
          🔔 Notifications
        </h2>
        <span className="text-xs text-[#867a5f]">5 Notifications</span>
      </div>
      <div className="flex flex-col gap-2">
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  );
}

export default Notifications;
