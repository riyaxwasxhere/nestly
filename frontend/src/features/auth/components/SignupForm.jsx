import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaGoogle,
  FaMobile,
  FaRegEye,
  FaRegEyeSlash
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setView } from "../../../redux/authSlice";
import axios from "axios";
import { serverUrl } from "../../../App";
import { setUserData } from "../../../redux/userSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import ClipLoader from "react-spinners/ClipLoader";

function SignupForm() {
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const dispatch = useDispatch();

  const getPasswordCheck = (pwd) => {
    if (!pwd) return null;
    const checks = {
      length: pwd.length >= 6,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      specialChar: /[!@#$%^&*,.?:{}|<>]/.test(pwd)
    };
    const passedChecks = Object.values(checks).filter(Boolean).length;
    return { checks, passedChecks };
  };

  const passwordStrength = getPasswordCheck(password);
  const strengthColors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];

  const validateForm = () => {
    const errors = {};
    if (!role) errors.role = "Please select a role";
    if (!fullName.trim()) errors.fullName = "Full name is required";
    if (!email.trim()) errors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]$/.test(email))
      errors.email = "Please enter a valid email address";
    if (!mobile.trim()) errors.mobile = "Mobile number is required";
    else if (!/^\+?[0-9\s]{10,15}$/.test(mobile))
      errors.mobile = "Please enter a valid mobile number";
    if (!password) errors.password = "Password is required";
    else if (!passwordStrength || passwordStrength.passedChecks < 5)
      errors.password =
        "Password must be 6+ chars with uppercase, number & special character";
    return errors;
  };

  const handleSignUp = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          mobile,
          password,
          role
        },
        { withCredentials: true }
      );
      dispatch(setUserData(response.data));
      setError("");
      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during sign up"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    console.log("Clicked google");
    if (!mobile || !role) {
      alert(
        "Please select your role and enter your mobile number to continue with Google authentication"
      );
      return;
    }
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      console.log("Firebase success: ", response.user);

      const result = await axios.post(
        `${serverUrl}/api/auth/signup/google-auth`,
        {
          fullname: response.user.displayName,
          email: response.user.email,
          password: response.user.uid,
          mobile,
          role
        },
        { withCredentials: true }
      );
      console.log("Google authentication successful:", result.data);
      dispatch(setUserData(result.data));

      setError("");
    } catch (error) {
      console.log("ERROR:", error);
      setError(
        error.message || "An error occurred during Google authentication"
      );
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ name }) =>
    fieldErrors[name] ? (
      <p className="mb-3 -mt-4 text-xs text-red-500">{fieldErrors[name]}</p>
    ) : null;

  const PasswordStrengthBar = () => {
    const level = passwordStrength?.passedChecks ?? 0;
    const color = strengthColors[Math.min(level, 4)];
    const filledSegments =
      level === 0
        ? 0
        : level === 1
          ? 1
          : level === 2
            ? 1
            : level === 3
              ? 2
              : level === 4
                ? 3
                : 4;
    return (
      <div className="flex gap-1 mb-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 h-1 transition-all duration-300 rounded-full"
            style={{
              backgroundColor: i <= filledSegments ? color : "#5a4626"
            }}
          />
        ))}
      </div>
    );
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

        <button
          onClick={() => handleGoogleAuth()}
          className="flex hover:bg-[#f5a52320] relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center hover:border-[#F5A623] transition-all duration-200 w-full justify-center cursor-pointer "
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
                onClick={() => setRole("student")}
                className={`flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full  cursor-pointer justify-center mb-5 ${role === "student" ? "border-[#F5A623]" : ""}`}
              >
                <div
                  className={`absolute backdrop-blur-sm z-2 inset-0 rounded-xl ${role === "student" ? "bg-[#e2b0313a]" : "bg-[#7c745f1a]"} `}
                ></div>
                <span className="z-9">🎓</span>
                <span
                  className={` text-sm z-9 ${role === "student" ? "text-[#F5A623]" : "text-[#f0e3c77c]"}`}
                >
                  Student
                </span>
              </button>
              <button
                onClick={() => setRole("owner")}
                className={`flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full cursor-pointer justify-center mb-5 ${role === "owner" ? "border-[#F5A623]" : ""}`}
              >
                <div
                  className={`absolute  backdrop-blur-sm z-2 inset-0 rounded-xl  ${role === "owner" ? "bg-[#e2b0313a]" : "bg-[#7c745f1a]"} `}
                ></div>
                <span className="z-9">🏠</span>
                <span
                  className={` text-sm z-9  ${role === "owner" ? "text-[#F5A623]" : "text-[#f0e3c77c]"}`}
                >
                  Property Owner
                </span>
              </button>
              {fieldErrors.role && (
                <p className="mb-1 -mt-5 text-xs text-red-500">
                  {fieldErrors.role}
                </p>
              )}
            </div>
          </div>

          <div className="text-[#f0e3c77c]">
            <label className="mb-3 text-xs font-semibold uppercase">
              full name
            </label>
            <div className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5 ">
              <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
              <input
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (e.target.value.trim())
                    setFieldErrors((p) => ({ ...p, fullName: "" }));
                }}
                className="flex justify-between flex-1 text-sm outline-0 z-9"
                type="text"
                placeholder="Aarav Sharma"
              />
            </div>
            <FieldError name="fullName" />
          </div>

          <div className="text-[#f0e3c77c]">
            <label className="mb-3 text-xs font-semibold uppercase">
              Email address
            </label>
            <div className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5 ">
              <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value.trim())
                    setFieldErrors((p) => ({ ...p, email: "" }));
                }}
                className="flex justify-between flex-1 text-sm outline-0 z-9"
                type="email"
                placeholder="you@college.edu"
              />
              <span className="text-sm z-9">
                <FaEnvelope />
              </span>
            </div>
            <FieldError name="email" />
          </div>

          <div className="text-[#f0e3c77c]">
            <label className="mb-3 text-xs font-semibold uppercase">
              mobile number
            </label>
            <div className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5 ">
              <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
              <input
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  if (e.target.value.trim())
                    setFieldErrors((p) => ({ ...p, mobile: "" }));
                }}
                className="flex justify-between flex-1 text-sm z-9 outline-0"
                type="text"
                placeholder="+91 98323 43733"
              />
              <span className="text-sm z-9">
                <FaMobile />
              </span>
            </div>
            <FieldError name="mobile" />
          </div>

          <div className="text-[#f0e3c77c]">
            <label className="mb-3 text-xs font-semibold uppercase">
              Password
            </label>
            <div className="flex  relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center w-full justify-center mb-5">
              <div className="absolute bg-[#6e6b6b1a] backdrop-blur-sm z-2 inset-0 rounded-xl"></div>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value)
                    setFieldErrors((p) => ({ ...p, password: "" }));
                }}
                className="flex justify-between flex-1 text-sm outline-0 z-9"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm cursor-pointer z-9"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            <PasswordStrengthBar />
            {password && passwordStrength && (
              <div className="flex flex-wrap mb-3 -mt-4 gap-x-3">
                {[
                  { key: "length", label: "6+ chars" },
                  { key: "uppercase", label: "Uppercase" },
                  { key: "lowercase", label: "Lowercase" },
                  { key: "number", label: "Number" },
                  { key: "specialChar", label: "Special char" }
                ].map(({ key, label }) => (
                  <span
                    key={key}
                    className="text-xs"
                    style={{
                      color: passwordStrength.checks[key]
                        ? "#22c55e"
                        : "#ef4444"
                    }}
                  >
                    {passwordStrength.checks[key] ? "✓" : "✗"} {label}
                  </span>
                ))}
              </div>
            )}
            <FieldError name="password" />
          </div>

          <label className="flex gap-2 my-5 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-amber-500" />
            <p className="text-xs text-[#f0e3c77c]">
              I agree to the
              <span className="text-[#F5A623]">
                Terms & Conditions
              </span> and <span className="text-[#F5A623]">Privacy Policy</span>{" "}
              of Nestly
            </p>
          </label>
          <button
            disabled={loading}
            onClick={() => handleSignUp()}
            className="flex relative rounded-xl py-3 px-4 border border-[#5a4626] gap-3 items-center hover:-translate-y-1 my-5 transition-all duration-400 w-full justify-center bg-[#F5A623] shadow-[0_0_25px_rgba(255,255,255,0.25)] font-semibold text-black cursor-pointer "
          >
            {loading ? (
              <ClipLoader size={20} color="#000" />
            ) : (
              <>
                Create My Account <ArrowRight size={20} strokeWidth={1.5} />
              </>
            )}
          </button>
          {error && (
            <p className="mb-2 -mt-4 text-sm text-center text-red-500">
              {error}
            </p>
          )}
          <pre className="flex justify-center text-xs font-sans text-[#f0e3c77c]">
            Already have an account?
            <span
              onClick={() => dispatch(setView("signin"))}
              className="text-[#F5A623] font-bold cursor-pointer"
            >
              Sign in
            </span>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
