import { createSlice } from "@reduxjs/toolkit";

export const signinSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
    isLoading: false,
  },
  reducers: {
    signin: (state, action) => {
      //   do something here: we have access to action.payload
      console.log(`userReducer.js - 11 - 🍎 you clicked me`, action.payload);
      state.value = "aleko kasongo";

      // userLogin = () => {
      //   if (this.state.email === "" && this.state.password === "") {
      //     Alert.alert("Enter details to signin!");
      //   } else {
      //     this.setState({
      //       isLoading: true,
      //     });
      //     firebase
      //       .auth()
      //       .signInWithEmailAndPassword(this.state.email, this.state.password)
      //       .then((res) => {
      //         console.log(res);
      //         console.log("User logged-in successfully!");
      //         this.setState({
      //           isLoading: false,
      //           email: "",
      //           password: "",
      //         });
      //         this.props.navigation.navigate("Home");
      //       })
      //       .catch((error) => {
      //         this.setState({ isLoading: false });
      //         console.log(`login.js - 54 - 🍎`, error.message);
      //         this.setState({ errorMessage: error.message });
      //       });
      //   }
      // };
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
