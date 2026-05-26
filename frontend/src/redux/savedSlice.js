import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
    name: "saved",
    initialState: {
        savedListings: []
    },
    reducers: {
        setSavedListings: (state, action) => {
            state.savedListings = action.payload;
        },
        addToSavedListings: (state, action) => {
            state.savedListings.push(action.payload)
        },
        removeFromSavedListings: (state, action) => {
            state.savedListings = state.savedListings.filter((item) =>
                item.savedListing._id !== action.payload
            )
        }
    }
});

export const { setSavedListings, addToSavedListings, removeFromSavedListings } = savedSlice.actions;
export default savedSlice.reducer;