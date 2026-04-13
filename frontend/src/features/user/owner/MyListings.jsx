import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { serverUrl } from '../../../App';
import ListingCard from './ListingCard';

function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-xl font-bold"
          >
            ⭐ My Listings
          </h2>
          <button className="p-2 px-3 text-xs border rounded-full hover:text-[#F5A623] transition-all duration-200 cursor-pointer font-medium bg-[#342310]/20 hover:scale-102">
            + Add New Listing
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 pb-32">
          {loading ? (
            <p className="text-[#5a4626] text-sm">Loading...</p>
          ) : listings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-[#3d2b0f] rounded-2xl">
              <p className="text-[#5a4626] text-sm mb-4">No listings yet</p>
              <button
                
                className="bg-[#F5A623] text-black font-bold rounded-xl px-6 py-2 text-sm"
              >
                + Add your first listing
              </button>
            </div>
          ) : (
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))
          )}
        </div>
      </div>
  )
}

export default MyListings
