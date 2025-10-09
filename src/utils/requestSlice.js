import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {  //removing the con. req of user using _id passed when calling this action from store after accepting/rejecting 
      const newArray = state.filter((r) => r._id !== action.payload); //action.payload is the id which we will be sending as arg in removeRequest()
      return newArray;
    },
  },
});

export const { addRequests,removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
