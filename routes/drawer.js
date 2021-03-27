import React, { useState } from "react";
// import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";

import Loginstack from "./loginStack";
import Signupstack from "./signupStack";
import Homestack from "./homeStack";
import AboutStack from "./aboutStack";

import Login from "./../screens/login";
import Signup from "./../screens/signup";
import Home from "./../screens/home";
import About from "./../screens/about";

// const RootDrawerNavigator = createDrawerNavigator({
//   Login: {
//     screen: Loginstack,
//   },
//   Signup: {
//     screen: Signupstack,
//   },
//   Home: {
//     screen: Homestack,
//   },
//   About: {
//     screen: AboutStack,
//   },
// });

// export default createAppContainer(RootDrawerNavigator);

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}
