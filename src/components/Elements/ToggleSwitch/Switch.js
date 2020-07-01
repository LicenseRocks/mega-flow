/**
 * Toggle - Components - Switch
 */

// React
import React from "react";
import { bool, func, oneOf } from "prop-types";

// Style
import styled, { css } from "styled-components";

const Switch = ({ disabled, handleToggle, size, toggled }) => {
  return (
    <StyledSwitchContainer
      disabled={disabled}
      onClick={handleToggle}
      size={size}
      toggled={toggled}
    >
      <StyledSwitch size={size} toggled={toggled}>
        {toggled ? "Yes" : "No"}
      </StyledSwitch>
    </StyledSwitchContainer>
  );
};

const StyledSwitchContainer = styled.div`
  align-items: center;
  background-color: ${({ theme, toggled }) =>
    toggled ? theme.colors.primary.main : theme.colors.gray.regular};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  position: relative;
  transition: background-color 0.2s;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    `}

  ${({ size }) =>
    size === "sm" &&
    css`
      border-radius: 40px;
      height: 20px;
      width: 40px;
    `}

  ${({ size }) =>
    size === "md" &&
    css`
      border-radius: 35px;
      height: 32px;
      width: 56px;
    `}

  ${({ size }) =>
    size === "lg" &&
    css`
      border-radius: 100px;
      height: 50px;
      width: 100px;
    `}
`;

const StyledSwitch = styled.span`
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  left: 2px;
  position: absolute;
  top: 2px;
  transition: left 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.gray.medium};
  text-transform: uppercase;
  user-select: none;

  ${({ theme, toggled }) =>
    toggled &&
    css`
      left: calc(100% - 2px);
      transform: translateX(-100%);
      color: ${theme.colors.primary.main};
    `};

  ${({ size }) =>
    size === "sm" &&
    css`
      border-radius: 16px;
      height: 16px;
      width: 16px;
    `}

  ${({ size }) =>
    size === "md" &&
    css`
      border-radius: 37px;
      height: 28px;
      width: 28px;
    `}

  ${({ size }) =>
    size === "lg" &&
    css`
      border-radius: 46px;
      height: 46px;
      width: 46px;
    `}
`;

Switch.propTypes = {
  disabled: bool,
  handleToggle: func,
  size: oneOf(["sm", "md", "lg"]),
  toggled: bool,
};

Switch.defaultProps = {
  disabled: false,
  handleToggle: null,
  size: "md",
  toggled: false,
};

export default Switch;
