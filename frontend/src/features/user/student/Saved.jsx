import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import SavedCard from "./SavedCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../../App";

function Saved() {
  const [listings, setListings] = useState([]);
  const currentUser = useSelector((state) => state.user?.userData);
 
  useEffect(()=>{
    const fetchSavedListings = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/saved/listings/${currentUser?._id}`,
          { withCredentials: true }
        );
        setListings(response.data);
      }catch (error) {
        console.error("Error fetching saved listings:", error);
      }
    }
    fetchSavedListings();
  }, [currentUser])
  
  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between">
        <h2
          style={{ fontFamily: "Playfair Display, serif" }}
          className="mb-4 text-lg font-bold"
        >
          ❤️ Saved Properties
        </h2>
        <span className="text-xs text-[#867a5f]">{listings.length} properties saved</span>
      </div>
      
      <div className="flex flex-col gap-4">
        {listings.length > 0 ? (
          listings.map((saved) => (
            <SavedCard key={saved._id} listing={saved.listing} />
          ))
        ) : (
          <p className="text-sm text-[#867a5f]">No saved properties yet.</p>
        )}
      </div>
    </div>
  );
}

export default Saved;
