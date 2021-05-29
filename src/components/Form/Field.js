import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import {
  BorderedRadio,
  Checkbox,
  FormDatepicker,
  FilePond,
  FileUpload,
  Input,
  PriceField,
  Radio,
  ReactSelect,
  Select,
  Stepper,
  TextArea,
  TextButton,
  ToggleSwitch,
} from "@licenserocks/kit";

const mapFieldTypeToComponent = (fieldType) => {
  switch (fieldType) {
    case "datepicker":
      return FormDatepicker;
    case "select":
      return Select;
    case "borderedRadio":
      return BorderedRadio;
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
    case "price":
      return PriceField;
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

export const FormField = ({
  data,
  field,
  hasError,
  isRecurring,
  recurringIndex,
  stepIndex,
  fieldId,
  rowId,
  stepData,
}) => {
  const { control, register } = useFormContext();
  const { conditions, defaultValue, name, required, type, ...others } = field;
  if (type === "link") return <TextButton {...others} />;

  const Field = mapFieldTypeToComponent(type);
  const fieldKey = `step-${stepIndex}-row-${rowId}-field-${fieldId}`;
  const fieldName = isRecurring
    ? `${data.name}[${recurringIndex}].${name}`
    : name;

  const prevValue =
    isRecurring && stepData[data.name] && stepData[data.name][recurringIndex]
      ? stepData[data.name][recurringIndex][name]
      : stepData[name];

  return (
    <Field
      control={control}
      defaultValue={prevValue || defaultValue}
      hasError={hasError}
      isRequired={required}
      key={fieldKey}
      name={fieldName}
      register={register({
        required,
      })}
      type={type}
      {...others}
    />
  );
};

FormField.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    recurring: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  field: PropTypes.shape({
    conditions: PropTypes.arrayOf(PropTypes.string),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    name: PropTypes.string,
    required: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  fieldId: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired,
  isRecurring: PropTypes.bool.isRequired,
  recurringIndex: PropTypes.number,
  stepIndex: PropTypes.number.isRequired,
  stepData: PropTypes.shape({}).isRequired,
  rowId: PropTypes.number.isRequired,
};

FormField.defaultProps = {
  recurringIndex: null,
};
