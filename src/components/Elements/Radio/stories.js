import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import Radio from "./Radio";

export default {
  title: "Elements/Radio",
  component: Radio,
  decorators: [withKnobs],
};

export const main = (props = {}) => {
  const defaultProps = {
    name: "radio",
    disabled: boolean("Disabled", false),
    options: [
      { value: "first", label: "First" },
      { value: "second", label: "Second" },
      { value: "third", label: "Third" },
    ],
    stacked: boolean("Stacked", false),
    ...props,
  };

  return <Radio {...defaultProps} />;
};
