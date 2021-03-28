import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator } from "./stackNavigator";
import Profile3 from "../screens/Profile3";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Profile" component={Profile3} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
