import React from "react";

import contactData from "../../mocks/contact.json";

import Viewer from "./Viewer";

const ViewerScreen = (props) => {
  return <Viewer {...contactData} {...props} />;
};

export default ViewerScreen;
