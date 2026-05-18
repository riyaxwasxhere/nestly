import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    ownerView: "Dashboard",
    editListing: null
  },
  reducers: {
    setOwnerView: (state, action) => {
      state.ownerView = action.payload;
    },
    setEditListing: (state, action) => {
      state.editListing = action.payload;
    }
  }
});

export const { setOwnerView, setEditListing } = ownerSlice.actions;
export default ownerSlice.reducer;
