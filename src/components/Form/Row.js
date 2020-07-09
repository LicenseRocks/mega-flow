import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Label } from "./Elements";
import { FormError } from "./Error";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  margin-bottom: 8px;
`;

const StyledLabel = styled(Label)`
  flex: 30% 0;
`;

const FieldsAndErrorsWrapper = styled.div`
  flex: ${({ fullWidth }) => (fullWidth ? "100%" : "70%")} 0;
`;

const Fields = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const FormRow = ({ children, errors, label }) => {
  return (
    <Wrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <FieldsAndErrorsWrapper fullWidth={!label}>
        <Fields>{children}</Fields>
        {errors.map((err) => (
          <FormError key={err} message={err} />
        ))}
      </FieldsAndErrorsWrapper>
    </Wrapper>
  );
};

FormRow.propTypes = {
  children: PropTypes.node.isRequired,
  errors: PropTypes.arrayOf(PropTypes.node).isRequired,
  label: PropTypes.node.isRequired,
};

FormRow.defaultProps = {};
