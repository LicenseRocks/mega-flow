import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import FieldWrapper from "../FieldWrapper/FieldWrapper";

const StyledInput = styled.input`
  flex: 1;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  padding: 8px;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  border: none;
  height: 100%;
  box-sizing: border-box;
  transition: all 100ms ease-in-out;

  ::placeholder {
    font-weight: normal;
  }

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `}
`;

const Input = ({ block, disabled, ...props }) => {
  return (
    <FieldWrapper disabled={disabled}>
      <StyledInput block={block} {...props} />
    </FieldWrapper>
  );
};

Input.propTypes = {
  block: PropTypes.bool,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  block: true,
  disabled: false,
};

export default Input;
