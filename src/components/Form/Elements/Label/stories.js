import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";

import { Label } from ".";

export default {
  title: "Elements/Label",
  component: Label,
  decorators: [withKnobs],
};

export const main = () => {
  const defaultProps = {
    children: text("Label", "Label"),
  };

  return <Label {...defaultProps} />;
};
