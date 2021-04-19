import React from "react";
import { Text, View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// import Home from "../screens/home";
import CategoriesScreen from "../screens/categories/CategoriesScreen";
import ContractsScreen from "../screens/contracts/ContractsScreen";
import Header from "../shared/header";
import HeaderImage from "../shared/headerImage";
import ReviewDetails from "../screens/reviewDetails";
import About from "../screens/about";
import Profile from "../screens/profile";
import Settings from "../screens/settings";
import SettingsOptions from "../screens/settings/Options";
import Viewer from "../screens/viever/Viewer";
import Playground from "../screens/playground/Playground";
import PlaygroundOptions from "../screens/playground/Options";

const Stack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="CategoriesScreen"
      screenOptions={({ route }) => {
        return {
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        };
      }}
      // mode="modal"
      // headerMode="none"
    >
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="ContractsScreen" component={ContractsScreen} />
      <Stack.Screen name="ReviewDetails" component={ReviewDetails} />
      <Stack.Screen
        name="Modal"
        component={Playground}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          headerTitle: (props) => (
            <Header navigation={navigation} title="ConsentMee" />
          ),
          // headerBackground: () => <HeaderImage />,
        }}
      />
    </Stack.Navigator>
  );
};

// dummy test screens
const Modal = () => (
  <View>
    <Text>Aleko Modal 🌎</Text>
  </View>
);
// dummy test screens end

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => {
        return {
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        };
      }}
      mode="modal"
      headerMode="none"
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Viewer"
        component={Viewer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="SettingsOptions" component={SettingsOptions} />
    </Stack.Navigator>
  );
};

const PlaygroundStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Playground" component={Playground} />
      <Stack.Screen name="PlaygroundOptions" component={PlaygroundOptions} />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  ProfileStackNavigator,
  SettingsStackScreen,
  PlaygroundStackScreen,
};
