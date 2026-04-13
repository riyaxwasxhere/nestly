import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        view: "signin",
        fpStep: 1
    },
    reducers: {
        setView: (state, action) => {
            state.view = action.payload
        },
        setFpStep: (state, action) => {
            state.fpStep = action.payload
        }
    }
})

export const {setView, setFpStep} = authSlice.actions
export default authSlice.reducer