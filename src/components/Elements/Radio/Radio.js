import React from "react";
import PropTypes from "prop-types";

import { RadioAndCheckboxWrapper } from "../FieldWrapper";

const Radio = ({ checked, name, onChange, options, stacked, ...props }) => {
  return options.map((opt) => (
    <RadioAndCheckboxWrapper
      key={opt.value}
      checked={checked}
      label={opt.label}
      name={name}
      onChange={onChange}
      stacked={stacked}
      value={opt.value}
      type="radio"
      {...props}
    />
  ));
};

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.node,
  stacked: PropTypes.bool,
};

Radio.defaultProps = {
  stacked: true,
};

export default Radio;
