import React from "react";
import PropTypes from "prop-types";

import { RadioAndCheckboxWrapper, Fieldset } from "../FieldWrapper";

export const Checkbox = ({
  checked,
  name,
  onChange,
  options,
  register,
  stacked,
  ...props
}) => {
  return (
    <Fieldset>
      {options.map((opt) => (
        <RadioAndCheckboxWrapper
          value={opt.value}
          key={opt.value}
          label={opt.label}
          name={name}
          register={register}
          stacked={stacked}
          type="checkbox"
          {...props}
        />
      ))}
    </Fieldset>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  register: PropTypes.func.isRequired,
  stacked: PropTypes.bool,
};

Checkbox.defaultProps = {
  stacked: true,
};
