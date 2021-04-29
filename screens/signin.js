import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { auth, signInWithGoogle } from "../firebase/firebase";

// form stuff
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/button";
// form stuff end

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../firebase/firebaseSlice";
import { loading } from "../firebase/firebaseSlice";
// redux stuff end

// a schema is a set of rules defined in an object
const loginSchema = yup.object({
  email: yup.string().required().min(4),
  password: yup.string().required().min(4),
});
// schema end

// Function Export begins here
export default function Signin({ navigation }) {
  const { isLoading } = useSelector((state) => state.firebase);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  // const user = useSelector(selectUser);

  useEffect(() => {
    // console.log(`Signin.js - 39 - 🥶`, navigation);
  });

  const signInWithEmailAndPasswordHandler = (email, password) => {
    // start loading
    dispatch(loading(true));
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("✅  User logged-in successfully!");

        const obj = {
          displayName: res.user.displayName,
          email: res.user.email,
          emailVerified: res.user.emailVerified,
          phoneNumber: res.user.phoneNumber,
          photoURL: res.user.photoURL,
          uid: res.user.uid,
        };

        dispatch(setUser(obj));

        // stop loading
        dispatch(loading(false));
      })
      .catch((error) => {
        // stop loading
        dispatch(loading(false));
        setError("Error signing in with password and email!");
        console.error("Error signing in with password and email", error);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.containerCenter}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
              signInWithEmailAndPasswordHandler(values.email, values.password);
            }}
          >
            {(props) => (
              <View>
                {/* {error !== null && <Text>{error}</Text>} */}
                <TextInput
                  style={globalStyles.input}
                  placeholder="Email"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.email && props.errors.email}
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Password"
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  onBlur={props.handleBlur("password")}
                  secureTextEntry
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.password && props.errors.password}
                </Text>
                {/* <Button
                onClick={signInWithGoogle}
                title="Sign in with Google"
                color="red"
              /> */}
                <FlatButton text="Signin" onPress={props.handleSubmit} />
                {/* <Button title="logout" onPress={() => dispatch(signout())} /> */}
                <Text
                  style={styles.loginText}
                  onPress={() => navigation.navigate("Signup")}
                >
                  Don't have account? Click here to signup
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
