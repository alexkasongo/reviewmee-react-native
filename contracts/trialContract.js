import React from "react";
import ReactDOMServer from "react-dom/server";

export default function trialContract() {
  return ReactDOMServer.renderToStaticMarkup(
    <h1 className="bg-secondary text-white text-center p-2">
      Hello World and Aleko!
    </h1>
  );
}
