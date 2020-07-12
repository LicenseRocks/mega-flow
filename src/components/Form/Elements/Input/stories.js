import React from "react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";

import Input from "./Input";

export default {
  title: "Components/Form/Input",
  component: Input,
  decorators: [withKnobs],
};

export const main = () => {
  const defaultProps = {
    disabled: boolean("Disabled", false),
    endIcon: "box",
    name: "textInput",
    placeholder: text("Placeholder", "Placeholder"),
    startIcon: "user",
  };

  return <Input {...defaultProps} />;
};
