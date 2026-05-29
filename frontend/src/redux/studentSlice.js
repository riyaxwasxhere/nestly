import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    studentView: "Dashboard",
    institution: ""
  },
  reducers: {
    setStudentView: (state, action) => {
      state.studentView = action.payload;
    },
    setInstitution: (state, action) => {
      state.institution = action.payload;
    }
  }
});

export const { setStudentView, setInstitution } = studentSlice.actions;
export default studentSlice.reducer;
