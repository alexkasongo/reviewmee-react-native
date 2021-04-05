import React from "react";
import { View, Text } from "react-native";

const SettingsOptions = (props) => {
  // get params from props
  const params = props.route.params;

  return (
    <View {...props}>
      <Text>Name: {params.name}</Text>
      <Text>Age: {params.age}</Text>
      <Text>Wife: {params.wife}</Text>
    </View>
  );
};

export default SettingsOptions;
