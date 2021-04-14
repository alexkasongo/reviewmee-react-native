import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system"; // yarn remove package
import trialContract from "../../contracts/trialContract";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setUser, selectUser } from "../../firebase/firebaseSlice";
// redux end

// from firebase
import { storage, addDocumentToSign } from "../../firebase/firebase";
import { aleko } from "../../firebase/firebase";

export default function Playground() {
  // get user data
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const data = { name: "Aleko", age: 29 };

  useEffect(() => {
    console.log(`drawerNavigator.js - 23 - 👘 Playground open`);
  }, [dispatch]);

  async function execute(data) {
    const html = `${trialContract.}`;
    const { uri, base64 } = await Print.printToFileAsync({
      html,
      base64: true,
    });

    // Convert image path to blob react native
    // const uploadPdf = async (imageUri) => {
    //   const response = await fetch(imageUri);
    //   const blob = await response.blob();

    //   const storageRef = storage.ref();
    //   storageRef
    //     .child(`docToSign/${user.uid}${Date.now()}.pdf`)
    //     .put(blob)
    //     .then(function (snapshot) {
    //       console.log("PDF blob created and upload successfuly Aleko 😊");
    //     });
    // };

    // uploadPdf(uri);

    Sharing.shareAsync(uri);
  }

  const source = {
    uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    cache: true,
  };

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
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
