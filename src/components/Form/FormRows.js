import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { Alert, Divider, FormRow, OutlineButton } from "@licenserocks/kit";

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

  return (
    <>
      {rows?.map((row, idx) => {
        const rowKey = `step-${stepIndex}-row-${idx}`;
        const rowErrors = [];
        const showRow = row.expandable ? expanded : true;

        return (
          <Fragment key={rowKey}>
            <FormRow
              errors={rowErrors}
              label={row.label}
              mb={row?.marginBottom}
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
                    recurringIndex={index}
                    rowId={idx}
                    stepIndex={stepIndex}
                    wizardData={wizardData}
                  />
                );
              })}
            </FormRow>

            {row?.divider && <Divider my={row?.dividerSize} />}
          </Fragment>
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
