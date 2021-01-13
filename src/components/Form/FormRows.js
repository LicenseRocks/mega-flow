import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { Alert, Divider, FormRow, OutlineButton } from "@licenserocks/kit";

import { FormField } from "./Field";
import { checkCondition } from "../../helpers";

const StyledRow = styled(FormRow)`
  && {
    label {
      :only-child {
        display: none;
      }
    }
  }
`;

export const FormRows = ({
  data,
  index,
  isRecurring,
  rows,
  stepIndex,
  wizardData,
}) => {
  const { errors, watch } = useFormContext();
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
            <StyledRow
              errors={rowErrors}
              label={row.label}
              labelAlign={row.labelAlign}
              labelGutter={row.labelGutter}
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

                const showIfHasCondition = checkCondition(
                  field.conditions,
                  watch,
                  wizardData
                );
                if (!showIfHasCondition) return null;

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
            </StyledRow>

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
