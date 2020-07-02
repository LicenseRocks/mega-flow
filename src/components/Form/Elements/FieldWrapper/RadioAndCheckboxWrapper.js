import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Check from "../../../../assets/icons/check.svg";

const StyledInput = styled.input`
  display: none;

  + label {
    display: inline-flex;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    margin: 0 32px 0 0;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    ${({ stacked }) =>
      stacked &&
      css`
        display: flex;
        margin: 0 0 24px 0;
      `}

    &::before {
      content: "";
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: ${({ type }) => (type === "radio" ? "50%" : "8px")};
      background-color: ${({ theme }) => theme.colors.white};
      border: 1px solid ${({ theme }) => theme.colors.gray.regular};
      margin-right: 8px;
      transition: all 0.1s ease-in-out;
    }

    &:hover {
      &::before {
        background-color: ${({ theme }) => theme.colors.primary.main};
        border-color: ${({ theme }) => theme.colors.primary.main};
      }
    }
  }

  &:checked + label::before {
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-color: ${({ theme }) => theme.colors.primary.main};
    content: url(${`${Check}`});
  }

  &:disabled + label {
    opacity: 0.3;

    &,
    span {
      cursor: default;
    }
  }
`;

const StyledLabel = styled.label``;

const RadioAndCheckboxWrapper = ({
  checked,
  label,
  name,
  onChange,
  stacked,
  type,
  value,
  ...props
}) => {
  return (
    <>
      <StyledInput
        checked={checked}
        name={name}
        onChange={onChange}
        stacked={stacked}
        type={type}
        value={value}
        {...props}
      />
      <StyledLabel for={name}>{label}</StyledLabel>
    </>
  );
};

RadioAndCheckboxWrapper.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  stacked: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

RadioAndCheckboxWrapper.defaultProps = {
  stacked: true,
};

export default RadioAndCheckboxWrapper;
