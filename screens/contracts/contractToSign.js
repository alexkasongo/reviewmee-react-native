import React from "react";
import { View, Text } from "react-native";

const ContractToSign = (props) => {
  console.log(`contractToSign.js - 5 - variable`, props);
  const contract = props.route.params.category;

  return (
    <View>
      <Text>Title: {contract.name}</Text>
      <Text>Title: {contract.photo_url}</Text>
    </View>
  );
};

export default ContractToSign;
