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
      display: inline-block;
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
    background-image: url(${`${Check}`});
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: center;
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
  defaultValue,
  label,
  name,
  register,
  stacked,
  type,
  value,
  ...props
}) => {
  const id = `${name}-${value}`;
  const defaultChecked =
    type === "checkbox" ? defaultValue.includes(value) : defaultValue === value;

  return (
    <>
      <StyledInput
        defaultChecked={defaultChecked}
        id={id}
        name={name}
        ref={register}
        stacked={stacked}
        type={type}
        value={value}
        {...props}
      />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </>
  );
};

RadioAndCheckboxWrapper.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  stacked: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

RadioAndCheckboxWrapper.defaultProps = {
  defaultValue: "",
  stacked: true,
};

export default RadioAndCheckboxWrapper;
