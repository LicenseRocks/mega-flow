import React, { createRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import StepTitle from "./StepTitle";
import StepContent from "./StepContent";
import { stepBorderAndTitleColor } from "./helper";

const CONTENT = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a arcu ac ligula ornare imperdiet. Suspendisse rutrum leo quis massa
efficitur commodo. Maecenas tristique luctus metus, a imperdiet
orci aliquam ac. Mauris finibus tellus ac odio scelerisque, id
congue turpis lacinia. Sed porttitor, lacus eget posuere euismod,
lectus metus malesuada eros, eget convallis neque elit a sapien.
Phasellus nec justo eu arcu blandit tempus at ut elit. Proin eu
massa a leo vestibulum egestas nec eget ante. Aliquam volutpat
convallis ex. In hac habitasse platea dictumst. Nulla quis metus
eros. Proin varius iaculis molestie. Fusce quam arcu, lacinia eu
urna sit amet, sodales egestas nunc. Maecenas eu ex sed urna
suscipit venenatis sed eu lectus. Nulla mauris lacus, egestas
ullamcorper condimentum sed, ultrices at dolor.`;

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

const handleScroll = (el) => {
  const slider = el;
  let isDown = false;
  let startX;
  let sl;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    sl = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    slider.classList.add("active");
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = sl - walk;
  });
};

const Stepper = ({ onFinish, orientation, stepCount, transitionDuration }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const stepRef = useRef(null);
  const isHorizontal = orientation === "horizontal";
  const wrapperRef = createRef();

  useEffect(() => {
    if (isHorizontal) {
      handleScroll(wrapperRef.current);
    }
  }, []);

  useEffect(() => {
    if (isHorizontal && stepRef.current)
      stepRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [currentStep]);

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

  const content = (
    <StepContent
      content={CONTENT}
      isLastStep={currentStep === stepCount - 1}
      handleNext={handleNext}
      transitionDuration={transitionDuration}
    />
  );

  return (
    <Wrapper>
      <StepsWrapper isHorizontal={isHorizontal}>
        <Steps isHorizontal={isHorizontal} ref={wrapperRef}>
          {Array(stepCount)
            .fill(0)
            .map((step, idx) => {
              const isActive = idx === currentStep;
              const isPassed = idx < currentStep;

              return (
                <Step
                  isActive={isActive}
                  isHorizontal={isHorizontal}
                  isPassed={isPassed}
                  ref={isActive ? stepRef : null}
                >
                  <StepTitle
                    label={`Step ${idx}`}
                    flag={idx}
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
  onFinish: PropTypes.func,
  orientation: PropTypes.string,
  stepCount: PropTypes.number.isRequired,
  transitionDuration: PropTypes.number,
};

Stepper.defaultProps = {
  onFinish: () => {},
  orientation: "horizontal",
  transitionDuration: 250,
};

export default Stepper;
