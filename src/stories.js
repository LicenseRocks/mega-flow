import React from "react";

import ReactJSONWizard from "./index";
import schema from "./sample.json";

export default {
  title: "react-json-wizard",
};

export const main = () => {
  return (
    <ReactJSONWizard
      onFinish={() => alert("Thanks for using MegaFlow.")}
      schema={JSON.stringify(schema)}
    />
  );
};
