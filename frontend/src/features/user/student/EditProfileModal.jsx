import { Edit, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../../App";
import { setUserData } from "../../../redux/userSlice";
import { setInstitution } from "../../../redux/studentSlice";

function EditProfileModal({ profile, onClose }) {
  const [fullName, setFullName] = useState(profile?.fullname);
  const [phone, setPhone] = useState(profile?.mobile);
  const [profilePic, setProfilePic] = useState(profile.profilePic);
  const studentInstitute = useSelector((state) => state.student?.institution);
  const dispatch = useDispatch();
  const [institute, setInstitute] = useState(studentInstitute);

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("profilePic", selectedFile);

      const response = await axios.put(
        `${serverUrl}/api/profile/update`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      dispatch(setUserData(response.data.user));
      dispatch(setInstitution(institute));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setProfilePic(URL.createObjectURL(file));
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="relative w-[500px]  overflow-y-auto  no-scrollbar rounded-3xl bg-[#241306] p-6 shadow-2xl border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Edit />
            Update your profile
          </h2>
          <X
            size={25}
            onClick={onClose}
            className="p-1 rounded-full cursor-pointer bg-black/30"
          />
        </div>
        <p className="text-xs uppercase text-[#867a5f] font-medium mb-2">
          Profile Picture
        </p>
        <div className="flex justify-center">
          <div className="h-52 w-52 flex  border-[#58390dc9] border bg-[#140d07]">
            <input
              type="file"
              accept="image/*"
              id="profile-upload"
              hidden
              onChange={handleImageChange}
            />

            <div
              onClick={() => document.getElementById("profile-upload").click()}
              className="border cursor-pointer h-52 w-52"
            >
              <img
                src={
                  profilePic ||
                  "https://www.pinterest.com/pin/sprout-head-empty-pfp--61080138757608664/"
                }
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase text-[#867a5f] font-medium">
              Full name
            </label>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex-1 outline-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase text-[#867a5f] font-medium">
              phone
            </label>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 outline-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase text-[#867a5f] font-medium">
              institute
            </label>
            <div className="border-[#58390dc9] border bg-[#140d07] rounded-xl px-4 flex gap-4 items-center py-2">
              <input
                type="text"
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
                className="flex-1 outline-0"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-6 mb-2">
          <button
            onClick={onClose}
            className="w-full py-2 transition-all duration-200 border cursor-pointer bg-red-900/40 rounded-xl hover:text-red-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full py-2 transition-all duration-200 border cursor-pointer bg-amber-500/60 rounded-xl hover:text-amber-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
