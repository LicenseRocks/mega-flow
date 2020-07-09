import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

import { Dropzone } from "./Dropzone";

export const FileUpload = ({
  control,
  defaultValue,
  isRequired,
  name,
  ...props
}) => {
  return (
    <Controller
      as={<Dropzone defaultValue={defaultValue} {...props} />}
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{ required: isRequired }}
    />
  );
};

FileUpload.propTypes = {
  control: PropTypes.shape({}).isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  isRequired: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

FileUpload.defaultProps = {
  defaultValue: undefined,
}
