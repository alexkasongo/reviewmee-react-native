import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../styles/global";

export default function Profile() {
  return (
    <View style={globalStyles.container}>
      <Text>Profile</Text>
      <Text>Welcome to your profile page fam 🍎</Text>
    </View>
  );
}
