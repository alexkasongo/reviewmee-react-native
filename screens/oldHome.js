import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "./reviewForm";
import firebase from "../database/firebase";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../redux/reducers/userReducer";
// redux stuff end

// ({destructuring - extracting only what we need})
export default function OldHome({ navigation }) {
  // run on component mount
  useEffect(() => {
    console.log(`login.js - 42 - 👀 check if user is logged in`);

    // NOTE what is this???
    // firebase.auth().onAuthStateChanged((user) => {
    //   // this.user = user;

    //   // if there's no user navigate to login
    //   if (!this.user) {
    //     navigation.navigate('Login')
    //   }
    // });
  });

  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    { title: "Consent Contracts", rating: 2, body: "lorem ipsum", key: "1" },
    { title: "Roommate Contracts", rating: 5, body: "lorem ipsum", key: "2" },
    { title: "Custom Contracts", rating: 4, body: "lorem ipsum", key: "3" },
    { title: "Friendship Contracts", rating: 3, body: "lorem ipsum", key: "4" },
  ]);

  // this function is passed as a prop in the review form
  const addReview = (review) => {
    // generate unique key
    review.key = Math.random().toString();
    setReviews((currentReviews) => {
      return [review, ...currentReviews];
    });
    // close modal
    setModalOpen(false);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(signout());
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(`home.js - 70 - 🥶`, error);
      });
    // .catch((error) => setState({ errorMessage: error.message }));
  };

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalOpen(false)}
            />
            <ReviewForm addReview={addReview} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* NOTE what is this */}
      {/* <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
        <Text>Open stack Modal</Text>
      </TouchableOpacity> */}
      
      {/* <MaterialIcons
        name="add"
        size={24}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
      /> */}

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

      <MaterialIcons
        name="add"
        size={24}
        style={styles.modalToggle}
        onPress={() => navigation.navigate("Modal")}
      />

      <Button color="#3740FE" title="Logout" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 40,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  test: {
    marginBottom: 20,
  },
});
