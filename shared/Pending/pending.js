import React, { useEffect } from "react";
// import SignList from "./Lists/SignList";
// import SignedList from "./Lists/SignedList";
// import { resetDocToView } from "./ViewDocument/ViewDocumentSlice";
// import { resetDocToSign } from "./SignDocument/SignDocumentSlice";
import { Text, Button, View } from "react-native";
import { useDispatch } from "react-redux";

const Pending = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`pending.js - 14 - 🌿`);
  }, [dispatch]);

  return (
    <View>
      <Text>Sign Documents</Text>

      {/* <SignList /> */}

      <Text>Prepare Document</Text>

      <Button
        onPress={(event) => {
          navigate(`contracToSign`);
        }}
        title="Prepare Document for Signing"
        color="blue"
      />

      <Text>Review Signed Documents</Text>

      {/* <SignedList /> */}
    </View>
  );
};
export default Pending;
