import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";

// ({destructuring - extracting only what we need})
export default function Home({ navigation }) {
  const [reviews, setReviews] = useState([
    { title: "Sandra x Aleko", rating: 5, body: "lorem ipsum", key: "1" },
    { title: "Road to a milli", rating: 5, body: "lorem ipsum", key: "2" },
    { title: "Love is on the way", rating: 4, body: "lorem ipsum", key: "3" },
  ]);

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ReviewDetails", item)}
          >
            <Card>
              <Text style={globalStyles.titleText}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
