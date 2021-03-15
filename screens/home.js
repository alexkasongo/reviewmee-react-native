import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { globalStyles } from "../styles/global";

// ({destructuring-taking in only what we need})
export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("ReviewDetails");
    // more explicit
    // navigation.push("ReviewDetails");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>ReviewMee</Text>
      <Button title="go to contracts" onPress={pressHandler} />
    </View>
  );
}
