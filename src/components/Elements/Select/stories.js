import React from "react";
import { text, withKnobs, boolean } from "@storybook/addon-knobs";

import Select from "./Select";

export default {
  title: "Elements/Select",
  component: Select,
  decorators: [withKnobs],
};

export const main = (props = {}) => {
  const defaultProps = {
    name: "textInput",
    placeholder: text("Placeholder", "Placeholder"),
    options: [
      { value: "first", label: "First" },
      { value: "second", label: "Second" },
      { value: "Third", label: "third" },
    ],
    disabled: boolean("Disabled", false),
    ...props,
  };

  return <Select {...defaultProps} />;
};
