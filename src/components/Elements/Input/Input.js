import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const StyledInput = styled.input`
  font-style: normal;
  font-size: 14px;
  line-height: 120%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray.regular};
  padding: 8px;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  height: 40px;
  box-sizing: border-box;
  transition: all 100ms ease-in-out;

  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
    pointer-events: none;
  }

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `}
`;

const PrimaryButton = ({ block, ...props }) => {
  return <StyledInput block={block} {...props} />;
};

PrimaryButton.propTypes = {
  block: PropTypes.bool,
};

PrimaryButton.defaultProps = {
  block: true,
};

export default PrimaryButton;
