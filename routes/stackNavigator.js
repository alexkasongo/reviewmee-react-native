import React from "react";
import { Text, View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// import Home from "../screens/home";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import Header from "../shared/header";
import HeaderImage from "../shared/headerImage";
import ReviewDetails from "../screens/reviewDetails";
import About from "../screens/about";
import Profile from "../screens/profile";
import Settings from "../screens/Settings";
import SettingsOptions from "../screens/Settings/Options";
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
      mode="modal"
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
      <Stack.Screen name="ReviewDetails" component={ReviewDetails} />
      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{
          headerShown: false,
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

// const Home = ({ navigation }) => (
//   <View style={{ padding: 50 }}>
//     <Button
//       onPress={() => navigation.navigate("Modal")}
//       title="Activate Modal!!!"
//     />
//   </View>
// );

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
    </Stack.Navigator>
  );
};

function SettingsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Options" component={SettingsOptions} />
    </Stack.Navigator>
  );
}

function PlaygroundStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Playground} />
      <Stack.Screen name="Options" component={PlaygroundOptions} />
    </Stack.Navigator>
  );
}

export {
  MainStackNavigator,
  ProfileStackNavigator,
  SettingsStackScreen,
  PlaygroundStackScreen,
};
