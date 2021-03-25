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
import firebase from "../database/firebase";

import { connect } from "react-redux";
import { onUserLogin } from "../redux/actions/UserActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      errorMessage: null,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res);
          console.log("User logged-in successfully!");
          this.setState({
            isLoading: false,
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Home");
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          console.log(`login.js - 54 - 🍎`, error.message);
          this.setState({ errorMessage: error.message });
        });
    }
  };

  handlePress = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signIn(data);
  };

  render() {
    // console.log(`login.js - 68 - ✅`, this.props);

    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, "email")}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, "password")}
            maxLength={15}
            secureTextEntry={true}
          />

          {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
          {/* <Button
            color="#3740FE"
            title="Signin"
            onPress={() => this.userLogin()}
          /> */}

          <View style={styles.test}>
            <Button
              color="#3740FE"
              title="on props"
              onPress={() => this.handlePress()}
            />
          </View>

          {/* <View style={styles.test}>
            <Button
              color="#3740FE"
              title="Action"
              onPress={() =>
                onUserLogin({
                  email: this.state.email,
                  password: this.state.password,
                })
              }
            />
          </View> */}

          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            Don't have account? Click here to signup
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
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
  test: {
    marginTop: 10,
  },
});

// store

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (payload) => {
      dispatch({ type: "DO_LOGIN", payload });
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
