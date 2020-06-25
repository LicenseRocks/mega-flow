import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import "./styles.css";

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 24px 24px 24px 40px;
`;

const duration = 3000;

const StepContent = ({ children, ...props }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  return (
    <CSSTransition in={mounted} timeout={duration} classNames="stepContent">
      <StyledContent {...props}>{children}</StyledContent>
    </CSSTransition>
  );
};

StepContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StepContent;
