import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { useForm } from "react-hook-form";

import { Radio } from "./Radio";

export default {
  title: "Components/Form/Radio",
  component: Radio,
  decorators: [withKnobs],
};

export const main = () => {
  const { register } = useForm();

  const defaultProps = {
    disabled: boolean("Disabled", false),
    name: "radio",
    options: [
      { value: "first", label: "First" },
      { value: "second", label: "Second" },
      { value: "third", label: "Third" },
    ],
    register,
    stacked: boolean("Stacked", false),
  };

  return <Radio {...defaultProps} />;
};
