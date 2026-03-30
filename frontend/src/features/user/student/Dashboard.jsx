import Welcome from "../components/Welcome";
import QuickSearch from "../components/QuickSearch";
import ListingCard from "./ListingCard";
function Dashboard() {
  
  return (
    <div className="h-screen overflow-y-auto no-scrollbar">
      <Welcome />
      <QuickSearch />
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-xl font-bold"
          >
            ⭐ Recommended for You
          </h2>
          <span className="text-[#F5A623] text-xs font-medium cursor-pointer hover:underline">
            See all
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 pb-32">
          <ListingCard />
          <ListingCard />
          <ListingCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
