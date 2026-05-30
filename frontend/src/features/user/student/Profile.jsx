import {
  Building2,
  Camera,
  Edit,
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
import EditProfileModal from "./EditProfileModal";
import LogoutModal from "./LogoutModal";
import ChangePassModal from "./ChangePassModal";
import axios from "axios";
import { serverUrl } from "../../../App";

function Profile() {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [logOutOpen, setLogOutOpen] = useState(false);
  const [changePassOpen, setChangePassOpen] = useState(false);

  const currentUser = useSelector((state) => state.user?.userData);
  const studentInstitute = useSelector((state) => state.student?.institution);

  const handleOpenModal = () => {
    setEditProfileOpen(true);
  };
  const handleCloseModal = () => {
    setEditProfileOpen(false);
  };
  const openLogoutModal = () => {
    setLogOutOpen(true);
  };
  const closeLogoutModal = () => {
    setLogOutOpen(false);
  };
  const openChangePassModal = () => {
    handleSendOtp();
    setChangePassOpen(true);
  };
  const closeChangePassModal = () => {
    setChangePassOpen(false);
  };

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
    <div className="h-full px-10 py-4 overflow-y-auto pb-30 no-scrollbar ">
      <h2 className="text-xl font-semibold">👤 My Profile</h2>
      <p className="mt-1 text-sm text-[#867a5f]">
        Manage your personal information and account settings
      </p>

      <div className="bg-[#1f160f] p-10 px-26 justify-between rounded-xl border border-[#58390dc9] mt-4">
        <div className="pb-6 border-b border-[#58390dc9] flex gap-6">
          <div className="w-20 h-20 overflow-hidden rounded-full ">
            {currentUser?.profilePic ? (
              <img
                src={currentUser.profilePic}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#F4A523]">
                <span className="text-2xl font-semibold">
                  {currentUser?.fullname?.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="-mb-2 text-lg font-medium">
              {currentUser?.fullname}
            </span>
            <span className="text-sm text-[#867a5f]">{currentUser?.email}</span>
            <span className="w-fit bg-[#F4A523]/10 px-4 border border-[#F4A523] rounded-xl text-[#F4A523] text-sm">
              {currentUser?.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 py-6 gap-x-10 gap-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-[#867a5f] font-medium">
              Full name
            </p>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2">
              <User className="text-[#867a5f]" size={18} />{" "}
              {currentUser?.fullname}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-[#867a5f] font-medium">
              email
            </p>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2">
              <Mail className="text-[#867a5f]" size={18} /> {currentUser?.email}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-[#867a5f] font-medium">
              phone
            </p>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2">
              <Phone className="text-[#867a5f]" size={18} />{" "}
              {currentUser?.mobile}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-[#867a5f] font-medium">
              role{" "}
            </p>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2">
              <Notebook className="text-[#867a5f]" size={18} />
              {currentUser?.role}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase text-[#867a5f] font-medium">
            Institute{" "}
          </p>
          <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2">
            <Building2 className="text-[#867a5f]" size={18} />{" "}
            {studentInstitute}
          </div>
        </div>
      </div>

      <div className="bg-[#1f160f] p-10 px-26 justify-between rounded-xl border border-[#58390dc9] mt-4">
        <p className="text-[#867a5f] mb-4 uppercase text-sm font-medium">
          Account settings
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              handleOpenModal();
            }}
            className="border-[#58390dc9] w-full border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2 hover:bg-[#211303] transition-all duration-200 cursor-pointer"
          >
            <Pencil className="text-[#867a5f]" size={18} /> Edit Profile
          </button>
          <button
            onClick={openChangePassModal}
            className="border-[#58390dc9] w-full border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2 hover:bg-[#211303] transition-all duration-200 cursor-pointer"
          >
            <Lock className="text-[#867a5f]" size={18} /> Change Password
          </button>
          <button
            onClick={openLogoutModal}
            className="border-[#58390dc9] w-full border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2 hover:bg-[#211303] transition-all duration-200 cursor-pointer"
          >
            <LogOut className="text-[#867a5f]" size={18} /> Logout
          </button>
        </div>
        {editProfileOpen && (
          <EditProfileModal onClose={handleCloseModal} profile={currentUser} />
        )}
        {logOutOpen && <LogoutModal onClose={closeLogoutModal} />}
        {changePassOpen && <ChangePassModal handleSendOtp={handleSendOtp} onClose={closeChangePassModal} />}
      </div>
    </div>
  );
}

export default Profile;
