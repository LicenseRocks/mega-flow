import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

import { Dropzone } from "./Dropzone";

export const FileUpload = ({ control, isRequired, name, ...props }) => {
  return (
    <Controller
      as={<Dropzone {...props} />}
      control={control}
      name={name}
      rules={{ required: isRequired }}
    />
  );
};

FileUpload.propTypes = {
  control: PropTypes.shape({}).isRequired,
  isRequired: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

FileUpload.defaultProps = {};
