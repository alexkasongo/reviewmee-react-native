import React, { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import PDFReader from "rn-pdf-reader-js";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserDocs } from "../../firebase/firebaseSlice";
// redux end

export default function Playground() {
  // get user data
  const user = useSelector(selectUser);
  const userDocs = useSelector(selectUserDocs);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(`drawerNavigator.js - 23 - 👘 Playground open`, user);
  }, [dispatch]);

  return (
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
