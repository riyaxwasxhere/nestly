import { useDispatch, useSelector } from "react-redux";
import { setStudentView } from "../../../redux/studentSlice";
import { setOwnerView } from "../../../redux/ownerSlice";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userData);

  const studentView = useSelector((state) => state.student.studentView);
  const ownerView = useSelector((state) => state.owner.ownerView);

  const activeView = user?.role === "student" ? studentView : ownerView;

  const navigate = (view) => {
    if (user?.role === "student") {
      dispatch(setStudentView(view));
    } else {
      dispatch(setOwnerView(view));
    }
  };

  const btnClass = (view) =>
    `text-base sm:text-lg bg-[#1E1509] p-1.5 rounded-lg border cursor-pointer transition-all duration-100 ${
      activeView === view
        ? "bg-[#f5a52320] text-[#F5A623] border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340]"
        : "border-[#2d1f08] hover:bg-[#f5a52320] hover:border-[#f5a52320]"
    }`;

  return (
    <div className="flex items-center justify-between h-14 sm:h-20 px-4 sm:px-8 border-b border-[#2c1a00b3] shrink-0">
      <h1
        style={{ fontFamily: "Playfair Display, serif" }}
        className="text-base sm:text-xl text-[#F0E8D8] font-bold truncate mr-3"
      >
        {activeView}
      </h1>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          onClick={() => navigate("Notifications")}
          className={btnClass("Notifications")}
        >
          🔔
        </button>
        <button
          onClick={() => navigate("Messages")}
          className={btnClass("Messages")}
        >
          💬
        </button>
        <button
          onClick={() => navigate("Profile")}
          className={btnClass("Profile")}
        >
          👤
        </button>
      </div>
    </div>
  );
}

export default Header;
