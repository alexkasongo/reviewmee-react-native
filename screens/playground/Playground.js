import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setUser, selectUser } from "../../firebase/firebaseSlice";
// redux end

// from firebase
import { addDocumentToSign } from "../../firebase/firebase";
import { aleko } from "../../firebase/firebase";

export default function Playground() {
  // get user data
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const data = { name: "Aleko", age: 29 };

  useEffect(() => {
    console.log(`drawerNavigator.js - 23 - 👘`, user);
  }, [dispatch]);

  async function execute(data) {
    const html = `<h1> hello ${data.name} Please Sign below if you consent to riding bikes </h1>`;
    const { uri } = await Print.printToFileAsync({ html });

    const docRef = "To be created";
    // open sharing options here
    // Sharing.shareAsync(uri);

    // email signee contract
    // console.log(`Playground.js - 16 - >>> 🌱 PFD <<<`, uri);

    // doc should have unique ref
    // create unique doc code using file name
    addDocumentToSign(user.uid, user.email, uri, docRef);
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
