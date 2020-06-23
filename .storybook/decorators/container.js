/**
 * Container
 */

import React from "react";
import { ThemeProvider } from 'styled-components'

import { theme } from "../../src/utils";

export const Container = story => {
  return (
    <ThemeProvider theme={theme()}>
      {story()}
    </ThemeProvider>
  )
}
