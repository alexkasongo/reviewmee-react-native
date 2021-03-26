import { createSlice } from "@reduxjs/toolkit";
import firebase from "../../database/firebase";

export const signinSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    errorMessage: null,
    isSuccess: false,
  },
  reducers: {
    signin: async (state, action) => {
      //   do something here: we have access to action.payload
      const payload = action.payload;
      console.log(`userReducer.js - 11 - 🍎 you clicked me`, payload);

      //   state.isLoading = true;
      //   await firebase
      //     .auth()
      //     .signInWithEmailAndPassword(payload.email, payload.password)
      //     .then((res) => {
      //       console.log("✅", res);
      //       console.log("User logged-in successfully!");
      //       // stop loading
      //       state.isLoading = false;
      //       // navigate to home and clear form
      //       state.isSuccess = true;
      //     })
      //     .catch((error) => {
      //       // stop loading
      //       state.isLoading = false;
      //       console.log(`login.js - 54 - 🍎`, error.message);
      //       // if error
      //       state.isError = true;
      //       // error message
      //       state.errorMessage = error;
      //     });
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
