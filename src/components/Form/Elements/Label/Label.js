import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 14px;
  line-height: 120%;
  color: ${({ theme }) => theme.colors.gray.medium};
`;

export const Label = (props) => {
  return <StyledLabel {...props} />;
};

Label.propTypes = {};

Label.defaultProps = {};
