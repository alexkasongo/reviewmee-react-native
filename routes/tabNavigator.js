import React from "react";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator } from "./stackNavigator";
import { ProfileStackNavigator } from "./stackNavigator";
import { SettingsStackScreen } from "./stackNavigator";
import { PlaygroundStackScreen } from "./stackNavigator";

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
      initialRouteName="ProfileStackNavigator"
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
      <Tab.Screen name="MainStackNavigator" component={MainStackNavigator} />
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
      />
      <Tab.Screen name="SettingsStackScreen" component={SettingsStackScreen} />
      <Tab.Screen
        name="PlaygroundStackScreen"
        component={PlaygroundStackScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
