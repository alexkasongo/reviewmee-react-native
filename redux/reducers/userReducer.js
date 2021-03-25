import { createSlice } from "@reduxjs/toolkit";

export const signinSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    signin: (state, action) => {
      //   do something here: we have access to ction.payload
      console.log(`userReducer.js - 11 - 🍎 you clicked me`);
    },
    signout: (state, action) => {
      //   do something here: we have access to ction.payload
      console.log(`userReducer.js - 11 - 🏝 you clicked me`);
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, signout } = signinSlice.actions;

export default signinSlice.reducer;
