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
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as Haptics from "expo-haptics";
import HTML from "react-native-render-html";
import { MaterialIcons } from "@expo/vector-icons";
import Signature from "react-native-signature-canvas";

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
import {
  selectUser,
  setLoading,
  selectLoading,
  setUnsignedUserDocs,
  setSignedUserDocs,
} from "../../firebase/firebaseSlice";
// state end

// Firebase
import {
  storage,
  addDocumentToSign,
  searchForDocumentToSign,
  searchForDocumentsSigned,
} from "../../firebase/firebase";
// Firebase end

// Assign slice
import {
  addSignee,
  remvoveSignee,
  selectAssignees,
  closeModal,
  selectModalStatus,
} from "../../shared/Assign/AssignSlice";
// Assign slice end

const ContractToSign = ({ navigation }) => {
  // state
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);
  const signedContract = useSelector(selectSignedContract);
  const dispatch = useDispatch();
  // state end

  const [modalOpen, setModalOpen] = useState(false);
  const [signature, setSign] = useState(null);
  const [signModal, setSignModal] = useState(false);

  const assignees = useSelector(selectAssignees);
  const modalStatus = useSelector(selectModalStatus);

  // trigger useEffect only when modalStatus state changes to false
  useEffect(() => {
    if (modalStatus === false) {
      // console.log(`Profile.js - 42 - 👀`, { signedContract });
      setModalOpen(modalStatus);
    }
  }, [modalStatus]);

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

  // remove recipient
  const removeRecipient = (key) => {
    const items = assignees;
    const valueToRemove = `${key}`;
    const filteredItems = items.filter((item) => {
      return item.key !== valueToRemove;
    });
    // console.log(`Assign.js - 69 - 🌿`, filteredItems);
    dispatch(remvoveSignee(filteredItems));
  };
  // remove recipient end

  const style = `.m-signature-pad--footer
      .button {
        background-color: gray;
        color: #FFF;
      }
      .m-signature-pad {
    box-shadow: none;
  }`;

  const contentWidth = useWindowDimensions().width;
  const currentDateTime = new Date();

  // HTML contract
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Consent Contract</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        /* CLIENT-SPECIFIC STYLES */
        body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
        
        /* RESET STYLES */
        img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
        body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}
      
      .container {
        max-width: 500px;
        margin: auto;
        height: 792px;
      }
      .signature {
        width: 100px
      }
      .copy {
        padding: 20px 0 0 0; font-size: 14px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;
      }
      .copyTitle {
        padding: 0 0 0 0; font-size: 18px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;
      }
      .dateTimeCopy {
        font-size: 14px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;
      }
      @media print {
        .other-pages{
          page-break-before: always;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 792px;
      }
    </style>
    </head>
    <body>

      <div class="container">
        <div class="content">
          <div class="top">
            <section>
              <h1 class="copyTitle">Sexual Consent Contract</h1>
            </section>

            <section>
              <p class="copy">I, <span class="copyBold">${user.displayName} (${user.email})</span>, hereby declare under penalty of perjury that I am over 18 years old.<span class="Apple-converted-space">&nbsp;</span></p>
              <p class="copy">I further declare that this agreement is of my own free will and that neither I nor anyone near or dear to me has been threatened with harm or embarrassment.<span class="Apple-converted-space">&nbsp;</span></p>
              <p class="copy">Both parties agree that this is a private agreement not to be disclosed to third parties except in case of accusation of sexual misconduct by the agreeing party. If he/she shows or makes public this agreement without accusation of sexual misconduct, it is agreed that he/she will be liable for damages for invasion of privacy.<span class="Apple-converted-space">&nbsp;</span></p>
              <p class="copy">By signing I agree to engage in all or some of the following consensual acts.<span class="Apple-converted-space">&nbsp;</span></p>
              <ul class="ul1">
                  <li class="copy">Sexual fondling and kissing<span class="Apple-converted-space">&nbsp;</span></li>
                  <li class="copy">Oral copulation (mutual)<span class="Apple-converted-space">&nbsp;</span></li>
                  <li class="copy">Oral copulation (unilateral)<span class="Apple-converted-space">&nbsp;</span></li>
                  <li class="copy">Sexual intercourse with an FDA approved condom at all times<span class="Apple-converted-space">&nbsp;</span></li>
              </ul>
              <p class="copy">I further declare that I am at this time not under the influence of alcohol, drugs or medication and agree to engage in consensual sex with: <span class="s2"><br></span></p>
            </section>
          </div>
          <footer></footer> 
        </div>
      </div>
      <div class="container">
        <div class="content">
          <div class="top">
            <section>
              <p class="copy">At this time I do not intend to change my mind before the sex act or acts are over. However, if I do, it is further understood that when I say the words &ldquo;CODE RED&rdquo; my partner agrees to STOP INSTANTLY! <span class="s2"><br></span></p>
            </section>
          </div>

          <footer>
            <p class="copy">Signed:</p>
            <img class="signature" src="${signedContract}" alt="">
            <hr/>
            <p class="copy">Date: ${currentDateTime}</p>
          </footer> 
        </div>
      </div>
    </body>
    </html>
  `;

  let signatureImg = ``;

  if (signedContract !== null) {
    // console.log(`contractToSign.js - 267 - 🔥 not null`);
    signatureImg = `<img class="signature" src="${signedContract}" />`;
  } else {
    // console.log(`contractToSign.js - 269 - 😳 null`);
    signatureImg = ``;
  }

  const htmlContract = `
    <div class="container">
      <section>
        <h1 class="copyTitle">Sexual Consent Contract</h1>
      </section>

      <section>
        <p class="copy">I, <span class="copyBold">${user.displayName} (${user.email})</span>, hereby declare under penalty of perjury that I am over 18 years old.<span class="Apple-converted-space">&nbsp;</span></p>
        <p class="copy">I further declare that this agreement is of my own free will and that neither I nor anyone near or dear to me has been threatened with harm or embarrassment.<span class="Apple-converted-space">&nbsp;</span></p>
        <p class="copy">Both parties agree that this is a private agreement not to be disclosed to third parties except in case of accusation of sexual misconduct by the agreeing party. If he/she shows or makes public this agreement without accusation of sexual misconduct, it is agreed that he/she will be liable for damages for invasion of privacy.<span class="Apple-converted-space">&nbsp;</span></p>
        <p class="copy">By signing I agree to engage in all or some of the following consensual acts.<span class="Apple-converted-space">&nbsp;</span></p>
        <ul class="ul1">
            <li class="copy">Sexual fondling and kissing<span class="Apple-converted-space">&nbsp;</span></li>
            <li class="copy">Oral copulation (mutual)<span class="Apple-converted-space">&nbsp;</span></li>
            <li class="copy">Oral copulation (unilateral)<span class="Apple-converted-space">&nbsp;</span></li>
            <li class="copy">Sexual intercourse with an FDA approved condom at all times<span class="Apple-converted-space">&nbsp;</span></li>
        </ul>
        <p class="copy">I further declare that I am at this time not under the influence of alcohol, drugs or medication and agree to engage in consensual sex with: <span class="s2"><br></span></p>
        <p class="copy">At this time I do not intend to change my mind before the sex act or acts are over. However, if I do, it is further understood that when I say the words &ldquo;CODE RED&rdquo; my partner agrees to STOP INSTANTLY! <span class="s2"><br></span></p>
      </section>

      <footer>
        <p class="copy">Signed:</p>
        ${signatureImg}
        <hr/>
        <p class="copy">Date: ${currentDateTime}</p>
      </footer> 
    </div>
  `;
  // HTML contract end

  // footer & header
  const getHeader = () => {
    return (
      <View>
        <HTML
          source={{ html: htmlContract }}
          contentWidth={contentWidth}
          tagsStyles={{
            i: { textAlign: "center", fontStyle: "italic", color: "grey" },
          }}
          classesStyles={{
            container: {
              padding: 10,
            },
            "last-paragraph": {
              textAlign: "right",
              color: "teal",
              fontWeight: "800",
            },
            signature: {
              width: 200,
            },
            copyTitle: {
              fontSize: 22,
              color: "#666666",
            },
            copy: {
              fontSize: 16,
              lineHeight: 25,
              color: "#666666",
            },
            copyBold: {
              fontSize: 16,
              lineHeight: 25,
              color: "#666666",
              fontWeight: "bold",
            },
          }}
        />
      </View>
    );
  };
  // footer & header end

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
            <MaterialIcons name="close" size={24} style={styles.closeBtn} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  // Assignees end

  // Create pdf ##########################################
  async function execute() {
    dispatch(setLoading(true));
    const html = `${htmlContent}`;
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
            user.displayName,
            user.email,
            "consentContract",
            pdfUrl,
            user.photoURL,
            assignees
          );
        })
        .then(() => {
          dispatch(setLoading(false));
          searchForDocumentToSign(user.email).then((res) => {
            dispatch(setUnsignedUserDocs(res));
          });
          searchForDocumentsSigned(user.email).then((res) => {
            dispatch(setSignedUserDocs(res));
          });
        })
        .then(() => {
          navigation.navigate("CategoriesScreen");
        });
    };

    uploadPdf(uri);
    // Sharing.shareAsync(uri);
  }
  // Create pdf end ##########################################
  // Share pdf ##########################################
  async function share() {
    dispatch(setLoading(true));
    const html = `${htmlContent}`;
    const { uri, base64 } = await Print.printToFileAsync({
      html,
      base64: true,
    });
    dispatch(setLoading(false));
    Sharing.shareAsync(uri);
  }
  // Share pdf end ##########################################

  return (
    <View style={styles.modalContent}>
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
      <FlatList
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          marginBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
        data={assignees}
        keyExtractor={(item) => {
          return item.key;
        }}
        renderItem={renderItem}
        ListHeaderComponent={getHeader}
        // ListFooterComponent={getFooter}
      />
      <View style={styles.signatureTools}>
        {signature !== null ? (
          <MaterialIcons
            name="create"
            size={34}
            style={styles.mblTxt}
            onPress={() => {
              setModalOpen(true);
              setSignModal(true);
            }}
          />
        ) : (
          <MaterialIcons
            name="create"
            size={34}
            style={styles.mblTxt}
            onPress={() => {
              setModalOpen(true);
              setSignModal(true);
            }}
          />
        )}
        <MaterialIcons
          name="person-add"
          size={34}
          style={styles.mblTxt}
          onPress={() => {
            setModalOpen(true);
            setSignModal(false);
            dispatch(closeModal(true));
          }}
        />

        {/* <View style={[styles.container, styles.horizontal]}>
          {isLoading && <ActivityIndicator />}
        </View> */}
        {assignees.length > 0 && (
          <MaterialIcons
            name="send"
            size={34}
            style={styles.mblTxt}
            onPress={() => {
              execute();
            }}
          />
        )}
        {/* {assignees.length > 0 && signature !== null && (
          <MaterialIcons
            name="share"
            size={34}
            style={styles.mblTxt}
            onPress={() => {
              share();
            }}
          />
        )} */}
      </View>
    </View>
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: "white",
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
  signatureTools: {
    backgroundColor: "#3b5998",
    borderRadius: 20,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
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
    color: "#fff",
  },
  closeBtn: {
    fontWeight: "200",
    color: "#666666",
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
