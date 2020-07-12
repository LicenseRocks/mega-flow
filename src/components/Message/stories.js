import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";

import { Message } from "./Message";

export default {
  title: "Components/Message",
  component: Message,
  decorators: [withKnobs],
};

export const main = () => {
  return (
    <Message
      color={select("Color", ["info", "danger", "warning"], "info")}
      content="Message content"
    />
  );
};
