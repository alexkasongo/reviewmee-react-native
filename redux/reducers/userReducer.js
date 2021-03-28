import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    userInfo: null, // object are not valid as React child
    isLoading: false,
    isError: false,
    errorMessage: null,
    isSuccess: false,
  },
  reducers: {
    signinUser: (state, action) => {
      // console.log(`userReducer.js - 14 - 🍎`, action.payload);
      //   do something here: we have access to action.payload
      state.userInfo = action.payload;
    },
    loading: (state, action) => {
      //   do something here: we have access to action.payload
      state.isLoading = action.payload;
    },
    success: (state, action) => {
      //   do something here: we have access to action.payload
      state.success = action.payload;
    },
    signout: (state, action) => {
      //   do something here: we have access to ction.payload
      // console.log(`userReducer.js - 11 - 🏝 LOGOUT`);
      state.userInfo = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signinUser, loading, success, signout } = userReducer.actions;

export default userReducer.reducer;
