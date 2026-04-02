import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        view: "signin"
    },
    reducers: {
        setView: (state, action) => {
            state.view = action.payload
        }
    }
})

export const {setView} = authSlice.actions
export default authSlice.reducer