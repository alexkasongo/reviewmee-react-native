import React from "react";
import { View, Text } from "react-native";

const SettingsOptions = (props) => {
  // get params from props_
  const params = props.route.params;

  return (
    <View {...props} style={{ flex: 1, padding: 10 }}>
      <Text>{params.name}</Text>
      <Text>{params.age}</Text>
      <Text>{params.wife}</Text>
    </View>
  );
};

export default SettingsOptions;
