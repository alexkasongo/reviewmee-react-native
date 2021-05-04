import { createSlice } from "@reduxjs/toolkit";

export const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    user: null,
    docs: [],
    docsSigned: [],
    isLoading: false,
    userDocs: null,
  },
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload;
    },
    setUserDocs: (state, action) => {
      state.userDocs = action.payload;
    },
    setLoading: (state, action) => {
      //   do something here: we have access to action.payload
      state.isLoading = action.payload;
    },
    signout: (state, action) => {
      //   do something here: we have access to ction.payload
      // console.log(`userReducer.js - 11 - 🏝 LOGOUT`);
      state.userInfo = null;
    },
  },
});

export const {
  setUser,
  setLoading,
  signout,
  setUserDocs,
} = firebaseSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state) => state.firebase.user;
export const selectUserDocs = (state) => state.firebase.userDocs;
export const selectLoading = (state) => state.firebase.isLoading;

export default firebaseSlice.reducer;
