import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/home";
import Header from "../shared/header";
import HeaderImage from "../shared/headerImage";
import ReviewDetails from "../screens/reviewDetails";
import About from "../screens/about";
import Profile from "../screens/profile";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: " ",
  headerShown: false,
};

const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9AC4F8",
        },
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: (props) => (
            <Header navigation={navigation} title="ConsentMee" />
          ),
          // headerBackground: () => <HeaderImage />,
        }}
      />
      <Stack.Screen name="ReviewDetails" component={ReviewDetails} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ProfileStackNavigator };
