import { Lock, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { serverUrl } from "../../../App";
import axios from "axios";
import { useSelector } from "react-redux";

function ChangePassModal({ onClose, handleSendOtp }) {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1);
  const inputRefs = useRef([]);

  const currentUser = useSelector((state) => state.user?.userData);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email: currentUser?.email, otp: otp.join("") },
        { withCredentials: true }
      );
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async () => {
    if (newPass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email: currentUser.email, otp: otp.join(""), newPassword: newPass },
        { withCredentials: true }
      );
      console.log("Password reset successfully: ", response.data);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] px-0 sm:px-4">
      <div className="relative w-full sm:w-[500px] max-h-[90vh] overflow-y-auto no-scrollbar rounded-t-3xl sm:rounded-3xl bg-[#241306] p-5 sm:p-6 shadow-2xl border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-base font-semibold sm:text-lg">
            <Lock size={18} />
            Change your Password
          </h2>
          <X
            size={22}
            onClick={onClose}
            className="p-1 rounded-full cursor-pointer bg-black/30 shrink-0"
          />
        </div>

        {step === 1 && (
          <>
            <p className="flex justify-center mb-4 text-xs sm:text-sm italic text-center text-[#867a5f]">
              We've sent a 6-digit code to your email. Enter it below to
              continue.
            </p>

            <div className="flex justify-center gap-2 mb-6 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  maxLength={1}
                  type="text"
                  className="h-12 sm:h-16 text-lg sm:text-xl bg-[#2A1F12] border-[#573605] font-bold text-center border w-10 sm:w-14 rounded-xl text-[#DC901C] outline-0 transition-all duration-150"
                />
              ))}
            </div>

            <p className="text-[#8c7c66] text-center text-xs">
              Didn't receive the code?{" "}
              <span
                onClick={() => handleSendOtp()}
                className="text-[#DC901C] font-medium cursor-pointer"
              >
                Resend Code
              </span>
            </p>

            <div className="flex gap-2 mt-6 mb-2">
              <button
                onClick={onClose}
                className="w-full py-2 text-sm transition-all duration-200 border cursor-pointer bg-red-900/40 rounded-xl hover:text-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                className="w-full py-2 text-sm transition-all duration-200 border cursor-pointer bg-amber-500/60 rounded-xl hover:text-amber-500"
              >
                Verify
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-[#867a5f] font-medium">
                  New Password
                </label>
                <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2">
                  <input
                    type="text"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="flex-1 text-sm bg-transparent outline-0"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase text-[#867a5f] font-medium">
                  Confirm Password
                </label>
                <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2">
                  <input
                    type="text"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="flex-1 text-sm bg-transparent outline-0"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6 mb-2">
              <button
                onClick={onClose}
                className="w-full py-2 text-sm transition-all duration-200 border cursor-pointer bg-red-900/40 rounded-xl hover:text-red-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleResetPassword();
                  onClose();
                  setStep(1);
                }}
                className="w-full py-2 text-sm transition-all duration-200 border cursor-pointer bg-amber-500/60 rounded-xl hover:text-amber-500"
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChangePassModal;
