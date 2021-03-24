import { createStackNavigator } from "react-navigation-stack";
import Signup from "../screens/signup";
import Header from "../shared/header";
import React from "react";

const screens = {
  // every screen automatically gets navigation property on the
  // props assigned to it
  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="ConsentMee" />
        ),
        // headerStyle: {
        //   backgroundColor: "red",
        // },
      };
    },
  },
};

const Signupstack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: {
      backgroundColor: "#eee",
      // height: 80,
    },
    headerTitleAlign: "center",
    height: "100%",
  },
});

export default Signupstack;
