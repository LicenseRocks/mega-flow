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
  const handleWatcher = (data) => {
    console.log("data: ", data);
  };

  return (
    <Wrapper>
      <MegaFlow
        defaultValues={{
          feeAddress: "xiff8s7da8s79fs7f9",
        }}
        headerFadeColor="#F7F7F9"
        onFinish={(form) => console.log("form: ", form)}
        schema={schema}
        watcher={handleWatcher}
        watchList={["document", "biddingEnabled"]}
      />
    </Wrapper>
  );
};
