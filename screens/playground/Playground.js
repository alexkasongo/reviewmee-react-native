import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system"; // yarn remove package
import PDFReader from "rn-pdf-reader-js";
import { trialContract } from "../../contracts/trialContract";
import { globalStyles } from "../../styles/global";
import Card from "../../shared/card";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  selectUser,
  setUnsignedUserDocs,
  selectUserDocs,
} from "../../firebase/firebaseSlice";
// redux end

// from firebase
import { storage, addDocumentToSign } from "../../firebase/firebase";

export default function Playground() {
  // get user data
  const user = useSelector(selectUser);
  const userDocs = useSelector(selectUserDocs);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(`drawerNavigator.js - 23 - 👘 Playground open`, user);
  }, [dispatch]);

  async function execute() {
    const html = `${trialContract.html}`;
    const { uri, base64 } = await Print.printToFileAsync({
      html,
      base64: true,
      // width: 2480,
      // height: 3508,
    });

    // upload the PDF
    const uploadPdf = async (imageUri) => {
      // Convert image path to blob react native
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // ##########################################
      const storageRef = storage.ref();
      const referenceString = `docToSign/${user.uid}${Date.now()}.pdf`;
      const docRef = storageRef.child(referenceString);
      docRef
        .put(blob)
        .then((fileData) => {
          let fullPath = fileData.metadata.fullPath;
          return storage.ref(fullPath).getDownloadURL();
        })
        .then((downloadURL) => {
          let pdfUrl = downloadURL;
          console.log(
            "PDF blob created and upload successfuly Aleko 😊",
            pdfUrl
          );
          // create an entry in the database
          addDocumentToSign(
            user.uid,
            user.email,
            "consentContract",
            pdfUrl,
            user.photoURL
          );
        });
      // ##########################################
    };

    uploadPdf(uri);

    // Sharing.shareAsync(uri);
  }

  const source = {
    uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    cache: true,
  };

  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={userDocs}
    //     renderItem={({ item }) => (
    //       <TouchableOpacity
    //         onPress={() => navigation.navigate("ReviewDetails", item)}
    //       >
    //         <Card>
    //           <Text style={globalStyles.titleText}>{item.email}</Text>
    //         </Card>
    //       </TouchableOpacity>
    //     )}
    //     keyExtractor={(item) => item.docId}
    //   />
    //   <Button title="Sign" onPress={() => execute()} />
    // </View>

    <PDFReader
      source={{
        uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
      }}
    />
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
