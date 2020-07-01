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

const Select = ({ block, children, disabled, options, ...props }) => {
  return (
    <FieldWrapper disabled={disabled}>
      <StyledSelect block={block} {...props}>
        {renderOptions(options) || children}
      </StyledSelect>
    </FieldWrapper>
  );
};

Select.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
};

Select.defaultProps = {
  block: true,
  children: null,
  disabled: false,
};

export default Select;
