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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Signature from "react-native-signature-canvas";

// state
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedContract,
  setContract,
} from "../../contracts/contractSlice";

// state end

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
  return (
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

      {/* <MaterialIcons
        name="add"
        size={24}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
      /> */}

      <View style={styles.preview}>
        {signature ? (
          <Image
            resizeMode={"contain"}
            style={{ width: "100%", height: "100%" }}
            source={{ uri: signedContract }}
          />
        ) : null}
      </View>

      <Button title="sign" onPress={() => setModalOpen(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: "50%",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
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
});

export default ContractToSign;
