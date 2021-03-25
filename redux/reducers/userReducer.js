import { createSlice } from "@reduxjs/toolkit";

export const signinSlice = createSlice({
  name: "signinUser",
  initialState: {
    user: null,
  },
  reducers: {
    signin: (state, action) => {
      //   do something here: we have access to ction.payload
    },
    signout: (state, action) => {
      //   do something here: we have access to ction.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = signinSlice.actions;

export default signinSlice.reducer;
