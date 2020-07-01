import React from "react";
import PropTypes from "prop-types";

import { RadioAndCheckboxWrapper } from "../FieldWrapper";

const Checkbox = ({ checked, name, onChange, options, stacked, ...props }) => {
  return options.map((opt) => (
    <RadioAndCheckboxWrapper
      key={opt.value}
      checked={checked}
      label={opt.label}
      name={name}
      onChange={onChange}
      stacked={stacked}
      value={opt.value}
      type="checkbox"
      {...props}
    />
  ));
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.node,
  stacked: PropTypes.bool,
};

Checkbox.defaultProps = {
  stacked: true,
};

export default Checkbox;
