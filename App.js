import React, { useState } from "react";
import { useFonts } from "expo-font";
import Home from "./screens/home";
import AppLoading from "expo-app-loading";
import Navigator from "./routes/homeStack";

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
    return <Navigator />;
  }
}
