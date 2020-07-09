import React from "react";
import PropTypes from "prop-types";

import { RadioAndCheckboxWrapper, Fieldset } from "../FieldWrapper";

export const Radio = ({
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
          type="radio"
          {...props}
        />
      ))}
    </Fieldset>
  );
};

Radio.propTypes = {
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

Radio.defaultProps = {
  stacked: true,
};
