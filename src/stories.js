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
        schema={schema}
        watcher={handleWatch}
      />
    </Wrapper>
  );
};
