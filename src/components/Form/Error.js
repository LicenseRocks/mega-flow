import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Error = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 120%;
  color: ${({ theme }) => theme.colors.alert.darkRed};
  margin-top: 8px;
`;

export const FormError = ({ message }) => {
  return <Error>{message}</Error>;
};

FormError.propTypes = {
  message: PropTypes.node.isRequired,
};

FormError.defaultProps = {};
