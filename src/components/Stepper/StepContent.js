import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Transition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "..";

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 24px 24px 24px 40px;
  transition: all ${({ duration }) => duration / 2}ms ease-in-out;

  ${({ state }) => {
    switch (state) {
      case "entering":
      case "exited":
        return css`
          -webkit-filter: blur(1rem);
          filter: blur(1rem);
        `;
      default:
        return css`
          -webkit-filter: blur(0);
          filter: blur(0);
        `;
    }
  }};
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const StepHint = styled.span`
  font-style: italic;
  font-weight: normal;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray.medium};
  margin-left: 8px;
`;

const duration = 500;

const StepContent = ({
  children,
  content,
  currentStep,
  handlePrev,
  isFirstStep,
  isLastStep,
  stepCount,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  return (
    <Transition in={mounted} timeout={duration} unmountOnExit>
      {(state) => (
        <StyledContent duration={duration} state={state} {...props}>
          {children || content}
          <ActionWrapper>
            <div>
              <Button disabled={isFirstStep} onClick={handlePrev} outline>
                <FontAwesomeIcon icon="arrow-left" />
              </Button>
              <StepHint>{`${currentStep} of ${stepCount} steps`}</StepHint>
            </div>
            <Button
              content={isLastStep ? "Finish" : "Next"}
              type="submit"
              // disabled
            />
          </ActionWrapper>
        </StyledContent>
      )}
    </Transition>
  );
};

StepContent.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  currentStep: PropTypes.number.isRequired,
  handlePrev: PropTypes.func.isRequired,
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  stepCount: PropTypes.number.isRequired,
};

StepContent.defaultProps = {
  children: null,
  content: null,
};

export default StepContent;
