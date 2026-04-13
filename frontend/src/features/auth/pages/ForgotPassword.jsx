import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Logo from "../../../components/ui/Logo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFpStep, setView } from "../../../redux/authSlice";
import axios from "axios";
import { serverUrl } from "../../../App";
import { useRef } from "react";
function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const step = useSelector((state) => state.auth.fpStep);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      dispatch(setFpStep(2));
      console.log("OTP sent successfully: ", response.data);
      setError("");
    } catch (error) {
      console.log("ERROR: ", error);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      console.log("EMAIL:", email);
      console.log("OTP:", otp.join(""));
      const response = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp: otp.join("") },
        { withCredentials: true }
      );
      
      dispatch(setFpStep(3));
      console.log("OTP verified successfully: ", response.data);
      setError("");
    } catch (error) {
      console.log("ERROR: ", error);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, otp: otp.join(""), newPassword: newPass },
        { withCredentials: true }
      );
      dispatch(setFpStep(4));
      console.log("Password reset successfully: ", response.data);
      setError("");
    } catch (error) {
      console.log("ERROR: ", error);
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className=" h-20 flex shrink-0 justify-between items-center px-11 border-b  border-[#352101] backdrop-blur-xl sticky top-0 z-50 bg-[#0E0A07]">
        <Logo />
        <button
          onClick={() => {
            navigate("/auth");
            dispatch(setView("signin"));
          }}
          className="text-[#8c7c66] cursor-pointer border border-[#6a5c4858] py-2 rounded-full bg-[#211608] px-4 font-semibold items-center text-xs flex gap-2 hover:border-[#DC901C] hover:text-[#DC901C] transition-all duration-200"
        >
          <ArrowLeft size={16} /> <span>Back to Sign In</span>
        </button>
      </nav>
      <main className="relative z-10 flex items-center justify-center flex-1 min-h-screen px-24 pt-7 pb-12 bg-[#0E0A07]">
        <div className="bg-[#211608] md:w-[45%] max-w-[90%] border rounded-3xl border-[#563501] py-10 flex flex-col items-center px-10">
          <div className="flex items-baseline justify-between mb-8 text-[#8c7c66] text-xs font-semibold uppercase w-[60%]">
            <div className="flex flex-col items-center gap-1">
              <div className="border border-[#8c7c66] rounded-full w-8 h-8 flex items-center justify-center">
                1
              </div>
              <div>Email</div>
            </div>
            <div className="h-[1.5px] bg-[#8c7c66] flex-1 rounded-full mx-1"></div>
            <div className="flex flex-col items-center gap-1">
              <div className="border border-[#8c7c66] rounded-full w-8 h-8 flex items-center justify-center">
                2
              </div>
              <div>Verify</div>
            </div>
            <div className="h-[1.5px] bg-[#8c7c66] flex-1 rounded-full mx-1"></div>
            <div className="flex flex-col items-center gap-1">
              <div className="border border-[#8c7c66] rounded-full w-8 h-8 flex items-center justify-center">
                3
              </div>
              <div>Reset</div>
            </div>
          </div>

          {step === 1 && (
            <div>
              <div className="flex justify-center m">
                <div className="text-4xl bg-[#302009] flex items-center justify-center w-18 h-18 rounded-3xl border border-[#573605]">
                  🔐
                </div>
              </div>
              <div className="flex flex-col items-center text-center my-7">
                <h2
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-[#F0E8D8] text-3xl font-black mb-2"
                >
                  Forgot your{" "}
                  <span className="text-[#DC901C]">Password?</span>{" "}
                </h2>
                <p className="text-sm text-[#8c7c66]">
                  No worries! Enter the email address linked to your Nestly
                  account and we'll send you a 6-digit verification code.
                </p>
              </div>
              <div>
                <label
                  className="text-[#8c7c66] uppercase text-xs font-bold"
                  htmlFor="email"
                >
                  email address
                </label>
                <div className="flex gap-3 mt-1 bg-[#2A1F12] px-4 py-3 rounded-xl border border-[#563501]">
                  <span>✉️</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-[#8c7c66] text-sm outline-0 flex-1"
                    id="email"
                    type="text"
                    placeholder="you@college.edu"
                  />
                </div>
                <div className="flex flex-col ">
                  <button
                    onClick={() => handleSendOtp()}
                    className=" bg-[#DC901C] mt-4 mb-3 rounded-xl py-3 text-[16px] font-semibold cursor-pointer hover:shadow-[#dc8f1c3c] shadow-xl"
                  >
                    Send Verification Code →
                  </button>
                  {error && (
                    <p className="mt-2 text-sm text-center text-red-500">
                      {error}
                    </p>
                  )}
                  <button
                    onClick={() => {
                      navigate("/auth");
                      dispatch(setView("signin"));
                    }}
                    className="mb-2 rounded-xl py-3 text-[16px] cursor-pointer font-semibold border border-[#563501] text-[#8c7c66] hover:text-[#DC901C] hover:border-[#DC901C] transition-all duration-200"
                  >
                    ← Back to Sign In
                  </button>
                </div>
                <p className="my-2 text-xs text-center text-[#8c7c66]">
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      navigate("/auth");
                      dispatch(setView("signup"));
                    }}
                    className="text-[#DC901C] font-semibold cursor-pointer hover:underline"
                  >
                    Sign up free
                  </span>
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex justify-center">
                <div className="text-4xl bg-[#302009] flex items-center justify-center w-18 h-18 rounded-3xl border border-[#573605]">
                  📨
                </div>
              </div>

              <div className="flex flex-col items-center text-center my-7">
                <h2
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-[#F0E8D8] text-3xl font-black mb-2"
                >
                  Check your <span className="text-[#DC901C]">Email</span>
                </h2>
                <p className="text-sm text-[#8c7c66]">
                  We've sent a 6-digit code to{" "}
                  <span className="font-bold">{email}</span>
                </p>
                <p className="text-sm text-[#8c7c66]">
                  Enter it below to continue.
                </p>
              </div>
              <div className="flex justify-center gap-3 mb-6 ">
                {/* <input
                  value={otp[0]}
                  onChange={(e) => handleOtpChange(e.target.value, 0)}
                  maxLength={1}
                  type="text"
                  className="h-16 text-xl bg-[#2A1F12] border-[#573605] font-bold text-center  border w-14 rounded-xl text-[#DC901C] outline-0  transition-all duration-150 "
                /> */}
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    type="text"
                    className="h-16 text-xl bg-[#2A1F12] border-[#573605] font-bold text-center  border w-14 rounded-xl text-[#DC901C] outline-0  transition-all duration-150"
                  />
                ))}
              </div>
              <p className="text-[#8c7c66] text-center text-xs">
                Didn't receive the code?{" "}
                <span className="text-[#DC901C] font-medium cursor-pointer">
                  Resend Code
                </span>
              </p>

              <div className="flex flex-col gap-3 my-3">
                <button
                  onClick={() => handleVerifyOtp()}
                  className=" bg-[#DC901C] mt-4 mb-3 rounded-xl py-3 text-[16px] font-semibold cursor-pointer hover:shadow-[#dc8f1c3c] shadow-xl"
                >
                  Verify Code →
                </button>
                {error && (
                  <p className="mt-2 text-sm text-center text-red-500">
                    {error}
                  </p>
                )}
                <button
                  onClick={() => {
                    dispatch(setFpStep(1));
                  }}
                  className="mb-2 rounded-xl py-3 text-[16px] cursor-pointer font-semibold border border-[#563501] text-[#8c7c66] hover:text-[#DC901C] hover:border-[#DC901C] transition-all duration-200"
                >
                  ← Change email address
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex justify-center">
                <div className="text-4xl bg-[#302009] flex items-center justify-center w-18 h-18 rounded-3xl border border-[#573605]">
                  🔑
                </div>
              </div>
              <div className="flex flex-col items-center text-center my-7">
                <h2
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-[#F0E8D8] text-3xl font-black mb-2"
                >
                  Set New <span className="text-[#DC901C]">Password</span>
                </h2>
                <p className="text-sm text-[#8c7c66]">
                  Almost there! Choose a strong password for your Nestly
                  account. Make it unique and secure.
                </p>
              </div>
              <div>
                <label
                  className="text-[#8c7c66] uppercase text-xs font-bold"
                  htmlFor="newPass"
                >
                  New Password
                </label>
                <div className="flex gap-3 mt-1 bg-[#2A1F12] px-4 py-3 rounded-xl border border-[#563501]">
                  <span>🔒</span>
                  <input
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="text-[#8c7c66] text-sm outline-0 flex-1"
                    id="newPass"
                    type="text"
                    placeholder="Create a strong password"
                  />
                </div>
              </div>
              <div>
                <label
                  className="text-[#8c7c66] uppercase text-xs font-bold"
                  htmlFor="confirmPass"
                >
                  Confirm Password
                </label>
                <div className="flex gap-3 mt-1 bg-[#2A1F12] px-4 py-3 rounded-xl border border-[#563501]">
                  <span>🔏</span>
                  <input
                    value={confirmPass}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="text-[#8c7c66] text-sm outline-0 flex-1"
                    id="confirmPass"
                    type="text"
                    placeholder="Repeat your password"
                  />
                </div>
              </div>
              <button
                onClick={() => handleResetPassword()}
                className=" bg-[#DC901C] mt-4 mb-3 rounded-xl py-3 text-[16px] font-semibold cursor-pointer hover:shadow-[#dc8f1c3c] shadow-xl flex w-full items-center justify-center"
              >
                Reset Password →
              </button>
              {error && (
                <p className="mt-2 text-sm text-center text-red-500">{error}</p>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="flex justify-center">
                <div className="text-4xl bg-[#4caf7720] flex items-center justify-center w-25 h-25 rounded-full border border-[#4CAF77]">
                  🎉
                </div>
              </div>
              <div className="flex flex-col items-center text-center my-7">
                <h2
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-[#F0E8D8] text-3xl font-black mb-2"
                >
                  Password <span className="text-[#DC901C]">Reset!</span>
                </h2>
                <p className="text-sm text-[#8c7c66]">
                  Your password has been successfully updated. You can now sign
                  in with your new credentials.
                </p>
              </div>

              <div className="bg-[#302009] p-5 mb-6 rounded-2xl border border-[#573605]">
                <h3 className="text-[#8c7c66] uppercase text-xs font-semibold ">
                  security tip
                </h3>
                <p className="py-1 text-sm text-[#F0E8D8]">
                  Don't reuse passwords across multiple accounts. Consider using
                  a password manager to keep your accounts safe. 🛡️
                </p>
              </div>
              <button
                onClick={() => {
                  navigate("/auth");
                  dispatch(setFpStep(1));
                  dispatch(setView("signin"));
                }}
                className=" bg-[#DC901C] mt-4 mb-3 rounded-xl py-3 text-[16px] font-semibold cursor-pointer hover:shadow-[#dc8f1c3c] shadow-xl flex w-full items-center justify-center"
              >
                Sign in to nestly →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;
