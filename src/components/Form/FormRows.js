import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import {
  Alert,
  Checkbox,
  FilePond,
  FileUpload,
  FormRow,
  Input,
  OutlineButton,
  Radio,
  ReactSelect,
  Select,
  Stepper,
  TextArea,
  ToggleSwitch,
} from "@licenserocks/kit";

const mapFieldTypeToComponent = (fieldType) => {
  switch (fieldType) {
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
    case "filePond":
      return FilePond;
    case "reactSelect":
      return ReactSelect;
    case "stepper":
      return Stepper;
    case "textArea":
      return TextArea;
    default:
      return Input;
  }
};

export const FormRows = ({
  data,
  index,
  isRecurring,
  rows,
  stepIndex,
  wizardData,
}) => {
  const { control, errors, register } = useFormContext();
  const [expanded, setExpanded] = useState(false);
  const showExpandButton = rows?.some((row) => row.expandable);

  return (
    <>
      {rows?.map((row, idx) => {
        const rowKey = `step-${stepIndex}-row-${idx}`;
        const rowErrors = [];
        const showRow = row.expandable ? expanded : true;

        return (
          <FormRow
            errors={rowErrors}
            key={rowKey}
            label={row.label}
            show={showRow}
          >
            {row.message && (
              <Alert
                color={row.messageColor}
                content={row.message}
                style={{ marginBottom: 8 }}
              />
            )}

            {row.fields?.map(
              ({ defaultValue, name, required, type, ...field }, fieldId) => {
                const Field = mapFieldTypeToComponent(type);
                const fieldKey = `step-${stepIndex}-row-${idx}-field-${fieldId}`;
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
                    type={type}
                    {...field}
                  />
                );
              }
            )}
          </FormRow>
        );
      })}

      {showExpandButton && (
        <OutlineButton
          color="secondary"
          onClick={() => setExpanded((prev) => !prev)}
          size="sm"
        >
          {expanded ? "Hide Optional Params" : "Show Optional Params"}
        </OutlineButton>
      )}
    </>
  );
};

FormRows.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    recurring: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  stepIndex: PropTypes.number.isRequired,
  wizardData: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  isRecurring: PropTypes.bool.isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

FormRows.defaultProps = {};
