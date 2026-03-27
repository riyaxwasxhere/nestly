import React from "react";
import { FaArrowRight, FaEnvelope, FaGoogle, FaRegEye } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

function SignInForm() {
  return (
    <div className="flex flex-col items-center flex-1 h-full py-16">
      <div className="w-[50%] ">
        <div>
          <h1
            style={{ fontFamily: "Playfair Display, serif" }}
            className="mb-3 text-4xl font-extrabold"
          >
            Welcome <span className="text-[#F5A623]">Back!</span>
          </h1>
          <p className="text-[#f0e3c77c] text-sm  font-normal mb-10">
            Sign in to find your perfect stay near campus
          </p>
        </div>
        <button className="flex hover:bg-[#f5a52320] relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center hover:border-[#F5A623] transition-all duration-200 w-full justify-center ">
          <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm inset-0 rounded-xl "></div>
          <span className="z-9">
            <FaGoogle />
          </span>
          <span className="text-sm font-semibold z-9">Google</span>
        </button>
        <div className="flex items-center text-xs text-gray-400 my-7">
          <div className="flex-1 h-[0.1px] bg-[#5a4626]"></div>
          <span className="px-3 whitespace-nowrap uppercase  tracking-wider font-medium text-[#f0e3c77c]">
            or continue with email
          </span>
          <div className="flex-1 h-[0.1px] bg-[#5a4626]"></div>
        </div>

        <div className="text-[#f0e3c77c]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase">
              Email address
            </p>
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
          <div>
            <p className="mb-3 text-xs font-semibold uppercase">Password</p>
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
          <p className="text-xs font-semibold text-[#F5A623] flex justify-end">
            Forgot Password?
          </p>
          <button className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center hover:-translate-y-1 my-5 transition-all duration-400 w-full justify-center bg-[#F5A623] shadow-[0_0_25px_rgba(255,255,255,0.25)] font-semibold text-black ">
            Sign In to Nestly
            <ArrowRight size={20} strokeWidth={1.5} />
          </button>
          <pre className="flex justify-center font-sans text-xs">
            New to Nestly?{" "}
            <span className="text-[#F5A623] font-bold">Create an account</span>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
