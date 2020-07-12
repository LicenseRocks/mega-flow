import React from "react";
import { text, withKnobs, boolean, select } from "@storybook/addon-knobs";

import Stepper from "./Stepper";

export default {
  title: "Components/Form/Stepper",
  component: Stepper,
  decorators: [withKnobs],
};

export const main = (props = {}) => {
  const defaultProps = {
    name: "textInput",
    disabled: boolean("Disabled", false),
    label: text("Label", "Days"),
    size: select(
      "Size",
      {
        Normal: "normal",
        Small: "sm",
      },
      "normal"
    ),
    ...props,
  };

  return <Stepper {...defaultProps} />;
};
