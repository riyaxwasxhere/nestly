import React, { useState } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaGoogle,
  FaRegEye,
  FaRegEyeSlash
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { serverUrl } from "../../../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setView } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../../redux/userSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password
        },
        { withCredentials: true }
      );
      dispatch(setUserData(response.data.user));
      if(response.data.user.role === "owner"){
        navigate("/owner/dashboard")
      }else{
        navigate("/student/dashboard")
      }
      console.log("Sign in successful:", response.data);
      setError("");
      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during sign in"
      );
      console.log("Error during sign in:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    console.log("clicked google");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      console.log("Firebase success: ", response.user);

      const result = await axios.post(
        `${serverUrl}/api/auth/signin/google-auth`,
        {
          email: response.user.email,
          password: response.user.uid
        },
        { withCredentials: true }
      );
      console.log("Google authentication successful:", result.data);
      dispatch(setUserData(result.data));
      if(result.data.user.role === "owner"){
        navigate("/owner/dashboard")
      }else{
        navigate("/student/dashboard")
      }
      setError("");
      setLoading(false);
    } catch (error) {
      console.log("ERROR: ", error);
      setError(
        error.message || "An error occurred during Google authentication"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center flex-1 h-full py-16 no-scrollbar">
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
        <button
          onClick={() => handleGoogleAuth()}
          className="flex hover:bg-[#f5a52320] relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center hover:border-[#F5A623] transition-all duration-200 w-full justify-center cursor-pointer"
        >
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
            <label
              htmlFor="email"
              className="mb-3 text-xs font-semibold uppercase"
            >
              Email address
            </label>
            <div className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5 ">
              <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <label
              htmlFor="password"
              className="mb-3 text-xs font-semibold uppercase"
            >
              Password
            </label>
            <div className="flex  relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-2">
              <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex justify-between flex-1 text-sm outline-0 z-9"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
              />
              <span
                className="text-sm cursor-pointer z-9"
                onClick={() => setShowPass(!showPass)}
              >
                {!showPass ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>
          <p
            onClick={() => navigate("/auth/forgot-password")}
            className="text-xs font-semibold text-[#F5A623] flex justify-end cursor-pointer"
          >
            Forgot Password?
          </p>
          <button
            onClick={() => handleSignIn()}
            disabled={loading}
            className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center hover:-translate-y-1 my-5 transition-all duration-400 w-full justify-center bg-[#F5A623] shadow-[0_0_25px_rgba(255,255,255,0.25)] font-semibold text-black "
          >
            Sign In to Nestly
            <ArrowRight size={20} strokeWidth={1.5} />
          </button>
          {error && (
            <p className="mb-2 -mt-4 text-sm text-center text-red-500">
              {error}
            </p>
          )}
          <pre className="flex justify-center font-sans text-xs">
            New to Nestly?{" "}
            <span
              onClick={() => dispatch(setView("signup"))}
              className="text-[#F5A623] font-bold cursor-pointer"
            >
              Create an account
            </span>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
