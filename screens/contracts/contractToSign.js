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
  ActivityIndicator,
} from "react-native";
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
      console.log(`Profile.js - 42 - 👀`, { modalStatus });
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
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<title>Trial Contract</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
    table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;} /* Remove spacing between tables in Outlook 2007 and up */
    img{-ms-interpolation-mode: bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

    /* RESET STYLES */
    img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
    table{border-collapse: collapse !important;}
    body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* MOBILE STYLES */
    @media screen and (max-width: 525px) {

        /* ALLOWS FOR FLUID TABLES */
        .wrapper {
          width: 100% !important;
            max-width: 100% !important;
        }

        /* ADJUSTS LAYOUT OF LOGO IMAGE */
        .logo img {
          margin: 0 auto !important;
        }

        /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
        .mobile-hide {
          display: none !important;
        }

        .img-max {
          max-width: 100% !important;
          width: 100% !important;
          height: auto !important;
        }

        /* FULL-WIDTH TABLES */
        .responsive-table {
          width: 100% !important;
        }

        /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
        .padding {
          padding: 10px 5% 15px 5% !important;
        }

        .padding-meta {
          padding: 30px 5% 0px 5% !important;
          text-align: center;
        }

        .padding-copy {
             padding: 10px 5% 10px 5% !important;
          text-align: center;
        }

        .no-padding {
          padding: 0 !important;
        }

        .section-padding {
          padding: 50px 15px 50px 15px !important;
        }

        /* ADJUST BUTTONS ON MOBILE */
        .mobile-button-container {
            margin: 0 auto;
            width: 100% !important;
        }

        .mobile-button {
            padding: 15px !important;
            border: 0 !important;
            font-size: 14px !important;
            display: block !important;
        }

    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 14px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="margin: 0 !important; padding: 0 !important;">

<!-- ONE COLUMN SECTION -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td bgcolor="#ffffff" align="center" style="padding: 15px;" class="section-padding">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
            <tr>
            <td align="center" valign="top" width="500">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                    <!-- COPY -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="left" style="padding: 20px 0 0 0; font-size: 14px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Hey Aleko,</td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="padding: 20px 0 0 0; font-size: 14px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius, leo a ullamcorper feugiat, ante purus sodales justo, a faucibus libero lacus a est.</td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="padding: 20px 0 0 0; font-size: 14px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Sed varius, leo a ullamcorper feugiat, ante purus sodales justo, a faucibus libero lacus a est. Aenean at mollis ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius, leo a ullamcorper feugiat, ante purus sodales justo, a faucibus libero lacus a est.</td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="padding: 20px 0 0 0; font-size: 14px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius, leo a ullamcorper feugiat, ante purus sodales justo, a faucibus libero lacus a est. Aenean at mollis ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius, leo a ullamcorper feugiat, ante purus sodales justo, a faucibus libero lacus a est. Aenean at mollis ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius, leo a ullamcorper feugiat, ante purus sodales justo, a faucibus libero lacus a est. Aenean at mollis ipsum.</td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="padding: 20px 0 0 0; font-size: 14px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius, leo a ullamcorper feugiat, ante purus sodales justo, a faucibus libero lacus a est.</td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="padding: 20px 0 0 0; font-size: 14px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Cheers,<br><img style="width: 150px" src="${signedContract}" /></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <tr>
        <td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
            <tr>
            <td align="center" valign="top" width="500">
            <![endif]-->
            <!-- UNSUBSCRIBE COPY -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;" class="responsive-table">
                <tr>
                    <td align="left" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;">
                        1234 Main Street, Anywhere, MA 01234, USA
                        <br>
                        <a href="http://litmus.com" target="_blank" style="color: #666666; text-decoration: none;">${currentDateTime}</a>
                        <span style="font-family: Arial, sans-serif; font-size: 12px; color: #444444;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <a href="http://litmus.com" target="_blank" style="color: #666666; text-decoration: none;">View this email in your browser</a>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>

</body>
</html>`;

  const htmlContract = `
  <div class="container">
    <p class="p1">This scholarship contract is effective as of the date signed below. It represents an agreement between [Student] and [Institution]. The terms are considered binding unless an amendment is added and agreed upon by both parties.</p>
    <p class="p1"><strong>Scholarship Amount</strong></p>
    <p class="p1">The institution will provide the student with a scholarship equal to [Amount] for the current academic year. This amount will be applied equally to the fall and spring semesters. The student will receive this amount as a credit to the student&rsquo;s account at the beginning of each semester as long as the student is enrolled for a minimum of 12 credits at the institution.</p>
    <p class="p1"><strong>Academic Requirements</strong></p>
    <p class="p1">Failure on the Student&rsquo;s part to maintain a minimum of a 3.0 grade point average (GPA) for any given semester will result in being placed on probation in regards to this scholarship. While on probation, the Student will receive the scholarship funds as agreed upon. However, should the Student fail to maintain a cumulative 3.0 GPA in future semesters, the scholarship will be revoked. In this case, all funds already charged to the Student&rsquo;s account shall remain, but future payments will not be scheduled and this contract will be considered null and void.<span class="Apple-converted-space">&nbsp;</span></p>
    <p class="p1"><strong>Termination</strong></p>
    <p class="p1">This agreement shall be terminated should the Student withdraw or transfer from the Institution. The Student also has the ability to terminate this scholarship by providing written notice 14 days prior to the date of a new distribution of funds.<span class="Apple-converted-space">&nbsp;</span></p>
    <p class="p1"><strong>Compliance with Laws and Regulations</strong></p>
    <p class="p2">The Student is required to maintain compliance with all rules and regulations outlined by the Institution in the Student handbook. Failure to do so may result in the termination of the scholarship.<span class="Apple-converted-space">&nbsp;</span></p>
    <p class="p3"><br></p>
    <p class="p2">This contract is subject to all applicable local and state laws. Should one clause of the contract be determined unenforceable by a court of law, all other provisions shall remain in effect.</p>
    <p class="p3"><br></p>
    <p class="p3">Signature&nbsp;</p>
    <img class="signature" src="${signedContract}" />
    <hr>
  </div>
  `;
  // HTML contract end

  // footer & header
  const getHeader = () => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
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
          }}
        />

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
            dispatch(closeModal(true));
          }}
        />

        <View style={[styles.container, styles.horizontal]}>
          {isLoading && <ActivityIndicator />}
        </View>
      </View>
    );
  };

  const getFooter = () => {
    if (assignees.length > 0) {
      return (
        <Button
          title="Send"
          onPress={() => {
            execute();
          }}
        />
      );
    }
    return <Text>{"Add recipients to send..."}</Text>;
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
            <MaterialIcons name="close" size={24} style={styles.mblTxt} />
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
        });
    };

    uploadPdf(uri);
    // Sharing.shareAsync(uri);
  }
  // Create pdf end ##########################################

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
        showsVerticalScrollIndicator={false}
        data={assignees}
        keyExtractor={(item) => {
          return item.key;
        }}
        renderItem={renderItem}
        ListHeaderComponent={getHeader}
        ListFooterComponent={getFooter}
      />
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
