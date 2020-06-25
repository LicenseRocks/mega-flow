import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import {
  stepBorderAndTitleColor,
  stepFlagBackgroundColor,
  stepFlagColor,
} from "./helper";

const StyledTitle = styled.div`
  display: inline-flex;
  align-items: center;

  ${({ isPassed }) =>
    isPassed &&
    css`
      cursor: pointer;
    `}
`;

const Flag = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => stepFlagBackgroundColor(props)};
  color: ${(props) => stepFlagColor(props)};
  border-radius: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  z-index: 1;
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  color: ${(props) => stepBorderAndTitleColor(props)};
  padding-left: 8px;
`;

const StepTitle = ({ isActive, isPassed, label, flag, onClick }) => {
  return (
    <StyledTitle onClick={onClick} isPassed={isPassed}>
      <Flag isActive={isActive} isPassed={isPassed}>
        {flag}
      </Flag>
      <Label isActive={isActive} isPassed={isPassed}>
        {label}
      </Label>
    </StyledTitle>
  );
};

StepTitle.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isPassed: PropTypes.bool.isRequired,
  label: PropTypes.node.isRequired,
  flag: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

StepTitle.defaultProps = {
  onClick: () => {},
};

export default StepTitle;
