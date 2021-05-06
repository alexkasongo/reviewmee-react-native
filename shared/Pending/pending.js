import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SignList from "./Lists/SignList";
import SignedList from "./Lists/SignedList";
// import { resetDocToView } from "./ViewDocument/ViewDocumentSlice";
import { resetDocToSign } from "./SignDocument/SignDocumentSlice";
import { Text, Button, View } from "react-native";
import "gestalt/dist/gestalt.css";

const Pending = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`pending.js - 14 - 🌿`);
  }, [dispatch]);

  return (
    <div>
      <View>
        <Text>Sign Documents</Text>

        {/* <SignList /> */}

        <Text>Prepare Document</Text>

        <Button
          onClick={(event) => {
            navigate(`/assignUsers`);
          }}
          text="Prepare Document for Signing"
          color="blue"
          inline
        />

        <Text>Review Signed Documents</Text>

        {/* <SignedList /> */}
      </View>
    </div>
  );
};
export default Pending;
