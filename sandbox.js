import React, { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Navigator from "./routes/drawerNavigator";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// we use the provider to get acces to the redux store
// wrap everything that needs access to the store inside the provider
import store from "./redux/store";
import { Provider } from "react-redux";

import Login from "./screens/login";
import Signup from "./screens/signup";
import Home from "./screens/home";
import About from "./screens/about";

const Drawer = createDrawerNavigator();

export default function App() {
  // Load fonts before rendering running the rest of the code below
  const [fontsLoaded] = useFonts({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });

  // if fonts are not loaded
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    // if fonts are loaded
    // return <Home />;
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Signup" component={Signup} />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="About" component={About} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
