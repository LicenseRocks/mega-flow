import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FormRow } from ".";
import {
  Checkbox,
  FileUpload,
  Input,
  Radio,
  Select,
  ToggleSwitch,
} from "./Elements";
import { Button, Message } from "..";

const Wrapper = styled.div`
  padding: 8px 8px 8px 24px;
  background-color: ${({ theme }) => theme.colors.gray.light};
  border: 1px solid ${({ theme }) => theme.colors.gray.regular};
  border-radius: 16px;
  margin-bottom: 16px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

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

  useEffect(() => {
    if (fields.length === 0) {
      append();
    }
  }, []);

  const renderRows = (index) =>
    data.rows?.map((row, idx) => {
      const rowKey = `step-${stepIndex}-row-${idx}`;
      const rowErrors = [];

      return (
        <FormRow errors={rowErrors} key={rowKey} label={row.label}>
          {row.message && (
            <Message
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
    });

  const renderRecurring = () =>
    fields.map((item, idx) => (
      <Wrapper key={item.id}>
        <ButtonsWrapper>
          <Button
            color="danger"
            disabled={fields.length === 1}
            onClick={() => remove(idx)}
            size="sm"
          >
            <FontAwesomeIcon icon="trash" />
          </Button>
        </ButtonsWrapper>
        {renderRows(idx)}
      </Wrapper>
    ));

  return (
    <>
      {isRecurring ? renderRecurring() : renderRows()}
      {isRecurring && (
        <Button onClick={append} size="sm" text>
          + Add item
        </Button>
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
