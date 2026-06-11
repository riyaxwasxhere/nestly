import Logo from "../../../components/ui/Logo";
import { useDispatch, useSelector } from "react-redux";
import { setStudentView } from "../../../redux/studentSlice";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userData);
  const city = useSelector((state) => state.user?.city);
  const studentView = useSelector((state) => state.student?.studentView);

  const navItems = [
    { label: "Dashboard", icon: "🏠" },
    { label: "All Listings", icon: "🔍" },
    { label: "Saved", icon: "❤️" },
    { label: "Messages", icon: "💬" },
    { label: "Scheduled Visits", icon: "📅" },
    { label: "Notifications", icon: "🔔" },
    { label: "Profile", icon: "👤" },
    { label: "Help And Support", icon: "💡" }
  ];

  const mobileNavItems = navItems.slice(0, 5);

  return (
    <>
      <div className="hidden md:flex flex-col w-60 p-2 text-white border-r border-[#2c1a00b3] h-screen bg-[#2517035c]">
        <div className="flex items-center h-16 px-3">
          <Logo />
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
          <div className="my-6">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  onClick={() => dispatch(setStudentView(item.label))}
                  className={`flex text-sm items-center gap-3 text-[#F0E8D8] font-medium py-3 px-4 cursor-pointer ${
                    studentView === item.label
                      ? "bg-[#f5a52320] text-[#F5A623] rounded-lg border border-[#764d0c] hover:bg-[#f5a52340] hover:border-[#f5a52340] transition-all duration-100"
                      : "hover:bg-[#f5a52320] hover:border-[#f5a52320] transition-all duration-100 rounded-lg border border-transparent"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 mb-5 cursor-pointer">
          <div className="bg-[#F5A623] w-8 h-8 rounded-full flex items-center justify-around text-lg font-bold">
            {user?.profilePic ? (
              <img
                className="flex items-center w-8 h-8 rounded-full"
                src={user?.profilePic}
              />
            ) : (
              <p>{user?.fullname?.[0] || "U"}</p>
            )}
          </div>
          <div>
            <h3 className="text-sm">{user?.fullname || "user"}</h3>
            <p className="text-xs">
              {user?.role || "role"} · {city || "City"}
            </p>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a0e02] border-t border-[#2c1a00b3] flex items-center justify-around px-2 py-2 safe-area-pb">
        {mobileNavItems.map((item) => (
          <button
            key={item.label}
            onClick={() => dispatch(setStudentView(item.label))}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all duration-100 min-w-[52px] ${
              studentView === item.label ? "text-[#F5A623]" : "text-[#867a5f]"
            }`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span className="text-[10px] font-medium leading-tight text-center line-clamp-1">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="md:hidden flex items-center justify-between px-4 h-14 bg-[#2517035c] border-b border-[#2c1a00b3] text-white">
        <Logo />
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-[#F5A623] w-8 h-8 rounded-full flex items-center justify-center text-base font-bold shrink-0">
            {user?.profilePic ? (
              <img
                className="object-cover w-8 h-8 rounded-full"
                src={user?.profilePic}
              />
            ) : (
              <p>{user?.fullname?.[0] || "U"}</p>
            )}
          </div>
          <div className="leading-tight">
            <h3 className="text-xs font-medium">{user?.fullname || "user"}</h3>
            <p className="text-[10px] text-[#867a5f]">{city || "City"}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
