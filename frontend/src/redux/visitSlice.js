import { createSlice } from "@reduxjs/toolkit";

const visitSlice = createSlice({
  name: "visits",
  initialState: {
    visits: []
  },
  reducers: {
    setVisits: (state, action) => {
      state.visits = action.payload;
    },
    updateVisitStatus: (state, action) => {
      const { visitId, status } = action.payload;
      if (!Array.isArray(state.visits)) return;
      const visit = state.visits.find((v) => v._id === visitId);
      if (visit) {
        visit.status = status;
      }
    }
  }
});

export const { setVisits, updateVisitStatus } = visitSlice.actions;
export default visitSlice.reducer;
