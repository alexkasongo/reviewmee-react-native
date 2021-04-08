import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

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
    const { uri } = await Print.printToFileAsync({ html });

    const referenceString = `docToSign/${uri}${Date.now()}.pdf`;
    // open sharing options here
    // Sharing.shareAsync(uri);

    // console.log(`Playground.js - 34 - >>>STRING<<<`, referenceString);

    // email signee contract
    // console.log(`Playground.js - 16 - >>> 🌱 PFD <<<`, uri);

    // doc should have unique ref
    // create unique doc code using file name
    // addDocumentToSign(user.uid, user.email, uri, docRef);

    // Testing the storage functionality
    // ########################
    storage
      // .ref("docToSign/" + user.uid + logoFileExt)
      .ref(`docToSign/${user.uid}${Date.now()}.pdf`)
      .put(uri)
      .then((fileData) => {
        let fullPath = fileData.metadata.fullPath;
        return firebase.storage().ref(fullPath).getDownloadURL();
      })
      .then((URL) => {
        pdfUrl = URL;
        console.log(`Playground.js - 55 - 🍎 >>>PDF URL<<<`, pdfUrl);
        return pdfUrl;
      })
      .catch((error) => {
        console.log(`Playground.js - 82 - 👑`, error);
      });
    // ########################
  }

  // add document to sign to storage #############################################
  const uploadForSigning = async () => {
    // upload the PDF with fields as AcroForm
    // const storageRef = storage.ref();
    // const referenceString = `docToSign/${uid}${Date.now()}.pdf`; // we could create this in the execute function call
    // const docRef = storageRef.child(referenceString);
    // const { docViewer, annotManager } = instance;
    // const doc = docViewer.getDocument();
    // const xfdfString = await annotManager.exportAnnotations({
    //   widgets: true,
    //   fields: true,
    // });
    // const data = await doc.getFileData({ xfdfString });
    // const arr = new Uint8Array(data);
    // const blob = new Blob([arr], { type: "application/pdf" });
    // docRef.put(blob).then(function (snapshot) {
    //   console.log("Uploaded the blob");
    // });
    // // create an entry in the database
    // const emails = assignees.map((assignee) => {
    //   return assignee.email;
    // });
    // await addDocumentToSign(uid, email, referenceString, emails);
    // dispatch(resetSignee());
    // navigate("/");
  };
  // add document to sign end #############################################
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
