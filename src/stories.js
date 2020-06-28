import React from "react";

import ReactJSONWizard from "./index";
import schema from "./sample.json";

export default {
  title: "react-json-wizard",
};

export const main = () => {
  return <ReactJSONWizard schema={JSON.stringify(schema)} />;
};
