import React, { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./routes/drawerNavigator";
import TabNavigator from "./routes/tabNavigator";

// we use the provider to get acces to the redux store
// wrap everything that needs access to the store inside the provider
import store from "./redux/store";
import { Provider } from "react-redux";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

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
          <DrawerNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}
