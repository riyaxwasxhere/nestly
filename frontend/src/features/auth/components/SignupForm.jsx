import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaGoogle,
  FaMobile,
  FaRegEye
} from "react-icons/fa";

function SignupForm() {
  const [activeRole, setActiveRole] = useState("");
  
  const handleActiveRole = (role) => {
    setActiveRole(role);
  };

  return (
    <div className="flex flex-col items-center flex-1 h-screen py-16 overflow-y-auto no-scrollbar">
      <div className="w-[50%]">
        <div>
          <h1
            style={{ fontFamily: "Playfair Display, serif" }}
            className="mb-3 text-4xl font-extrabold"
          >
            Join <span className="text-[#F5A623]">Nestly</span>
          </h1>
          <p className="text-[#f0e3c77c] text-sm  font-normal mb-10">
            Create your free account and find your perfect room
          </p>
        </div>

        <button className="flex hover:bg-[#f5a52320] relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center hover:border-[#F5A623] transition-all duration-200 w-full justify-center cursor-pointer ">
          <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm inset-0 rounded-xl "></div>
          <span className="z-9">
            <FaGoogle />
          </span>
          <span className="text-sm font-semibold z-9">Google</span>
        </button>
        <div className="flex items-center text-xs text-gray-400 my-7">
          <div className="flex-1 h-[0.1px] bg-[#5a4626]"></div>
          <span className="px-3 whitespace-nowrap uppercase  tracking-wider font-medium text-[#f0e3c77c]">
            or sign up with email
          </span>
          <div className="flex-1 h-[0.1px] bg-[#5a4626]"></div>
        </div>

        <div>
          <div>
            <p className="uppercase text-xs font-semibold mb-1 text-[#f0e3c77c]">
              I am a
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleActiveRole("student")}
                className={`flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5 ${activeRole === "student" ? "border-[#F5A623]" : ""}`}
              >
                <div
                  className={`absolute  backdrop-blur-sm z-2 inset-0 rounded-xl ${activeRole === "student" ? "bg-[#e2b0313a]" : "bg-[#7c745f1a]"} `}
                ></div>
                <span className="z-9">🎓</span>
                <span
                  className={` text-sm z-9 ${activeRole === "student" ? "text-[#F5A623]" : "text-[#f0e3c77c]"}`}
                >
                  Student
                </span>
              </button>
              <button
                onClick={() => handleActiveRole("owner")}
                className={`flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5 ${activeRole === "owner" ? "border-[#F5A623]" : ""}`}
              >
                <div
                  className={`absolute  backdrop-blur-sm z-2 inset-0 rounded-xl ${activeRole === "owner" ? "bg-[#e2b0313a]" : "bg-[#7c745f1a]"} `}
                ></div>
                <span className="z-9">🏠</span>
                <span
                  className={` text-sm z-9 ${activeRole === "owner" ? "text-[#F5A623]" : "text-[#f0e3c77c]"}`}
                >
                  Property Owner
                </span>
              </button>
            </div>
          </div>

          <div className="text-[#f0e3c77c]">
            <div>
              <label className="mb-3 text-xs font-semibold uppercase">first name</label>
              <div className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5 ">
                <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
                <input
                  className="flex justify-between flex-1 text-sm outline-0 z-9"
                  type="text"
                  placeholder="Aarav"
                />
              </div>
            </div>
            <div>
              <label className="mb-3 text-xs font-semibold uppercase">last name</label>
              <div className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5 ">
                <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
                <input
                  className="flex justify-between flex-1 text-sm outline-0 z-9"
                  type="text"
                  placeholder="Sharma"
                />
              </div>
            </div>
          </div>
          <div className="text-[#f0e3c77c]">
            <label className="mb-3 text-xs font-semibold uppercase">
              Email address
            </label>
            <div className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5 ">
              <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
              <input
                className="flex justify-between flex-1 text-sm outline-0 z-9"
                type="email"
                placeholder="you@college.edu"
              />
              <span className="text-sm z-9">
                <FaEnvelope />
              </span>
            </div>
          </div>
          <div className="text-[#f0e3c77c]">
            <label className="mb-3 text-xs font-semibold uppercase">phone number</label>
            <div className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5 ">
              <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
              <input
                className="flex justify-between flex-1 text-sm z-9 outline-0"
                type="phone"
                placeholder="+91 98323 43733"
              />
              <span className="text-sm z-9">
                <FaMobile />
              </span>
            </div>
          </div>

          <div className="text-[#f0e3c77c]">
            <label className="mb-3 text-xs font-semibold uppercase">Password</label>
            <div className="flex  relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-2">
              <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
              <input
                className="flex justify-between flex-1 text-sm outline-0 z-9"
                type="password"
                placeholder="Enter your password"
              />
              <span className="text-sm z-9">
                <FaRegEye />
              </span>
            </div>
          </div>
          <label className="flex gap-2 my-5 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-amber-500" />
            <p className="text-xs text-[#f0e3c77c]">
              I agree to the <span className="text-[#F5A623]">Terms & Conditions</span> and <span className="text-[#F5A623]">Privacy Policy</span> of Nestly
            </p>
          </label>
          <button className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center hover:-translate-y-1 my-5 transition-all duration-400 w-full justify-center bg-[#F5A623] shadow-[0_0_25px_rgba(255,255,255,0.25)] font-semibold text-black cursor-pointer ">
            Create My Account{" "}
            <ArrowRight size={20} strokeWidth={1.5} />
          </button>
          <pre className="flex justify-center text-xs font-sans text-[#f0e3c77c]">
            Already have an account?  
            <span className="text-[#F5A623] font-bold"> Sign in</span>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
