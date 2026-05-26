import Welcome from "../components/Welcome";
import QuickSearch from "../components/QuickSearch";
import ListingCard from "./ListingCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { setSavedListings } from "../../../redux/savedSlice";

function Dashboard() {
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state.user?.userData?._id);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedListings = async () => {
      try {
        const response =await  axios.get(`${serverUrl}/api/saved/listings/${currentUserId}`, {
          withCredentials: true
        });
        dispatch(setSavedListings(response.data))
      } catch (error) {
        console.log("Failed to fetch saved Listings: ", error);
      }
    };
    fetchSavedListings()
  },[dispatch, currentUserId]);

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
          {loading ? (
            <p className="text-[#5a4626] text-sm">Loading...</p>
          ) : listings.length === 0 ? (
            <div className="flex items-center justify-center w-full py-16 ">
              <p className="text-[#5a4626] text-sm mb-4">No listings yet</p>
            </div>
          ) : (
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
