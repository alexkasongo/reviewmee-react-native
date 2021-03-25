import { createSlice } from "@reduxjs/toolkit";
import firebase from "../../database/firebase";

export const signinSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
    isLoading: false,
    signinErrors: null,
  },
  reducers: {
    signin: async (state, action) => {
      //   do something here: we have access to action.payload
      const payload = action.payload;
      console.log(`userReducer.js - 11 - 🍎 you clicked me`, payload);

      state.isLoading = true;
      await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          console.log("✅", res);
          console.log("User logged-in successfully!");
          // stop loading
          state.isLoading = false;
          // clear form
          // navigate to home
          // navigation.navigate("Home");
        })
        .catch((error) => {
          state.isLoading = false;
          console.log(`login.js - 54 - 🍎`, error.message);
          state.signinErrors = error;
        });
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
