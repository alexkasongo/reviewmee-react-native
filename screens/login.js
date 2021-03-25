import React, { Component } from "react";
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

// form stuff
import { globalStyles } from "../styles/global";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/button";
// form stuff end

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../redux/reducers/userReducer";
// redux stuff end

// a schema is a set of rules defined in an object
const ReviewSchema = yup.object({
  name: yup.string().required().min(4),
  email: yup.string().required().min(4),
  pasword: yup.string().required().min(4), // to be updated later
  // rating: yup
  //   .string()
  //   .required()
  //   .test("is-num-1-5", "Rating must be a number 1 - 5", (val) => {
  //     return parseInt(val) < 6 && parseInt(val) > 0;
  //   }),
});
// schema end

export default function Login({ navigation }) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

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
            validationSchema={ReviewSchema}
            onSubmit={(values, actions) => {
              // add the review here using the addReview() prop
              actions.resetForm();
              // dispatch(signin(values));
              console.log(`login.js - 65 - 🔥`);
            }}
          >
            {/* if validation fails, yup passes errors in props.errors below */}
            {(props) => (
              <View>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Name"
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
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.password && props.errors.password}
                </Text>
                <Button title="submit" onPress={props.handleSubmit} />
                {/* <FlatButton text="submit" onPress={props.handleSubmit} /> */}
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
