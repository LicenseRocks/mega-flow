import React from "react";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { useForm } from "react-hook-form";

import { ToggleSwitch } from ".";

export default {
  title: "Components/Form/ToggleSwitch",
  component: ToggleSwitch,
  decorators: [withKnobs],
};

export const main = () => {
  const { control, watch } = useForm();

  const defaultProps = {
    control,
    disabled: boolean("Disabled", false),
    name: "toggle",
    size: select("Size", ["sm", "md", "lg"], "md"),
  };

  const values = watch();
  console.log("values: ", values);

  return <ToggleSwitch {...defaultProps} />;
};
