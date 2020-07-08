import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import { Button } from "..";
import "./styles.css";

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 24px 24px 24px 40px;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const duration = 3000;

const StepContent = ({
  children,
  content,
  handleNext,
  isLastStep,
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
    <CSSTransition in={mounted} timeout={duration} classNames="stepContent">
      <StyledContent {...props}>
        {children || content}
        <ActionWrapper>
          <Button
            content={isLastStep ? "Finish" : "Next"}
            onClick={() => handleNext(isLastStep)}
            type={isLastStep ? "submit" : "button"}
            // disabled
          />
        </ActionWrapper>
      </StyledContent>
    </CSSTransition>
  );
};

StepContent.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  handleNext: PropTypes.func.isRequired,
  isLastStep: PropTypes.bool.isRequired,
};

StepContent.defaultProps = {
  children: null,
  content: null,
};

export default StepContent;
