import React, { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import PDFReader from "rn-pdf-reader-js";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserDocs } from "../../firebase/firebaseSlice";
import { selectCurrentPdf } from "../pdfReader/pdfReaderSlice";
// redux end

export default function Playground() {
  // get user data
  const user = useSelector(selectUser);
  const userDocs = useSelector(selectUserDocs);
  const currentPdf = useSelector(selectCurrentPdf);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(`drawerNavigator.js - 23 - 👘 Playground open`, currentPdf);
  }, [dispatch, currentPdf]);

  return (
    <PDFReader
      source={{
        uri: `${currentPdf}`,
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
