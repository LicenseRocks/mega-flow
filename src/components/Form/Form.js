import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

import { FormRow } from ".";
import { Checkbox, Input, Radio, Select, ToggleSwitch } from "./Elements";

const Wrapper = styled.div`
  max-width: 680px;
  margin: auto;
`;

const mapInputTypeToComponent = (inputType) => {
  switch (inputType) {
    case "select":
      return Select;
    case "checkbox":
      return Checkbox;
    case "radio":
      return Radio;
    case "toggleSwitch":
      return ToggleSwitch;
    default:
      return Input;
  }
};

const Form = ({ data, stepIndex }) => {
  const { errors, register } = useFormContext();

  return (
    <Wrapper>
      {data.rows?.map((row, idx) => {
        const rowKey = `step-${stepIndex}-row-${idx}`;
        const rowErrors = [];

        return (
          <FormRow errors={rowErrors} key={rowKey} label={row.label}>
            {row.inputs?.map(({ name, type, ...input }, inputId) => {
              const Field = mapInputTypeToComponent(type);
              const fieldKey = `step-${stepIndex}-row-${idx}-field-${inputId}`;
              const error = errors[name]?.message;
              if (error) rowErrors.push(error);

              return (
                <Field
                  hasError={!!error}
                  key={fieldKey}
                  name={name}
                  register={register}
                  {...input}
                />
              );
            })}
          </FormRow>
        );
      })}
    </Wrapper>
  );
};

Form.propTypes = {
  data: PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  stepIndex: PropTypes.number.isRequired,
};

Form.defaultProps = {};

export default Form;
