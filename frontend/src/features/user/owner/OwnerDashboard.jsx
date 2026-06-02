import React, { useEffect, useState } from "react";
import Welcome from "../components/Welcome";
import ListingCard from "./ListingCard";
import axios from "axios";
import { serverUrl } from "../../../App";
import { useDispatch } from "react-redux";
import { setOwnerView } from "../../../redux/ownerSlice";
import ListingDetails from "../student/ListingDetails";

function OwnerDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleOpenModal = (listing) => {
    setSelectedListing(listing);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedListing(null);
  };

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteSuccess = (deletedId) => {
    setListings((prev) => prev.filter((item) => item._id !== deletedId));
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios(
          `${serverUrl}/api/listings/owner/my-listings`,
          {
            withCredentials: true
          }
        );
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
      <Welcome listingsCount={listings.length} />
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-xl font-bold"
          >
            ⭐ My Listings
          </h2>
          <button
            onClick={() => {
              dispatch(setOwnerView("My Listings"));
            }}
            className="p-2 px-3 text-xs border rounded-full hover:text-[#F5A623] transition-all duration-200 cursor-pointer font-medium bg-[#342310]/20 hover:scale-102"
          >
            See All→
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-[#413117] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#342310]/20 text-[#F0E8D8] placeholder-[#867a5f]"
            type="text"
            placeholder="Search your property"
          />
        </div>
        <div className="grid grid-cols-4 gap-4 pb-10">
          {loading ? (
            <p className="text-[#5a4626] text-sm">Loading...</p>
          ) : filteredListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-[#3d2b0f] rounded-2xl">
              <p className="text-[#5a4626] text-sm mb-4">No listings found</p>
              <button
                onClick={() => {
                  dispatch(setOwnerView("Add Listing"));
                }}
                className="bg-[#F5A623] text-black font-bold rounded-xl px-6 py-2 text-sm"
              >
                + Add your first listing
              </button>
            </div>
          ) : (
            filteredListings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                onClick={() => handleOpenModal(listing)}
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))
          )}
        </div>
        {open && (
          <ListingDetails
            listing={selectedListing}
            onClose={handleCloseModal}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;
