import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: true,
    city: null,
    selectedChat: null
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setSelectedChat: (state, action)=>{
      state.selectedChat = action.payload
    }
  }
});

export const { setUserData, setLoading, setCity, setSelectedChat } = userSlice.actions;

export default userSlice.reducer;
