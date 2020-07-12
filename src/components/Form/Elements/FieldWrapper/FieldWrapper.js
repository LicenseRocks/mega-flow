import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray.regular};
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  height: 40px;
  box-sizing: border-box;
  transition: all 100ms ease-in-out;

  :not(:last-child) {
    margin-right: 16px;
  }

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
  }

  &:read-only {
    border: 1px solid ${({ theme }) => theme.colors.gray.regular};
    cursor: not-allowed;
  }

  svg {
    color: ${({ theme }) => theme.colors.gray.regular};
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
      flex: 1;
    `}
`;

const FieldWrapper = ({ children, endIcon, startIcon, ...props }) => {
  return (
    <StyledWrapper {...props}>
      {startIcon && <FontAwesomeIcon icon={startIcon} />}
      {children}
      {endIcon && <FontAwesomeIcon icon={endIcon} />}
    </StyledWrapper>
  );
};

FieldWrapper.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node.isRequired,
  endIcon: PropTypes.string,
  startIcon: PropTypes.string,
};

FieldWrapper.defaultProps = {
  block: true,
  endIcon: "",
  startIcon: "",
};

export default FieldWrapper;
