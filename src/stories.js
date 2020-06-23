import React from "react";

import ReactJSONWizard from "./index";

export default {
  title: "react-json-wizard",
};

export const main = () => {
  const schema = {
    title: "MyForm",
  };

  return <ReactJSONWizard schema={JSON.stringify(schema)} />;
};
