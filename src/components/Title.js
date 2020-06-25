import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTitle = styled.h1`
  font-size: 32px;
  line-height: 120%;
  color: #000000;
`;

const Title = ({ title, titleProps }) => {
  if (!title) return null;

  return <StyledTitle {...titleProps}>{title}</StyledTitle>;
};

Title.propTypes = {
  title: PropTypes.node,
  titleProps: PropTypes.shape({}),
};

Title.defaultProps = {
  title: "",
  titleProps: {},
};

export default Title;
