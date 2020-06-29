/**
 * Toggle - Components - Toggle
 */

// React
import React, { useState } from "react";
import { bool, func, oneOf } from "prop-types";

// Style
import styled from "styled-components";

// UI
import Switch from "./Switch";

const Toggle = ({ disabled, onChange, size, value: initial }) => {
  const [toggled, setToggled] = useState(initial);

  const handleToggle = () => {
    setToggled((prev) => {
      if (onChange) onChange(!prev);
      return !prev;
    });
  };

  return (
    <StyledToggle>
      <Switch
        disabled={disabled}
        handleToggle={!disabled ? handleToggle : undefined}
        size={size}
        toggled={toggled}
      />
    </StyledToggle>
  );
};

const StyledToggle = styled.div`
  display: inline-block;
  position: relative;
`;

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

export default Toggle;
