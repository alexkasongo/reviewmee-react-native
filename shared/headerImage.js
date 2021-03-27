import React from "react";
import { Image } from "react-native";

export default function HeaderImage() {
  return (
    <Image
      style={{ height: "100%", flex: 1 }}
      source={require("../assets/game_bg.png")}
    />
  );
}
