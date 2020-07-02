import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 120%;
  text-transform: uppercase;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 8px 16px;
  color: #fff;
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
`;

const PrimaryButton = ({ content, children, ...props }) => {
  return <StyledButton {...props}>{content || children}</StyledButton>;
};

PrimaryButton.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node,
};

PrimaryButton.defaultProps = {
  content: null,
  children: null,
};

export default PrimaryButton;
