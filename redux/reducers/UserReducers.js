import { DO_LOGIN } from "../actions/UserActions";
import { Alert } from "react-native";
import firebase from "../../database/firebase";
// export const userReducer = (state = null, action) => {
//   console.log("🏝 action received", action);
//   switch (action.type) {
//     case DO_LOGIN:
//       return [action.payload];
//   }
//   return state;
// };

// reducers - similar to mutations in vuex, used for storing the data in state
export const userReducer = (state = null, action) => {
  // if (action.type === "DO_LOGIN") {
  //   console.log("🏝 action received", action);
  //   switch (action.payload) {
  //     case DO_LOGIN:
  //       return {
  //         ...state,
  //         user: action.payload,
  //       };
  //     case "IS_LOADING":
  //       return {
  //         ...state,
  //         isLoading: action.payload,
  //       };
  //     case "ON_ERROR":
  //       return {
  //         ...state,
  //         appError: action.payload,
  //       };
  //     default:
  //       return {
  //         state,
  //       };
  //   }
  // }

  if (action.type === "DO_LOGIN") {
    if (action.payload.email === "" && action.payload.password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      // this.setState({
      //   isLoading: true,
      // });
      firebase
        .auth()
        .signInWithEmailAndPassword(
          action.payload.email,
          action.payload.password
        )
        .then((res) => {
          console.log(res);
          console.log("User logged-in successfully!");
          // this.setState({
          //   isLoading: false,
          //   email: "",
          //   password: "",
          // });
          this.props.navigation.navigate("Home");
        })
        .catch((error) => {
          // this.setState({ isLoading: false });
          console.log(`login.js - 54 - 🍎`, error.message);
          // this.setState({ errorMessage: error.message });
        });
    }
  }
  return state;
};
