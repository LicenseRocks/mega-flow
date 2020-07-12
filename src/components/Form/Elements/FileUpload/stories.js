import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { useForm } from "react-hook-form";

import { FileUpload } from ".";

export default {
  title: "Components/Form/FileUpload",
  component: FileUpload,
  decorators: [withKnobs],
};

export const main = () => {
  const { control } = useForm();
  const defaultProps = {
    control,
    disabled: boolean("Disabled", false),
    name: "fileUpload",
  };

  return <FileUpload {...defaultProps} />;
};
