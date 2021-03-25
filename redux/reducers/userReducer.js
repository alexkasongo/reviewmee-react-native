import { createSlice } from "@reduxjs/toolkit";

export const signinSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    signin: (state, action) => {
      //   do something here: we have access to ction.payload
      console.log(`userReducer.js - 11 - 🍎 you clicked me`);
      state.value = "aleko kasongo";
    },
    signout: (state, action) => {
      //   do something here: we have access to ction.payload
      console.log(`userReducer.js - 11 - 🏝 you clicked me`);
      state.value = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, signout } = signinSlice.actions;

export default signinSlice.reducer;
