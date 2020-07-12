import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  box-sizing: border-box;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 120%;
  text-transform: uppercase;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 8px;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: all 100ms ease-in-out;
  min-width: 40px;
  min-height: 40px;

  :hover {
    opacity: 0.7;
  }

  :disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }

  ${({ color, theme }) =>
    color === "danger" &&
    css`
      background-color: ${theme.colors.alert.lightRed};
      color: ${theme.colors.alert.darkRed};
    `}

  ${({ size }) =>
    size === "sm" &&
    css`
      min-width: 24px;
      min-height: 24px;
      padding: 8px;
      font-size: 12px;
    `}

  ${({ outline }) =>
    outline &&
    css`
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.gray.dark};
      border: 1px solid ${({ theme }) => theme.colors.gray.dark};
    `}

  ${({ text }) =>
    text &&
    css`
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.primary.main};
      border: none;
    `}
`;

export const Button = ({ content, children, ...props }) => {
  return <StyledButton {...props}>{content || children}</StyledButton>;
};

Button.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node,
  color: PropTypes.oneOf(["primary", "danger"]),
  type: PropTypes.string,
};

Button.defaultProps = {
  content: null,
  children: null,
  color: "primary",
  type: "button",
};
