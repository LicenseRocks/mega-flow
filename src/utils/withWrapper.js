import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "./theme";

export default (WrappedComponent) => {
  return (props) => (
    <ThemeProvider theme={theme}>
      <WrappedComponent {...props} />
    </ThemeProvider>
  );
};
