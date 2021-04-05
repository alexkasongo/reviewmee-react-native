import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
// import firebase from "../database/firebase";

// form stuff
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/button";
// form stuff end

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import { signinUser, loading } from "../redux/reducers/userReducer";
// redux stuff end

// a schema is a set of rules defined in an object
const loginSchema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().required().min(4),
  password: yup.string().required().min(4),
});
// schema end

export default function Login({ navigation }) {
  // talk to redux
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // talk to redux end

  // login function
  const signup = (payload) => {
    // start loading
    dispatch(loading(true));
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: payload.name,
        });
        console.log("User registered successfully!");
        const obj = {
          displayName: payload.name,
          email: res.user.email,
          emailVerified: res.user.emailVerified,
          phoneNumber: res.user.phoneNumber,
          photoURL: res.user.photoURL,
          uid: res.user.uid,
        };
        console.log("✅", obj);
        dispatch(signinUser(obj));
        // stop loading
        dispatch(loading(false));
        navigation.navigate("ProfileStackNavigator");
      })
      .catch((error) => {
        // stop loading
        dispatch(loading(false));
        console.log(`login.js - 54 - 🍎`, error.message);
      });
  };
  // login function end

  // component
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
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
              signup(values);
            }}
          >
            {/* if validation fails, yup passes errors in props.errors below */}
            {(props) => (
              <View>
                <TextInput
                  style={globalStyles.input}
                  placeholder="name"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                  onBlur={props.handleBlur("name")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.name && props.errors.name}
                </Text>
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
                <FlatButton text="Signup" onPress={props.handleSubmit} />
                <Text
                  style={styles.loginText}
                  onPress={() => navigation.navigate("Signin")}
                >
                  Already Registered? Click here to login
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
