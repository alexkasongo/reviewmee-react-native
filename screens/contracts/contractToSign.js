import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from "react-native";
import HTML from "react-native-render-html";
import { MaterialIcons } from "@expo/vector-icons";
import Signature from "react-native-signature-canvas";
import contactData from "../profile/contact.json";

// Assing user component
import Assign from "../../shared/Assign/Assign";
// Assing user component end

// Create pdf
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
// Create pdf end

// state
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedContract,
  setContract,
} from "../../contracts/contractSlice";
import { selectUser } from "../../firebase/firebaseSlice";
// state end

// Firebase
import { storage, addDocumentToSign } from "../../firebase/firebase";
// Firebase end

// Assign slice
import {
  addSignee,
  remvoveSignee,
  selectAssignees,
  addedStatus,
  selectAddedStatus,
} from "../../shared/Assign/AssignSlice";
// Assign slice end

const ContractToSign = ({ navigation }) => {
  useEffect(() => {
    console.log(`Profile.js - 42 - 👀`, { assignees });
  }, []);

  // state
  const user = useSelector(selectUser);
  const signedContract = useSelector(selectSignedContract);
  const dispatch = useDispatch();
  // state end

  const [modalOpen, setModalOpen] = useState(false);
  const [signature, setSign] = useState(null);
  const [signModal, setSignModal] = useState(false);

  const assignees = useSelector(selectAssignees);

  const handleSignature = (signature) => {
    // console.log(`contractToSign.js - 30 - 🥶`, signedContract);
    if (signature !== null) {
      setSign(signature);
      dispatch(setContract(signature));
      setModalOpen(false);
    }
  };

  const handleEmpty = () => {
    console.log("Empty 🦴");
    setSign(null);
    dispatch(setContract(null));
  };

  const style = `.m-signature-pad--footer
      .button {
        background-color: gray;
        color: #FFF;
      }
      .m-signature-pad {
    box-shadow: none;
  }`;

  const contentWidth = useWindowDimensions().width;

  // HTML contract
  const htmlContent = `
  <h1>This HTML snippet is now rendered with native components !</h1>
  <h2>Enjoy a webview-free and blazing fast application</h2>
  <img src="${signedContract}" />
  <em style="textAlign: center;">Look at how happy this native cat is</em>
  `;
  // HTML contract end

  // Assignees
  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.row}>
          <View style={styles.colOne}>
            <Image source={{ uri: item.image }} style={styles.pic} />
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              {/* <Text style={styles.mblTxt}>Mobile</Text> */}
              <Text style={styles.emailTxt}>{item.email}</Text>
            </View>
          </View>
          <View style={styles.msgContainer}></View>
          <TouchableOpacity
            onPress={() => removeRecipient(item.key)}
            style={styles.touch}
          >
            <MaterialIcons name="close" size={24} style={styles.mblTxt} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  // Assignees end

  // Create pdf ##########################################
  async function execute() {
    const html = `${htmlContent}`;
    // const html = `${trialContract.html}`;
    const { uri, base64 } = await Print.printToFileAsync({
      html,
      base64: true,
    });

    // upload the PDF
    const uploadPdf = async (imageUri) => {
      // Convert image path to blob react native
      const response = await fetch(imageUri);
      const blob = await response.blob();

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
    };

    uploadPdf(uri);
    // Sharing.shareAsync(uri);
  }
  // Create pdf end ##########################################

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Modal visible={modalOpen} animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {signModal === true ? (
              <View style={styles.modalContent}>
                <MaterialIcons
                  name="close"
                  size={24}
                  style={{ ...styles.modalToggle, ...styles.modalClose }}
                  onPress={() => setModalOpen(false)}
                />
                <Signature
                  onOK={handleSignature}
                  onEmpty={handleEmpty}
                  descriptionText="Sign"
                  clearText="Clear"
                  confirmText="Save"
                  webStyle={style}
                />
              </View>
            ) : (
              <View style={styles.modalContent}>
                <MaterialIcons
                  name="close"
                  size={24}
                  style={{ ...styles.modalToggle, ...styles.modalClose }}
                  onPress={() => setModalOpen(false)}
                />
                <Assign />
              </View>
            )}
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />

      <Button
        title="sign"
        onPress={() => {
          setModalOpen(true);
          setSignModal(true);
        }}
      />

      <Button
        title="Add recipient"
        onPress={() => {
          setModalOpen(true);
          setSignModal(false);
        }}
      />

      <View style={{ flex: 1, marginTop: 30 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={assignees}
          keyExtractor={(item) => {
            return item.key;
          }}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  preview: {
    // width: "100%",
    height: 150,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#00BFFF",
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },
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
    marginBottom: 10,
  },
  modalContent: {
    flex: 1,
    padding: 10,
  },
  // pdf
  container: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#00BFFF",
  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: "600",
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  tags: {
    color: "#00BFFF",
    marginTop: 10,
  },
  date: {
    color: "#696969",
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    // borderWidth: 4,
    // borderColor: "#00BFFF",
  },
  profile: {
    flexDirection: "row",
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    color: "#00BFFF",
    fontWeight: "600",
    alignSelf: "center",
    marginLeft: 10,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  // pdf end
  // assgnees
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    padding: 30,
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "#3b5998",
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 10,
  },
  // contact list
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
  },
  colOne: {
    flexDirection: "row",
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "column",
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 14,
    marginLeft: 15,
  },
  touch: {
    padding: 10,
  },
  // assgnees end
});

export default ContractToSign;
