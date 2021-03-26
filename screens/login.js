import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import firebase from "../database/firebase";

// form stuff
import { globalStyles } from "../styles/global";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/button";
// form stuff end

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  signinUser,
  loading,
  success,
  signout,
} from "../redux/reducers/userReducer";
// redux stuff end

// a schema is a set of rules defined in an object
const loginSchema = yup.object({
  email: yup.string().required().min(4),
  password: yup.string().required().min(4),
});
// schema end

export default function Login({ navigation }) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const isError = useSelector((state) => state.user.isError);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  // you can think of useEffect Hook as componentDidMount,
  // componentDidUpdate, and componentWillUnmount combined.
  useEffect(() => {
    console.log(`login.js - 42 - 👀 Hopefully this works`);
    if (isSuccess) {
      // dispatch(clearState());
      navigation.navigate("Home");
    }

    if (isError) {
      // do something with the error message
      // toast.error(errorMessage);
      // dispatch(clearState());
    }
  }); //[isSuccess, isError]

  // login function
  const login = (payload) => {
    // dispatch(loading(true));
    console.log(`login.js - 58 - 🌱`, payload.email, payload.password);
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((res) => {
        console.log("User logged-in successfully!");
        // store user info
        // const map = res.user;
        // const result = Object.values(map);

        // console.log("✅", res.user.providerData);

        dispatch(signinUser(res.user));

        // stop loading
        // dispatch(loading(false));

        // navigate to home and clear form
        // dispatch(success(true));
        // navigation.navigate("Signup");
      })
      .catch((error) => {
        // stop loading
        // dispatch(loading(false));

        console.log(`login.js - 54 - 🍎`, error.message);
        // if error
        // dispatch(isError(true));
        // error message
        // dispatch(errorMessage(error));
      });
  };
  // login function end

  const obj = {
    Name: "Akash Mittal",
    Startup: "StudyWise",
    Description: "Kids Education App",
    Link: "https://play.google.com/store/apps/details?id=com.studywise",
  };

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
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              // add the review here using the addReview() prop
              // actions.resetForm();
              login(values);
              // dispatch(signinUser(values));
            }}
          >
            {/* if validation fails, yup passes errors in props.errors below */}
            {(props) => (
              <View>
                {/* Conditional rendering */}
                {/* {userInfo !== null && userInfo.map((res) => <Text>{res}</Text>)} */}

                {userInfo !== null &&
                  Object.keys(userInfo).map((itemKey) => {
                    return (
                      // <View key={itemKey}>
                      //   <Text>{itemKey}</Text>
                      //   <Text>
                      //     {itemKey === "Link" ? (
                      //       <Text href={obj[itemKey]}>{obj[itemKey]}</Text>
                      //     ) : (
                      //       obj[itemKey]
                      //     )}
                      //   </Text>
                      // </View>
                      <Text>{itemKey}</Text>
                    );
                  })}

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
                <FlatButton text="submit" onPress={props.handleSubmit} />
                <Button title="logout" onPress={() => dispatch(signout())} />
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
  // }
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
