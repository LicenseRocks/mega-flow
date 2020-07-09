import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import FieldWrapper from "../FieldWrapper/FieldWrapper";

const StyledSelect = styled.select`
  flex: 1;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  padding: 0 8px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  outline: none;
  border: none;
  height: 100%;
  box-sizing: border-box;
  transition: all 100ms ease-in-out;

  ${({ hasError }) =>
    hasError &&
    css`
      ::placeholder {
        color: ${({ theme }) => theme.colors.alert.darkRed};
      }
      color: ${({ theme }) => theme.colors.alert.darkRed};
    `}

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `}
`;

const renderOptions = (options) =>
  options.map((opt) => (
    <option key={opt.value} value={opt.value}>
      {opt.label}
    </option>
  ));

const Select = ({
  block,
  children,
  disabled,
  hasError,
  options,
  register,
  ...props
}) => {
  return (
    <FieldWrapper disabled={disabled} hasError={hasError}>
      <StyledSelect block={block} hasError={hasError} ref={register} {...props}>
        {renderOptions(options) || children}
      </StyledSelect>
    </FieldWrapper>
  );
};

Select.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  hasError: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  register: PropTypes.func.isRequired,
};

Select.defaultProps = {
  block: true,
  children: null,
  disabled: false,
  hasError: false,
};

export default Select;
