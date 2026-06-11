import axios from "axios";
import React from "react";
import { serverUrl } from "../../../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

function LogoutModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="relative w-[500px]  overflow-y-auto  no-scrollbar rounded-3xl bg-[#241306] p-6 shadow-2xl border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            Are you sure you want to log out of your account?
          </h2>
          <X
            size={25}
            onClick={onClose}
            className="p-1 rounded-full cursor-pointer bg-black/30"
          />
        </div>
        <div className="flex gap-2 mt-6 mb-2">
          <button
            onClick={onClose}
            className="w-full py-2 transition-all duration-200 border cursor-pointer bg-red-900/40 rounded-xl hover:text-red-500"
          >
            Cancel
          </button>
          <button
            onClick={handleLogOut}
            className="w-full py-2 transition-all duration-200 border cursor-pointer bg-amber-500/60 rounded-xl hover:text-amber-500"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
