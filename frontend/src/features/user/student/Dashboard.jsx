import Welcome from "../components/Welcome";
import QuickSearch from "../components/QuickSearch";
import ListingCard from "./ListingCard";
import ListingDetails from "./ListingDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { setSavedListings } from "../../../redux/savedSlice";
import { setStudentView } from "../../../redux/studentSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user?.userData?._id);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState("Any Budget");
  const [roomType, setRoomType] = useState("Room Type");
  const [gender, setGender] = useState("Gender");
  const [selectedListing, setSelectedListing] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenModal = (listing) => {
    setSelectedListing(listing);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedListing(null);
  };

  useEffect(() => {
    const fetchSavedListings = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/saved/listings/${currentUserId}`,
          { withCredentials: true }
        );
        dispatch(setSavedListings(response.data));
      } catch (error) {
        console.log("Failed to fetch saved Listings: ", error);
      }
    };
    fetchSavedListings();
  }, [dispatch, currentUserId]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios(`${serverUrl}/api/listings/all`, {
          withCredentials: true
        });
        setListings(response.data);
        setLoading(false);
      } catch (error) {
        console.log("FETCH LISTINGS ERROR:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      searchQuery === "" ||
      listing.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.address?.area?.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesBudget = true;
    if (budget === "Under ₹5,000") matchesBudget = listing.pricePerMonth < 5000;
    if (budget === "₹5,000 - ₹8,000")
      matchesBudget =
        listing.pricePerMonth >= 5000 && listing.pricePerMonth <= 8000;
    if (budget === "₹8,000 - ₹12,000")
      matchesBudget =
        listing.pricePerMonth >= 8000 && listing.pricePerMonth <= 12000;
    if (budget === "₹12,000 - ₹20,000")
      matchesBudget =
        listing.pricePerMonth >= 12000 && listing.pricePerMonth <= 20000;
    if (budget === "Above ₹20,000")
      matchesBudget = listing.pricePerMonth > 20000;

    const matchesRoom =
      roomType === "Room Type" || listing.roomType === roomType;
    const matchesGender =
      gender === "Gender" || listing.genderPreference === gender;

    return matchesSearch && matchesBudget && matchesRoom && matchesGender;
  });

  return (
    <div className="h-screen pb-16 overflow-y-auto no-scrollbar sm:pb-0">
      <Welcome />
      <QuickSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        budget={budget}
        setBudget={setBudget}
        roomType={roomType}
        setRoomType={setRoomType}
        gender={gender}
        setGender={setGender}
      />

      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-base font-bold sm:text-xl"
          >
            ⭐ Latest Listings
          </h2>
          <span
            onClick={() => dispatch(setStudentView("All Listings"))}
            className="text-[#F5A623] text-xs font-medium cursor-pointer hover:underline shrink-0"
          >
            See all
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-32 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p className="text-[#5a4626] text-sm">Loading...</p>
          ) : filteredListings.length === 0 ? (
            <div className="flex items-center justify-center w-full col-span-1 py-16 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <p className="text-[#5a4626] text-sm">No listings yet</p>
            </div>
          ) : (
            filteredListings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                onClick={() => handleOpenModal(listing)}
              />
            ))
          )}
        </div>

        {open && (
          <ListingDetails
            listing={selectedListing}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
