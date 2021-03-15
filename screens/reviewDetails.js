import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { globalStyles } from "../styles/global";

// ({destructuring - only using what's needed})
export default function ReviewDetails({ navigation }) {
  const pressHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <Text>Review</Text>
      <Button title="back to home screen" onPress={prsessHandler} />
    </View>
  );
}
