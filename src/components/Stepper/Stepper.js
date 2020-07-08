import React, { createRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import StepTitle from "./StepTitle";
import StepContent from "./StepContent";
import { stepBorderAndTitleColor } from "./helper";
import { handleScroll } from "../../utils";

const Wrapper = styled.div`
  max-width: 680px;
  margin: auto;
`;

const StepsWrapper = styled.div`
  ${({ isHorizontal }) =>
    isHorizontal &&
    css`
      position: relative;
      ::before {
        content: "";
        display: inline-block;
        width: 80px;
        height: 100%;
        background: linear-gradient(
          270deg,
          #ffffff 0%,
          rgba(255, 255, 255, 0) 100%
        );
        transform: rotate(-180deg);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }

      ::after {
        content: "";
        display: inline-block;
        width: 80px;
        height: 100%;
        background: linear-gradient(
          270deg,
          #ffffff 0%,
          rgba(255, 255, 255, 0) 100%
        );
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
      }
    `}
`;

const Steps = styled.div`
  ${({ isHorizontal }) =>
    isHorizontal &&
    css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      white-space: nowrap;
      overflow-y: hidden;
      overflow-x: scroll;
      padding: 0 64px;
      user-select: none;
      -ms-overflow-style: none;
      &&::-webkit-scrollbar {
        display: none;
      }
      &.active {
        cursor: grabbing;
        cursor: -webkit-grabbing;
      }
    `}
`;

const StepConnector = styled.div`
  border-width: 0;
  border-style: dashed;
  border-color: ${(props) => stepBorderAndTitleColor(props)};
  border-left-width: 2px;
  transition: all ${({ transitionDuration }) => `${transitionDuration}ms`}
    ease-in-out;
  position: absolute;
  top: 0;
  left: 15px;
  bottom: 0;
  ::before {
    content: "";
    width: 2px;
    height: 100%;
    display: inline-block;
  }

  ${({ isHorizontal }) =>
    isHorizontal &&
    css`
      width: 100%;
      border-left-width: 0;
      border-top-width: 2px;
      top: 15px;
      left: 8px;
      ::before {
        content: "";
        width: 100%;
        height: 2px;
        display: inline-block;
      }
    `}
`;

const Step = styled.div`
  box-sizing: border-box;
  position: relative;
  min-height: 60px;

  :last-child {
    ${StepConnector} {
      ${({ isActive, isHorizontal }) =>
        (!isActive || isHorizontal) && "border: none"};
    }
  }

  ${({ isHorizontal }) =>
    isHorizontal &&
    css`
      width: 100px;
      min-width: 100px;
    `}
`;

const Stepper = ({
  currentStepContent,
  currentStepIndex,
  orientation,
  setCurrentStepIndex,
  steps,
  transitionDuration,
}) => {
  const stepRef = useRef(null);
  const isHorizontal = orientation === "horizontal";
  const wrapperRef = createRef();
  const stepCount = steps.length;

  useEffect(() => {
    if (isHorizontal) {
      handleScroll(wrapperRef.current);
    }
  }, []);

  useEffect(() => {
    if (isHorizontal && stepRef.current)
      stepRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [currentStepIndex]);

  const handleNext = (isLastStep) => {
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleStepClick = (isPassed, stepIdx) => {
    if (isPassed) {
      setCurrentStepIndex(stepIdx);
    }
  };

  const content = (
    <StepContent
      content={currentStepContent}
      isLastStep={currentStepIndex === stepCount - 1}
      handleNext={handleNext}
      transitionDuration={transitionDuration}
    />
  );

  return (
    <Wrapper>
      <StepsWrapper isHorizontal={isHorizontal}>
        <Steps isHorizontal={isHorizontal} ref={wrapperRef}>
          {steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isPassed = idx < currentStepIndex;
            const stepKey = `step-${idx}`;

            return (
              <Step
                isActive={isActive}
                isHorizontal={isHorizontal}
                isPassed={isPassed}
                key={stepKey}
                ref={isActive ? stepRef : null}
              >
                <StepTitle
                  label={step}
                  flag={idx + 1}
                  isActive={isActive}
                  isHorizontal={isHorizontal}
                  isPassed={isPassed}
                  onClick={() => handleStepClick(isPassed, idx)}
                  transitionDuration={transitionDuration}
                />
                {!isHorizontal && isActive && content}
                <StepConnector
                  isActive={isActive}
                  isHorizontal={isHorizontal}
                  isPassed={isPassed}
                  transitionDuration={transitionDuration}
                />
              </Step>
            );
          })}
        </Steps>
      </StepsWrapper>
      {isHorizontal && content}
    </Wrapper>
  );
};

Stepper.propTypes = {
  currentStepContent: PropTypes.node.isRequired,
  currentStepIndex: PropTypes.number.isRequired,
  orientation: PropTypes.string,
  setCurrentStepIndex: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  transitionDuration: PropTypes.number,
};

Stepper.defaultProps = {
  orientation: "horizontal",
  transitionDuration: 250,
};

export default Stepper;
