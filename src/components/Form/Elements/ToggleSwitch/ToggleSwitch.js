import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

import { Toggle } from "./Toggle";

export const ToggleSwitch = ({
  control,
  defaultValue,
  isRequired,
  name,
  ...props
}) => {
  return (
    <Controller
      render={(events) => (
        <Toggle defaultValue={defaultValue} {...props} {...events} />
      )}
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{ required: isRequired }}
    />
  );
};

ToggleSwitch.propTypes = {
  control: PropTypes.shape({}).isRequired,
  defaultValue: PropTypes.bool,
  isRequired: PropTypes.string,
  name: PropTypes.string.isRequired,
};

ToggleSwitch.defaultProps = {
  defaultValue: undefined,
  isRequired: "",
};
