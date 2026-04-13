import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        ownerView: "Dashboard"
    },
    reducers: {
        setOwnerView: (state, action) => {
            state.ownerView = action.payload
        }
    }
})

export const {setOwnerView} = ownerSlice.actions
export default ownerSlice.reducer