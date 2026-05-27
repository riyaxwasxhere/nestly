import React, { useEffect, useState } from "react";
import QuickSearch from "../components/QuickSearch";
import ListingCard from "./ListingCard";
import axios from "axios";
import { serverUrl } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { setSavedListings } from "../../../redux/savedSlice";

function AllListings() {
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state.user?.userData?._id);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState("Any Budget");
  const [roomType, setRoomType] = useState("Room Type");
  const [gender, setGender] = useState("Gender");

  useEffect(() => {
    const fetchSavedListings = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/saved/listings/${currentUserId}`, {
          withCredentials: true
        });
        dispatch(setSavedListings(response.data))
      } catch (error) {
        console.log("Failed to fetch saved Listings: ", error);
      }
    };
    fetchSavedListings()
  },[currentUserId, dispatch]);

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

    if (budget === "Under ₹5,000") {
      matchesBudget = listing.pricePerMonth < 5000;
    }

    if (budget === "₹5,000 - ₹8,000") {
      matchesBudget = listing.pricePerMonth >= 5000 && listing.pricePerMonth <= 8000;
    }

    if (budget === "₹8,000 - ₹12,000") {
      matchesBudget = listing.pricePerMonth >= 8000 && listing.pricePerMonth <= 12000;
    }

    if (budget === "₹12,000 - ₹20,000") {
      matchesBudget = listing.pricePerMonth >= 12000 && listing.pricePerMonth <= 20000;
    }

    if (budget === "Above ₹20,000") {
      matchesBudget = listing.pricePerMonth > 20000;
    }

    const matchesRoom =
      roomType === "Room Type" || listing.roomType === roomType;

    const matchesGender = gender === "Gender" || listing.genderPreference === gender;

    return matchesSearch && matchesBudget && matchesRoom && matchesGender;
  });

  return (
    <div className="h-screen overflow-y-auto no-scrollbar">
      <div className="px-3">
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
      </div>
      <div className="px-10">
        <div className="flex items-center justify-between mb-4">
          <h2
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-lg font-bold text-[#F0E8D8]"
          >
            🏠 All Listings
          </h2>
          <span className="text-sm text-[#867a5f] ">{filteredListings.length} results found</span>
        </div>
        <div className="grid grid-cols-4 gap-4 pb-32">
          {loading ? (
            <p className="text-[#5a4626] text-sm">Loading...</p>
          ) : filteredListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-[#3d2b0f] rounded-2xl">
              <p className="text-[#5a4626] text-sm mb-4">No listings yet</p>
            </div>
          ) : (
            filteredListings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllListings;
