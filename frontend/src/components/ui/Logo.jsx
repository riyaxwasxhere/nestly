import React from "react";
import logo from "../../assets/images/logo.jpg";

function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div
        className="h-8 w-8 sm:h-10 sm:w-10 bg-center rounded-full bg-size-[180%] shrink-0"
        style={{ backgroundImage: `url(${logo})` }}
      ></div>
      <h3 className="text-xl font-extrabold sm:text-2xl text-amber-500">
        Nestly
      </h3>
    </div>
  );
}

export default Logo;
