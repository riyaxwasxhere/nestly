import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: "student",
    initialState: {
        studentView: "Dashboard"
    },
    reducers: {
        setStudentView: (state, action) => {
            state.studentView = action.payload
        }
    }
})

export const {setStudentView} = studentSlice.actions
export default studentSlice.reducer