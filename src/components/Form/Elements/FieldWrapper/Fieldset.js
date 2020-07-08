import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0%;
  margin: 0;
`;
export const Fieldset = ({ children }) => {
  return <StyledFieldset>{children}</StyledFieldset>;
};

Fieldset.propTypes = {
  children: PropTypes.node.isRequired,
};

Fieldset.defaultProps = {};
