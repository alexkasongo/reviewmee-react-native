import { createStackNavigator } from "react-navigation-stack";
import About from "../screens/about";
import Header from "../shared/header";
import React from "react";

const screens = {
  // every screen automatically gets navigation property on the
  // props assigned to it
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
      // headerStyle: {
      //   backgroundColor: "#eee",
      // },
    },
  },
};

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: {
      backgroundColor: "#eee",
      //   height: 80,
    },
  },
});

export default AboutStack;
