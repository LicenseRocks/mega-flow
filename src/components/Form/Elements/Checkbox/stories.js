import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { useForm } from "react-hook-form";

import { Checkbox } from "./Checkbox";

export default {
  title: "Components/Form/Checkbox",
  component: Checkbox,
  decorators: [withKnobs],
};

export const main = () => {
  const { register, watch } = useForm();

  const defaultProps = {
    disabled: boolean("Disabled", false),
    name: "checkbox",
    options: [
      { value: "first", label: "First" },
      { value: "second", label: "Second" },
      { value: "third", label: "Third" },
    ],
    register,
    stacked: boolean("Stacked", false),
  };

  const values = watch();
  console.log("values: ", values);

  return <Checkbox {...defaultProps} />;
};
