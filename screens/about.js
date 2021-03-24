import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function About() {
  return (
    <View style={globalStyles.container}>
      <Text>About</Text>
      <Text>
        ConsentMee makes it easy for you to consent. No matter the circumstance,
        you can count on ConsentMee for a quick consent 🍎
      </Text>
    </View>
  );
}
