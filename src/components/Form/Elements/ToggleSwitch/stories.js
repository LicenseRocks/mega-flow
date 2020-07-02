/**
 * Toggle - Stories
 */

// React
import React from "react";

// Storybook
import { action } from "@storybook/addon-actions";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";

// UI
import { ToggleSwitch } from ".";

export default {
  title: "Elements/ToggleSwitch",
  component: ToggleSwitch,
  decorators: [withKnobs],
};

export const main = () => (
  <ToggleSwitch
    disabled={boolean("Disabled", false)}
    onChange={action("toggled")}
    size={select("Size", ["sm", "md", "lg"], "md")}
  />
);
