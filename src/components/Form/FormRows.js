import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { Alert, FormRow, OutlineButton } from "@licenserocks/kit";

import { FormField } from "./Field";

export const FormRows = ({
  data,
  index,
  isRecurring,
  rows,
  stepIndex,
  wizardData,
}) => {
  const { errors } = useFormContext();
  const [expanded, setExpanded] = useState(false);
  const showExpandButton = rows?.some((row) => row.expandable);
  const checkConditions = rows?.some((row) => {
    return;
  });

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
              <Alert color={row.messageColor} content={row.message} mb={2} />
            )}

            {row.fields?.map((field, fieldId) => {
              const error =
                isRecurring && errors[data.name] && errors[data.name][index]
                  ? errors[data.name][index][field.name]?.message
                  : errors[field.name]?.message;

              if (error) rowErrors.push(error);

              return (
                <FormField
                  data={data}
                  field={field}
                  fieldId={fieldId}
                  hasError={!!error}
                  isRecurring={isRecurring}
                  rowId={idx}
                  stepIndex={stepIndex}
                  wizardData={wizardData}
                />
              );
            })}
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
