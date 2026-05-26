import React from 'react'
import { Calendar, House, MessageCircle, X } from "lucide-react";

function ListingDetails() {
  return (
    <div className="h-screen pb-20 overflow-y-auto no-scrollbar">
      <div className=" h-120">
        <div className="flex justify-between px-10 py-3">
          <span className="px-3 py-1 border rounded-2xl">Open</span>
          <X className="cursor-pointer" />
        </div>
        <img src="" alt="" />
      </div>

      <div className="p-10 ">
        <div className="flex justify-between pb-3 border-b border-[#3d2b0f]">
          <div>
            <h2
              style={{ fontFamily: "Playfair Display, serif" }}
              className="text-2xl font-semibold text-[#F5A623]"
            >
              The Oak Loft
            </h2>
            <p className="text-sm">📍 Subhash Nagar, Siliguri </p>
          </div>
          <div className="flex flex-col items-end ">
            <p
              style={{ fontFamily: "Playfair Display, serif" }}
              className="text-3xl font-semibold"
            >
              ₹6,500
            </p>
            <p className="text-sm">per month</p>
          </div>
        </div>

        <div className="border-b border-[#3d2b0f] py-3 flex gap-2">
          <span className="px-4 py-1 rounded-full">Single Room</span>
          <span className="px-4 py-1 rounded-full">Single Room</span>
          <span className="px-4 py-1 rounded-full">Single Room</span>
        </div>

        <div className="py-3  border-b border-[#3d2b0f]">
          <p className="pb-2 text-sm uppercase">Amenities</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="px-4 py-3 rounded-2xl">High speed wifi</div>
            <div className="px-4 py-3 rounded-2xl">High speed wifi</div>
            <div className="px-4 py-3 rounded-2xl">High speed wifi</div>
            <div className="px-4 py-3 rounded-2xl">High speed wifi</div>
            <div className="px-4 py-3 rounded-2xl">High speed wifi</div>
            <div className="px-4 py-3 rounded-2xl">High speed wifi</div>
          </div>
        </div>

        <div className="py-3  border-b border-[#3d2b0f]">
          <p className="text-[16px] uppercase">about this place</p>
          <p className="text-sm">
            A cozy, sunlit single room on the second floor with large windows
            and a wooden study desk. Quiet neighbourhood, ideal for students.
            All utilities included in rent.
          </p>
        </div>

        <div className="flex items-center justify-between py-3 ">
          <div className="flex gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F5A623]">
              SR
            </div>
            <div className="flex flex-col ">
              <h3 className="text-lg">Surekha Rao</h3>
              <p className="text-sm leading-2">Posted on: date</p>
            </div>
          </div>
          <span className="px-4 py-1 text-sm bg-green-900 rounded-full">
            ⭐ 4.8 · 23 reviews{" "}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-3">
          <div className="flex items-center justify-center gap-2 py-3 border cursor-pointer rounded-xl">
            <MessageCircle /> Message
          </div>
          <div className="flex items-center justify-center gap-2 py-3 border cursor-pointer rounded-xl">
            <Calendar /> Book Visit
          </div>
          <div className="flex items-center justify-center gap-2 py-3 border cursor-pointer rounded-xl">
            <House /> Book Property
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetails
