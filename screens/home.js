import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";

// ({destructuring - extracting only what we need})
export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    { title: "Sandra x Aleko", rating: 2, body: "lorem ipsum", key: "1" },
    { title: "Road to a milli", rating: 5, body: "lorem ipsum", key: "2" },
    { title: "Love is on the way", rating: 4, body: "lorem ipsum", key: "3" },
    { title: "Owe me", rating: 3, body: "lorem ipsum", key: "4" },
  ]);

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={24}
            onPress={() => setModalOpen(false)}
          />
          <Text>Hello from the modal!</Text>
        </View>
      </Modal>

      <MaterialIcons name="add" size={24} onPress={() => setModalOpen(true)} />

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

const styles = StyleSheet.create({
  modalContent: {},
});
