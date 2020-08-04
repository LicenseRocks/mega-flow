import React from "react";

import MegaFlow from "./index";
import schema from "./sample.json";

export default {
  title: "MegaFlow",
};

export const main = () => {
  return (
    <MegaFlow
      onFinish={() => alert("Thanks for using MegaFlow.")}
      schema={schema}
    />
  );
};
