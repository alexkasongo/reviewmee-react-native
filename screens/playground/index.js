import React from "react";

import contactData from "../../mocks/contact.json";

import Playground from "./Playground";

const PlaygroundScreen = (props) => {
  return <Playground {...contactData} {...props} />;
};

export default PlaygroundScreen;
