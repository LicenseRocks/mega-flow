import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray.regular};
  padding: 0 8px;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  height: 40px;
  box-sizing: border-box;
  transition: all 100ms ease-in-out;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    `}

  ${({ hasError }) =>
    hasError &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.alert.darkRed};
    `}

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `}
`;

const FieldWrapper = ({ children, endIcon, startIcon, ...props }) => {
  return (
    <StyledWrapper {...props}>
      <div>{startIcon}</div>
      {children}
      <div>{endIcon}</div>
    </StyledWrapper>
  );
};

FieldWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  endIcon: PropTypes.node,
  startIcon: PropTypes.node,
};

FieldWrapper.defaultProps = {
  endIcon: null,
  startIcon: null,
};

export default FieldWrapper;
