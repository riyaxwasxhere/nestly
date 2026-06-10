import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: []
  },
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    updateBookingStatus: (state, action) => {
      const { bookingId, status } = action.payload;
      if (!Array.isArray(state.bookings)) return;
      const booking = state.bookings.find((b) => b._id === bookingId);
      if (booking) {
        booking.status = status;
      }
    }
  }
});

export const { setBookings, updateBookingStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
