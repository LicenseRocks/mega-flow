import React from "react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";

import Input from "./Input";

export default {
  title: "Elements/Input",
  component: Input,
  decorators: [withKnobs],
};

export const main = () => {
  const defaultProps = {
    name: "textInput",
    placeholder: text("Placeholder", "Placeholder"),
    disabled: boolean("Disabled", false),
  };

  return <Input {...defaultProps} />;
};
