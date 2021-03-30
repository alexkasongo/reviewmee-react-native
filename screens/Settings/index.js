import React from "react";
import contactData from "../../mocks/contact.json";

import Settings from "./Settings";

const PlaygroundScreen = (props) => {
  return <Settings {...contactData} {...props} />;
};

export default PlaygroundScreen;
