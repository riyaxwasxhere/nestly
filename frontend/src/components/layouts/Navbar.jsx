import React from "react";
import { FaUser } from "react-icons/fa";
import Logo from "../ui/Logo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute flex items-center justify-between w-full px-4 py-3 text-white border-b border-black sm:px-8 lg:px-10 z-100">
      <div>
        <Logo />
      </div>

      <div className="justify-between hidden gap-4 text-sm sm:flex lg:gap-10 lg:text-xl">
        <div className="px-3 py-1 border cursor-pointer lg:px-5 rounded-2xl">
          <h3>Find Room</h3>
        </div>
        <div className="px-3 py-1 border cursor-pointer lg:px-5 rounded-2xl">
          <h3>List Property</h3>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 lg:gap-6">
        <button
          onClick={() => navigate("/auth")}
          className="px-3 py-1 text-sm font-semibold transition-all duration-200 ease-in-out cursor-pointer lg:px-5 lg:text-base bg-amber-500 rounded-4xl border-3 hover:bg-amber-600"
        >
          <h3>Get Started</h3>
        </button>
        <button className="hidden p-2 bg-gray-600 rounded-full">
          <FaUser />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
