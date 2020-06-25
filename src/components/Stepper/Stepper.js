import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import StepTitle from "./StepTitle";
import StepContent from "./StepContent";
import { stepBorderAndTitleColor } from "./helper";
import { PrimaryButton } from "..";

const Wrapper = styled.div``;

const StepConnector = styled.div`
  border-left-width: 2px;
  border-left-style: dashed;
  border-left-color: ${(props) => stepBorderAndTitleColor(props)};
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
`;

const Step = styled.div`
  box-sizing: border-box;
  position: relative;
  min-height: 60px;

  :last-child {
    ${StepConnector} {
      ${({ isActive }) => !isActive && "border: none"};
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const Stepper = ({ onFinish, stepCount }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = (isLastStep) => {
    if (isLastStep) {
      onFinish();
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleStepClick = (isPassed, stepIdx) => {
    if (isPassed) {
      setCurrentStep(stepIdx);
    }
  };

  return (
    <Wrapper>
      {Array(stepCount)
        .fill(0)
        .map((step, idx) => {
          const isActive = idx === currentStep;
          const isPassed = idx < currentStep;
          const isLastStep = idx === stepCount - 1;

          return (
            <Step isActive={isActive} isPassed={isPassed}>
              <StepTitle
                label={`Step ${idx}`}
                flag={idx}
                isActive={isActive}
                isPassed={isPassed}
                onClick={() => handleStepClick(isPassed, idx)}
              />
              {isActive && (
                <StepContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  a arcu ac ligula ornare imperdiet. Suspendisse rutrum leo quis
                  massa efficitur commodo. Maecenas tristique luctus metus, a
                  imperdiet orci aliquam ac. Mauris finibus tellus ac odio
                  scelerisque, id congue turpis lacinia. Sed porttitor, lacus
                  eget posuere euismod, lectus metus malesuada eros, eget
                  convallis neque elit a sapien. Phasellus nec justo eu arcu
                  blandit tempus at ut elit. Proin eu massa a leo vestibulum
                  egestas nec eget ante. Aliquam volutpat convallis ex. In hac
                  habitasse platea dictumst. Nulla quis metus eros. Proin varius
                  iaculis molestie. Fusce quam arcu, lacinia eu urna sit amet,
                  sodales egestas nunc. Maecenas eu ex sed urna suscipit
                  venenatis sed eu lectus. Nulla mauris lacus, egestas
                  ullamcorper condimentum sed, ultrices at dolor.
                  <ButtonWrapper>
                    <PrimaryButton
                      content={isLastStep ? "Finish" : "Next"}
                      onClick={() => handleNext(isLastStep)}
                      // disabled
                    />
                  </ButtonWrapper>
                </StepContent>
              )}
              <StepConnector isActive={isActive} isPassed={isPassed} />
            </Step>
          );
        })}
    </Wrapper>
  );
};

Stepper.propTypes = {
  onFinish: PropTypes.func,
  stepCount: PropTypes.number.isRequired,
};

Stepper.defaultProps = {
  onFinish: () => {},
};

export default Stepper;
