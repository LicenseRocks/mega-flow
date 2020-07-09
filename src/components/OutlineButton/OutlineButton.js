import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  height: 40px;
  min-width: 40px;
  box-sizing: border-box;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 120%;
  text-transform: uppercase;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  color: ${({ theme }) => theme.colors.gray.dark};
  border: 1px solid ${({ theme }) => theme.colors.gray.dark};
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
`;

export const OutlineButton = ({ content, children, ...props }) => {
  return <StyledButton {...props}>{content || children}</StyledButton>;
};

OutlineButton.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node,
};

OutlineButton.defaultProps = {
  content: null,
  children: null,
};
