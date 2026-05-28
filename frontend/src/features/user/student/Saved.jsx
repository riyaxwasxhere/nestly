import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import SavedCard from "./SavedCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../../App";
import { useDispatch } from "react-redux";
import ListingDetails from "./ListingDetails";

function Saved() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user?.userData);
  const currentUserId = currentUser?._id;
  const [savedListings, setSavedListings] = useState([]);
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
    if (!currentUserId) return;
    const fetchSavedListings = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/saved/listings/${currentUserId}`,
          { withCredentials: true }
        );
        setSavedListings(response.data);
      } catch (error) {
        console.error("Error fetching saved listings:", error);
      }
    };
    fetchSavedListings();
  }, [currentUserId, dispatch]);

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between">
        <h2
          style={{ fontFamily: "Playfair Display, serif" }}
          className="mb-4 text-lg font-bold"
        >
          ❤️ Saved Properties
        </h2>
        <span className="text-xs text-[#867a5f]">
          {savedListings.length} properties saved
        </span>
      </div>

      <div className="flex flex-col h-screen gap-4 overflow-y-auto no-scrollbar">
        {savedListings.length > 0 ? (
          savedListings.map((saved) => (
            <SavedCard
              key={saved._id}
              savedListing={saved.savedListing}
              onClick={() => handleOpenModal(saved.savedListing)}
              userId={currentUserId}
              onRemove={(id) => {
                setSavedListings((prev) =>
                  prev.filter((s) => s.savedListing?._id !== id)
                );
              }}
            />
          ))
        ) : (
          <p className="text-sm text-[#867a5f]">No saved properties yet.</p>
        )}
      </div>
      {open && (
        <ListingDetails listing={selectedListing} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Saved;
