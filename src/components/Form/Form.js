import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFieldArray, useFormContext } from "react-hook-form";

import { FormRow } from ".";
import {
  Checkbox,
  FileUpload,
  Input,
  Radio,
  Select,
  ToggleSwitch,
} from "./Elements";
import { TextButton } from "..";

const Wrapper = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.gray.light};
  border: 1px solid ${({ theme }) => theme.colors.gray.regular};
  border-radius: 16px;
  margin-bottom: 16px;
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
    case "fileUpload":
      return FileUpload;
    default:
      return Input;
  }
};

const Form = ({ data, stepIndex, wizardData }) => {
  const { control, errors, register } = useFormContext();
  const isRecurring = data.recurring;

  const { fields, append, remove } = useFieldArray({
    name: isRecurring ? data?.name : "",
  });

  const renderRows = (index) =>
    data.rows?.map((row, idx) => {
      const rowKey = `step-${stepIndex}-row-${idx}`;
      const rowErrors = [];

      return (
        <FormRow errors={rowErrors} key={rowKey} label={row.label}>
          {row.inputs?.map(
            ({ defaultValue, name, required, type, ...input }, inputId) => {
              const Field = mapInputTypeToComponent(type);
              const fieldKey = `step-${stepIndex}-row-${idx}-field-${inputId}`;
              const fieldName = isRecurring
                ? `${data.name}[${index}].${name}`
                : name;

              const error =
                isRecurring && errors[data.name] && errors[data.name][index]
                  ? errors[data.name][index][name]?.message
                  : errors[name]?.message;
              if (error) rowErrors.push(error);

              const prevValue =
                isRecurring &&
                wizardData[data.name] &&
                wizardData[data.name][index]
                  ? wizardData[data.name][index][name]
                  : wizardData[name];

              return (
                <Field
                  control={control}
                  defaultValue={prevValue || defaultValue}
                  hasError={!!error}
                  isRequired={required}
                  key={fieldKey}
                  name={fieldName}
                  register={register({
                    required,
                  })}
                  {...input}
                />
              );
            }
          )}
        </FormRow>
      );
    });

  return (
    <>
      {isRecurring
        ? fields.map((item, idx) => (
          <Wrapper key={item.id}>{renderRows(idx)}</Wrapper>
          ))
        : renderRows()}
      {isRecurring && (
        <TextButton onClick={append} size="sm">
          + Add item
        </TextButton>
      )}
    </>
  );
};

Form.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    recurring: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  stepIndex: PropTypes.number.isRequired,
  wizardData: PropTypes.shape({}).isRequired,
};

Form.defaultProps = {};

export default Form;
