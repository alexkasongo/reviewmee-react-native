import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function Playground() {
  const data = { name: "Aleko", age: 29 };

  async function execute(data) {
    const html = `<h1> hello ${data.name} Please Sign below if you consent to riding bikes </h1>`;
    const { uri } = await Print.printToFileAsync({ html });
    Sharing.shareAsync(uri);
  }
  return (
    <View style={styles.container}>
      <Button title="Sign" onPress={() => execute(data)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
