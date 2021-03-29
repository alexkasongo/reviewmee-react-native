import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native";

import contactData from "../../mocks/contact.json";

import { Nav } from "../../components";
import Playground from "./Playground";

const PlaygroundScreen = (props) => {
  props.navigation.setOptions({
    header: ({ navigation }) => (
      <SafeAreaView>
        <Nav
          title="Playground"
          navigation={navigation}
          leftIcon={{
            type: "ionicon",
            name: "md-list",
            size: 26,
          }}
        />
      </SafeAreaView>
    ),
  });

  return <Playground {...contactData} {...props} />;
};

PlaygroundScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PlaygroundScreen;
