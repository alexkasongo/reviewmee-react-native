import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import ReviewDetails from "../screens/reviewDetails";
import Header from "../shared/header";
import React from "react";

const screens = {
  // every screen automatically gets navigation property on the
  // props assigned to it
  Home: {
    screen: Home,
    navigationOptions: {
      // headerTitle can take a function a value which returns a component
      headerTitle: () => <Header />,
      // headerStyle: {
      //   backgroundColor: "#eee",
      // },
    },
  },
  ReviewDetails: {
    screen: ReviewDetails,
    navigationOptions: {
      title: "Review Details",
      // headerStyle: {
      //   backgroundColor: "#eee",
      // },
    },
  },
};

const Homestack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: {
      backgroundColor: "#eee",
      // height: 80,
    },
  },
});

export default Homestack;
