import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledMessage = styled.div`
  width: 100%;
  box-sizing: border-box;
  min-height: 40px;
  padding: 8px;
  font-size: 14px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray.semiLight};
  color: ${({ theme }) => theme.colors.black};
  transition: all 100ms ease-in-out;
  display: flex;
  align-items: center;

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    margin-right: 8px;
    font-size: 16px;
  }

  ${({ color, theme }) =>
    color === "danger" &&
    css`
      background-color: ${theme.colors.alert.lightRed};
      color: ${theme.colors.alert.darkRed};
      svg {
        color: ${theme.colors.alert.darkRed};
      }
    `}

  ${({ color, theme }) =>
    color === "warning" &&
    css`
      background-color: ${theme.colors.primary.light};
      color: ${theme.colors.primary.main};
    `}
`;

export const Message = ({ content, children, ...props }) => {
  return (
    <StyledMessage {...props}>
      <FontAwesomeIcon icon="info-circle" />
      {content || children}
    </StyledMessage>
  );
};

Message.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node,
  color: PropTypes.oneOf(["info", "danger", "warning"]),
};

Message.defaultProps = {
  content: null,
  children: null,
  color: "info",
};
