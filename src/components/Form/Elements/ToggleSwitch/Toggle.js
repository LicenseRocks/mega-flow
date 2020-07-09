import React from "react";
import { bool, func, oneOf } from "prop-types";
import styled from "styled-components";

import Switch from "./Switch";

const StyledToggle = styled.div`
  display: inline-block;
  position: relative;
`;

export const Toggle = ({ disabled, onChange, size, value, ...props }) => {
  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <StyledToggle>
      <Switch
        disabled={disabled}
        handleToggle={!disabled ? handleToggle : undefined}
        size={size}
        toggled={value}
        {...props}
      />
    </StyledToggle>
  );
};

Toggle.propTypes = {
  disabled: bool,
  onChange: func,
  size: oneOf(["sm", "md", "lg"]),
  value: bool,
};

Toggle.defaultProps = {
  disabled: false,
  onChange: null,
  size: "md",
  value: false,
};
