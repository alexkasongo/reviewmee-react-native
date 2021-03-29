import React from "react";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator } from "./stackNavigator";
import { ProfileStackNavigator } from "./stackNavigator";
import Profile from "../screens/profile";

const Tab = createBottomTabNavigator();

const HomeIcon = ({ focused, tintColor }) => (
  <Icon
    name="lens"
    type="material"
    size={26}
    color={focused ? "#adacac" : "#ededed"}
  />
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => <HomeIcon {...props} />,
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        showLabel: false,
        showIcon: true,
        indicatorStyle: {
          backgroundColor: "transparent",
        },
        labelStyle: {
          fontSize: 12,
        },
        iconStyle: {
          width: 30,
          height: 30,
        },
        style: {
          // backgroundColor: 'transparent',
          justifyContent: "center",
        },
      }}
    >
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
