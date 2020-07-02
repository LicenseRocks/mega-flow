import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import { Checkbox } from "./Checkbox";

export default {
  title: "Elements/Checkbox",
  component: Checkbox,
  decorators: [withKnobs],
};

export const main = (props = {}) => {
  const defaultProps = {
    checked: boolean("Checked", false),
    disabled: boolean("Disabled", false),
    name: "checkbox",
    options: [
      { value: "first", label: "First" },
      { value: "second", label: "Second" },
      { value: "third", label: "Third" },
    ],
    stacked: boolean("Stacked", false),
    ...props,
  };

  return <Checkbox {...defaultProps} />;
};
