import {
  Lock,
  LogOut,
  Mail,
  Notebook,
  Pencil,
  Phone,
  User
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfileModal from "../student/EditProfileModal";
import LogoutModal from "../student/LogoutModal";
import ChangePassModal from "../student/ChangePassModal";
import axios from "axios";
import { serverUrl } from "../../../App";

function Profile() {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [logOutOpen, setLogOutOpen] = useState(false);
  const [changePassOpen, setChangePassOpen] = useState(false);

  const currentUser = useSelector((state) => state.user?.userData);

  const handleOpenModal = () => setEditProfileOpen(true);
  const handleCloseModal = () => setEditProfileOpen(false);
  const openLogoutModal = () => setLogOutOpen(true);
  const closeLogoutModal = () => setLogOutOpen(false);
  const openChangePassModal = () => {
    handleSendOtp();
    setChangePassOpen(true);
  };
  const closeChangePassModal = () => setChangePassOpen(false);

  const handleSendOtp = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email: currentUser?.email },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full px-4 py-4 pb-24 overflow-y-auto sm:px-10 sm:pb-30 no-scrollbar">
      <h2
        style={{ fontFamily: "Playfair Display, serif" }}
        className="text-base font-bold sm:text-xl"
      >
        👤 My Profile
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-[#867a5f]">
        Manage your personal information and account settings
      </p>

      <div className="bg-[#1f160f] p-5 sm:p-10 sm:px-16 justify-between rounded-xl border border-[#58390dc9] mt-4">
        <div className="pb-6 border-b border-[#58390dc9] flex gap-4 sm:gap-6 items-center">
          <div className="w-16 h-16 overflow-hidden rounded-full sm:w-20 sm:h-20 shrink-0">
            {currentUser?.profilePic ? (
              <img
                src={currentUser.profilePic}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#F4A523]">
                <span className="text-xl font-semibold sm:text-2xl">
                  {currentUser?.fullname?.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="-mb-2 text-base font-medium sm:text-lg">
              {currentUser?.fullname}
            </span>
            <span className="text-xs sm:text-sm text-[#867a5f]">
              {currentUser?.email}
            </span>
            <span className="w-fit bg-[#F4A523]/10 px-3 border border-[#F4A523] rounded-xl text-[#F4A523] text-xs sm:text-sm">
              {currentUser?.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-[#867a5f] font-medium">
              Full name
            </p>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2 text-sm">
              <User className="text-[#867a5f] shrink-0" size={18} />
              {currentUser?.fullname}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-[#867a5f] font-medium">
              Email
            </p>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2 text-sm overflow-hidden">
              <Mail className="text-[#867a5f] shrink-0" size={18} />
              <span className="truncate">{currentUser?.email}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-[#867a5f] font-medium">
              Phone
            </p>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2 text-sm">
              <Phone className="text-[#867a5f] shrink-0" size={18} />
              {currentUser?.mobile}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-[#867a5f] font-medium">Role</p>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2 text-sm">
              <Notebook className="text-[#867a5f] shrink-0" size={18} />
              {currentUser?.role}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1f160f] p-5 sm:p-10 sm:px-16 justify-between rounded-xl border border-[#58390dc9] mt-4">
        <p className="text-[#867a5f] mb-4 uppercase text-xs sm:text-sm font-medium">
          Account settings
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleOpenModal}
            className="border-[#58390dc9] w-full border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2 hover:bg-[#211303] transition-all duration-200 cursor-pointer text-sm"
          >
            <Pencil className="text-[#867a5f] shrink-0" size={18} /> Edit
            Profile
          </button>
          <button
            onClick={openChangePassModal}
            className="border-[#58390dc9] w-full border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2 hover:bg-[#211303] transition-all duration-200 cursor-pointer text-sm"
          >
            <Lock className="text-[#867a5f] shrink-0" size={18} /> Change
            Password
          </button>
          <button
            onClick={openLogoutModal}
            className="border-[#58390dc9] w-full border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2 hover:bg-[#211303] transition-all duration-200 cursor-pointer text-sm"
          >
            <LogOut className="text-[#867a5f] shrink-0" size={18} /> Logout
          </button>
        </div>
        {editProfileOpen && (
          <EditProfileModal onClose={handleCloseModal} profile={currentUser} />
        )}
        {logOutOpen && <LogoutModal onClose={closeLogoutModal} />}
        {changePassOpen && (
          <ChangePassModal
            handleSendOtp={handleSendOtp}
            onClose={closeChangePassModal}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
