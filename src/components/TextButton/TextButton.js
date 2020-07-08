import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 120%;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.primary.main};
  border: none;
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: all 100ms ease-in-out;

  :hover {
    opacity: 0.7;
  }

  :disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }

  ${({ size }) =>
    size === "sm" &&
    css`
      font-size: 10px;
    `}
`;

export const TextButton = ({ content, children, ...props }) => {
  return <StyledButton {...props}>{content || children}</StyledButton>;
};

TextButton.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

TextButton.defaultProps = {
  content: null,
  children: null,
  size: "md",
};
