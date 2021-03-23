import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { globalStyles, images } from "../styles/global";
import Card from "../shared/card";

// ({destructuring - extracting only what we need})
export default function ReviewDetails({ navigation }) {
  const rating = navigation.getParam("rating");

  return (
    <View style={globalStyles.container}>
      <Card>
        <Text>{navigation.getParam("title")}</Text>
        <Text>{navigation.getParam("body")}</Text>
        <View style={styles.rating}>
          <Text>Contract Rating: </Text>
          <Image source={images.ratings[rating]} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});
