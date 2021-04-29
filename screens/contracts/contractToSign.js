import React, { useState } from "react";
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
} from "react-native";
import HTML from "react-native-render-html";
import { MaterialIcons } from "@expo/vector-icons";
import Signature from "react-native-signature-canvas";
import contactData from "../profile/contact.json";

// state
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedContract,
  setContract,
} from "../../contracts/contractSlice";

// state end

// HTML contract
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
// HTML contract end

const ContractToSign = ({ navigation }) => {
  // state
  const signedContract = useSelector(selectSignedContract);
  const dispatch = useDispatch();
  // state end

  const [modalOpen, setModalOpen] = useState(false);
  const [signature, setSign] = useState(null);

  const handleSignature = (signature) => {
    // console.log(`contractToSign.js - 30 - 🥶`, signature);
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

  return (
    // <ScrollView>
    //   <View style={styles.container}>
    //     <View>
    //       <Modal visible={modalOpen} animationType="slide">
    //         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //           <View style={styles.modalContent}>
    //             <MaterialIcons
    //               name="close"
    //               size={24}
    //               style={{ ...styles.modalToggle, ...styles.modalClose }}
    //               onPress={() => setModalOpen(false)}
    //             />
    //             <Signature
    //               onOK={handleSignature}
    //               onEmpty={handleEmpty}
    //               descriptionText="Sign"
    //               clearText="Clear"
    //               confirmText="Save"
    //               webStyle={style}
    //             />
    //           </View>
    //         </TouchableWithoutFeedback>
    //       </Modal>
    //     </View>

    //     <View style={styles.header}>
    //       <Text style={styles.headerTitle}>Contract Name</Text>
    //     </View>

    //     <View style={styles.postContent}>
    //       <Text style={styles.postTitle}>
    //         Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    //       </Text>

    //       <Text style={styles.postDescription}>
    //         Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
    //         commodo ligula eget dolor. Aenean massa. Cum sociis natoque
    //         penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    //         Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
    //         Nulla consequat massa quis enim.
    //       </Text>

    //       {/* <Text style={styles.tags}>
    //         Lorem, ipsum, dolor, sit, amet, consectetuer, adipiscing, elit.
    //       </Text> */}

    //       {/* signature preview */}
    //       <TouchableOpacity onPress={() => setModalOpen(true)}>
    //         <View style={styles.preview}>
    //           {signature ? (
    //             <Image
    //               resizeMode={"contain"}
    //               style={{ width: "100%", height: "100%" }}
    //               source={{ uri: signedContract }}
    //             />
    //           ) : null}
    //         </View>
    //       </TouchableOpacity>
    //       {/* signature preview end */}

    //       <Text style={styles.date}>2017-11-27 13:03:01</Text>

    //       <View style={styles.profile}>
    //         <Image
    //           style={styles.avatar}
    //           source={{
    //             uri: contactData.avatar,
    //           }}
    //         />

    //         <Text style={styles.name}>{contactData.name}</Text>
    //       </View>
    //       <TouchableOpacity style={styles.shareButton}>
    //         <Text style={styles.shareButtonText}>Send</Text>
    //       </TouchableOpacity>

    //       {/* <Button title="sign" onPress={() => setModalOpen(true)} /> */}
    //     </View>
    //   </View>
    // </ScrollView>

    <ScrollView style={{ flex: 1 }}>
      <View>
        <Modal visible={modalOpen} animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />

      {/* signature preview */}
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <View style={styles.preview}>
          {signature ? (
            <Image
              resizeMode={"contain"}
              style={{ width: "100%", height: "100%" }}
              source={{ uri: signedContract }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
      {/* signature preview end */}

      <Button title="sign" onPress={() => setModalOpen(true)} />
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
});

export default ContractToSign;
