import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system"; // yarn remove package

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
    const html = `<h1> hello ${data.name} Please Sign below if you consent to riding bikes </h1>`;
    const { uri, base64 } = await Print.printToFileAsync({
      html,
      base64: true,
    });

    const source = base64;
    // const source = `data:application/pdf;base64,${base64}`;

    // const fullPdf = Pdf

    // let fileBase64 = await FileSystem.readAsStringAsync(fileUri.uri, {
    //   encoding: "base64",
    // });

    // const referenceString = `docToSign/${uri}${Date.now()}.pdf`;
    // open sharing options here
    // Sharing.shareAsync(uri);

    // email signee contract

    var url = `data:image/png;base64, ${base64}`;

    fetch(url)
      .then((res) => res.blob())
      .then(console.log(`Playground.js - 54 - 🍎`, url));
    // const storageRef = storage.ref();
    // storageRef
    //   .child(`docToSign/${user.uid}${Date.now()}.pdf`)
    //   .putString(base64, "base64", { contentType: "application/pdf" })
    //   .then(function (snapshot) {
    //     console.log("🌦", snapshot);
    //   });

    // console.log(`Playground.js - 59 - 🍎`, blob);
  }

  // add document to sign to storage #############################################
  const uploadForSigning = async (test) => {
    // upload the PDF with fields as AcroForm
    const storageRef = storage.ref();
    // const referenceString = `docToSign/${user.uid}${Date.now()}.pdf`; // we could create this in the execute function call
    // const docRef = storageRef.child(referenceString);

    // docRef.putString(source, "base64").then(function (snapshot) {
    //   console.log("Uploaded the blob");
    // });

    storageRef
      .child(`docToSign/${user.uid}${Date.now()}.pdf`)
      .putString(test, "base64", { contentType: "application/pdf" })
      .then(function (snapshot) {
        console.log("🌦", snapshot);
      });

    // console.log(`Playground.js - 99 - 🌎`, test);
  };
  // add document to sign end #############################################

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
