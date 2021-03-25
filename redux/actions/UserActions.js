import { Alert } from "react-native";
import firebase from "../../database/firebase";

//  actions - dispatches/commits object
export const onUserLogin = ({ email, password }) => {
  console.log(`index.js - 1 👀 ✅ 🔥`, { email, password });
  return (dispatch) => {
    // firebase
    if (email === "" && password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      //   this.setState({
      //     isLoading: true,
      //   });

      // dispatch({ type: "IS_LOADING", payload: true });

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          console.log("🌎 User logged-in successfully!");
          //   this.setState({
          //     isLoading: false,
          //     email: "",
          //     password: "",
          //   });
          // dispatch({ type: "IS_LOADING", payload: false });
          // this.props.navigation.navigate("Home");
          dispatch({ type: "DO_LOGIN", payload: Response.data });
        })
        .catch((error) => {
          // dispatch({ type: "IS_LOADING", payload: false });
          console.log(`login.js - 54 - 🍎`, error.message);
          // dispatch({ type: "ON_ERROR", payload: error });
        });
    }

    // dispatch({ type: "DO_LOGIN", payload: Response.data });
  };
};
