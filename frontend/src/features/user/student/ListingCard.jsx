import axios from "axios";
import { serverUrl } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSavedListings,
  removeFromSavedListings
} from "../../../redux/savedSlice";

function ListingCard({ listing, onClick }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user?.userData?._id);
  const savedListings = useSelector((state) => state.saved?.savedListings);
  const isSaved = savedListings.some(
    (item) => item.savedListing?._id === listing._id
  );

  const handleSave = async () => {
    try {
      if (!isSaved) {
        const response = await axios.post(
          `${serverUrl}/api/saved/save`,
          {
            userId: currentUserId,
            savedListingId: listing._id
          },
          {
            withCredentials: true
          }
        );
        console.log(savedListings);
        dispatch(addToSavedListings(response.data));
      } else {
        await axios.delete(`${serverUrl}/api/saved/remove`, {
          data: {
            userId: currentUserId,
            savedListingId: listing._id
          },
          withCredentials: true
        });
        dispatch(removeFromSavedListings(listing._id));
      }
    } catch (error) {
      console.log("failed to save:", error);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-[#261A0A] rounded-xl cursor-pointer border border-[#5a462657] hover:-translate-y-1 transition-all duration-300 w-full"
    >
      <div className="relative">
        <div
          className="bg-center bg-cover h-36 sm:h-40 rounded-t-xl"
          style={{
            backgroundImage:
              listing.photos?.length > 0
                ? `url('${listing.photos[0]}')`
                : "url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=70')"
          }}
        >
          <div className="flex items-center justify-between px-3 py-2 text-xs text-[#867a5f] absolute top-0 left-0 right-0">
            <span className="px-2 py-0.5 bg-[#362704cf] rounded-4xl border border-[#8d8269] truncate max-w-[65%]">
              {listing.averageRating > 0
                ? `⭐ ${listing.averageRating} (${listing.totalReviews} reviews)`
                : "No reviews yet"}
            </span>
            <span
              className="p-1.5 text-sm sm:text-base border rounded-full bg-[#f5236d62] border-rose-500 min-w-8 min-h-8 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
            >
              {isSaved ? "❤️" : "🤍"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-3 py-2 sm:px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold truncate">{listing.title}</h3>
            <p className="text-xs text-[#867a5f] font-medium truncate">
              📍{listing.address?.locality}, {listing.address?.city}
            </p>
          </div>
          <div className="shrink-0">
            <span
              className={`px-2 sm:px-4 py-0.5 text-xs backdrop-blur-md bg-black/30 border rounded-2xl flex items-center whitespace-nowrap ${
                listing.bookingStatus === "open"
                  ? "border-green-500 text-green-400"
                  : "border-red-500 text-red-400"
              }`}
            >
              {listing.bookingStatus}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 my-2">
          <p className="text-xs text-[#867a5f]">
            <span className="text-[#F5A623] font-bold text-sm sm:text-base">
              ₹{listing.pricePerMonth}
            </span>
            /month
          </p>
          <span className="text-xs text-[#d0cbbc] font-medium rounded-sm text-right">
            Gender: {listing.genderPreference}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
