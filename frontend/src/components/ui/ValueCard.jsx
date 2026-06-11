import React from "react";

const ValueCard = (props) => {
  return (
    <div className="flex items-center justify-between gap-3 p-4 bg-white/20 rounded-2xl sm:p-5">
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold sm:text-xl">{props.heading}</h3>
        <p className="mt-1 text-xs sm:text-sm">{props.text}</p>
      </div>
      <div
        className="w-16 h-16 bg-center bg-cover rounded-lg sm:h-20 sm:w-20 shrink-0"
        style={{ backgroundImage: `url(${props.photo})` }}
      ></div>
    </div>
  );
};

export default ValueCard;
