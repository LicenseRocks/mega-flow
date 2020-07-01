import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import FieldWrapper from "../FieldWrapper/FieldWrapper";
import Minus from "../../../assets/icons/minus.svg";
import Plus from "../../../assets/icons/plus.svg";

const StyledStepper = styled(FieldWrapper)`
  button {
    border: unset;
    background: none;
    outline: none;
    cursor: pointer;
    img {
      color: ${({ theme }) => theme.colors.black};
      font-size: 20px;
      height: 20px;
      width: 15px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size }) =>
    size === "sm" &&
    css`
      flex-direction: column;
    `}

  input {
    border: none;
    width: 40px;
    outline: none;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
  }
  span {
    font-size: 12px;
    font-style: italic;
  }
`;

const Stepper = ({ label, value, onChange, min, max, size, ...props }) => {
  const handleChange = (type) => {
    const newVal = type === "sub" ? value - 1 : value + 1;
    if (newVal < min || newVal > max) return;
    onChange(newVal);
  };

  const endIcon = () => (
    <button onClick={() => handleChange("add")} type="button">
      <img src={Plus} alt="StepperAdd" />
    </button>
  );

  const startIcon = () => (
    <button onClick={() => handleChange("sub")} type="button">
      <img src={Minus} alt="StepperEnd" />
    </button>
  );

  return (
    <StyledStepper endIcon={endIcon()} startIcon={startIcon()} {...props}>
      <Wrapper size={size}>
        <input onChange={onChange} value={value} />
        <span>{label}</span>
      </Wrapper>
    </StyledStepper>
  );
};

Stepper.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "normal"]),
  value: PropTypes.number,
};

Stepper.defaultProps = {
  label: "Days",
  min: 1,
  max: 100,
  size: "normal",
  value: 1,
};

export default Stepper;
