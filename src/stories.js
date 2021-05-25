import { Button, OutlineButton } from "@licenserocks/kit";
import React from "react";
import styled from "styled-components";

import MegaFlow from "./index";
import schema from "./sample.json";

export default {
  title: "MegaFlow",
};

const Wrapper = styled.div`
  width: 680px;
  margin: auto;
  padding: 16px 0;
`;

export const main = () => {
  const handleWatch = (data) => {
    console.log("data: ", data);
  };

  return (
    <Wrapper>
      <MegaFlow
        // defaultValues={{}}
        onFinish={(output) => {
          console.log("output: ", output);
        }}
        renderActionButtons={(wizardData) => (
          <>
            <Button
              content="Save as Draft"
              color="subtle"
              dInline
              mr={4}
              onClick={() => console.log("wizardData: ", wizardData)}
            />

            <OutlineButton
              content="Schedule"
              dInline
              mr={4}
              onClick={() => console.log("wizardData: ", wizardData)}
            />
          </>
        )}
        schema={schema}
        watcher={handleWatch}
      />
    </Wrapper>
  );
};
