import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";

import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  decorators: [withKnobs],
};

export const main = () => {
  return (
    <Button color={select("Color", ["primary", "danger"], "primary")}>
      Button
    </Button>
  );
};
