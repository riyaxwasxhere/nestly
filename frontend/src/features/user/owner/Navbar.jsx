import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../components/ui/Logo";
import { clearEditListing, setOwnerView } from "../../../redux/ownerSlice";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userData);
  const city = useSelector((state) => state.user?.city);
  const ownerView = useSelector((state) => state.owner?.ownerView);

  const navItems = [
    { label: "Dashboard", icon: "🏠" },
    { label: "My Listings", icon: "📋" },
    { label: "Add Listing", icon: "➕" },
    { label: "Messages", icon: "💬" },
    { label: "Visit Requests", icon: "📅" },
    { label: "Booking Requests", icon: "🤝" },
    { label: "Notifications", icon: "🔔" },
    { label: "Profile", icon: "👤" },
    { label: "Help And Support", icon: "💡" }
  ];

  const mobileNavItems = navItems.slice(0, 5);

  const handleNav = (label) => {
    if (label === "Add Listing") dispatch(clearEditListing());
    dispatch(setOwnerView(label));
  };

  return (
    <>
      <div className="hidden sm:flex flex-col w-60 p-2 text-white border-r border-[#2c1a00b3] h-screen bg-[#2517035c]">
        <div className="flex items-center h-16 px-3">
          <Logo />
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
          <div className="my-6">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  onClick={() => handleNav(item.label)}
                  className={`flex text-sm items-center gap-3 text-[#F0E8D8] font-medium py-3 px-4 cursor-pointer rounded-lg border transition-all duration-100
                    ${
                      ownerView === item.label
                        ? "bg-[#f5a52320] text-[#F5A623] border-[#764d0c] hover:bg-[#f5a52340]"
                        : "border-transparent hover:bg-[#f5a52320]"
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
          <div className="w-8 h-8 overflow-hidden rounded-full shrink-0">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#F4A523]">
                <span className="text-2xl font-semibold">
                  {user?.fullname?.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm">{user?.fullname || "user"}</h3>
            <p className="text-xs">
              {user?.role || "role"} · {city || "city"}
            </p>
          </div>
        </div>
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a1005] border-t border-[#2c1a00b3] flex items-center justify-around px-2 py-2">
        {mobileNavItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNav(item.label)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all duration-150 cursor-pointer
              ${
                ownerView === item.label ? "text-[#F5A623]" : "text-[#867a5f]"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[9px] font-medium leading-tight text-center w-12 truncate">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

export default Navbar;
