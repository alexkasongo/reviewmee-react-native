import React from "react";
import { Text, View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// import Home from "../screens/home";
import CategoriesScreen from "../screens/categories/CategoriesScreen";
// contracts
import ContractsScreen from "../screens/contracts/ContractsScreen";
import ContractToSign from "../screens/contracts/contractToSign";
// contracts end
import Header from "../shared/header";
import HeaderImage from "../shared/headerImage";
import ReviewDetails from "../screens/reviewDetails";
import About from "../screens/about";
import Profile from "../screens/profile";
import Settings from "../screens/settings";
import SettingsOptions from "../screens/settings/Options";
import Viewer from "../screens/viever/Viewer";
import Playground from "../screens/playground/Playground";
import Assign from "../shared/Assign/Assign";
import PdfReader from "../shared/pdfReader/pdfReader";
import PlaygroundOptions from "../screens/playground/Options";

const Stack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="CategoriesScreen"
      // screenOptions={({ route }) => {
      //   return {
      //     gestureEnabled: true,
      //     cardOverlayEnabled: true,
      //     ...TransitionPresets.ModalPresentationIOS,
      //   };
      // }}
      // mode="card"
      // headerMode="none"
    >
      {/* <Stack.Screen name="Home" component={Home} /> */}
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
      <Stack.Screen
        name="Contracts"
        component={ContractsScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Sign"
        component={ContractToSign}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen name="Assign" component={Assign} />
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
      <Stack.Screen
        name="Sign"
        component={ContractToSign}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
      {/* <Stack.Screen name="Playground" component={Playground} /> */}
      <Stack.Screen name="PdfReader" component={PdfReader} />
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
      <Stack.Screen name="Assign" component={Assign} />
      {/* <Stack.Screen name="Playground" component={Playground} />
      <Stack.Screen name="PlaygroundOptions" component={PlaygroundOptions} /> */}
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  ProfileStackNavigator,
  SettingsStackScreen,
  PlaygroundStackScreen,
};
