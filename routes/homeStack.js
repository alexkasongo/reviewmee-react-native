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
  ReviewDetails: {
    screen: ReviewDetails,
    navigationOptions: {
      // title: "Review Details",
      // headerLeft: 20,
      headerBackTitleVisible: false,
      // headerStyle: {
      //   backgroundColor: "red",
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
    headerTitleAlign: "center",
    height: "100%",
  },
});

export default Homestack;
