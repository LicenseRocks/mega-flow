import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import {
  BorderedRadio,
  Checkbox,
  Datepicker,
  FilePond,
  FileUpload,
  Input,
  PriceField,
  Radio,
  ReactSelect,
  Select,
  Stepper,
  TextArea,
  ToggleSwitch,
} from "@licenserocks/kit";

import { checkCondition } from "../../helpers";

const mapFieldTypeToComponent = (fieldType) => {
  switch (fieldType) {
    case "datepicker":
      return Datepicker;
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
  wizardData,
}) => {
  const { control, register } = useFormContext();
  const { conditions, defaultValue, name, required, type, ...others } = field;
  const Field = mapFieldTypeToComponent(type);
  const fieldKey = `step-${stepIndex}-row-${rowId}-field-${fieldId}`;
  const fieldName = isRecurring
    ? `${data.name}[${recurringIndex}].${name}`
    : name;

  const prevValue =
    isRecurring &&
    wizardData[data.name] &&
    wizardData[data.name][recurringIndex]
      ? wizardData[data.name][recurringIndex][name]
      : wizardData[name];

  const showIfHasCondition = checkCondition(conditions, control, wizardData);

  if (!showIfHasCondition) return null;
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
  wizardData: PropTypes.shape({}).isRequired,
  rowId: PropTypes.number.isRequired,
};

FormField.defaultProps = {
  recurringIndex: null,
};
