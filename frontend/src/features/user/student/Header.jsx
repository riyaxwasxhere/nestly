import { useDispatch, useSelector } from "react-redux";
import { setStudentView } from "../../../redux/studentSlice";
import { setOwnerView } from "../../../redux/ownerSlice";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userData);

  const studentView = useSelector((state) => state.student.studentView);
  const ownerView = useSelector((state) => state.owner.ownerView);

  const activeView = user?.role === "student" ? studentView : ownerView;

  return (
    <div className="flex items-center justify-between h-20 px-8 border-b border-[#2c1a00b3]">
      <h1
        style={{ fontFamily: "Playfair Display, serif" }}
        className="text-xl text-[#F0E8D8] font-bold "
      >
        {activeView}{" "}
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            if (user?.role === "student") {
              dispatch(setStudentView("Notifications"));
            } else {
              dispatch(setOwnerView("Notifications"));
            }
          }}
          className={`text-lg bg-[#1E1509] p-1.5 rounded-lg border cursor-pointer border-[#2d1f08] ${activeView === "Notifications" ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100" : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"}`}
        >
          🔔
        </button>
        <button
          onClick={() => {
            if (user?.role === "student") {
              dispatch(setStudentView("Messages"));
            } else {
              dispatch(setOwnerView("Messages"));
            }
          }}
          className={`text-lg bg-[#1E1509] p-1.5 rounded-lg border cursor-pointer border-[#2d1f08] ${activeView === "Messages" ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100" : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"}`}
        >
          💬
        </button>
        <button
          onClick={() => {
            if (user?.role === "student") {
              dispatch(setStudentView("Profile"));
            } else {
              dispatch(setOwnerView("Profile"));
            }
          }}
          className={`text-lg bg-[#1E1509] p-1.5 rounded-lg border cursor-pointer border-[#2d1f08] ${activeView === "Profile" ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100" : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"}`}
        >
          👤
        </button>
      </div>
    </div>
  );
}

export default Header;
