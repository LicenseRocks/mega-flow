import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import {
  Alert,
  Divider,
  FormRow,
  Icon,
  OutlineButton,
  Tooltip,
} from "@licenserocks/kit";

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

const Hint = styled.span`
  background: #f0f0f4;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  vertical-align: middle;

  svg {
    color: #8685a6;
    font-size: 10px;
  }
`;

export const FormRows = ({
  data,
  index,
  isRecurring,
  recurringDisabled,
  rows,
  stepIndex,
  stepData,
}) => {
  const { errors, watch } = useFormContext();
  const [expanded, setExpanded] = useState(false);
  const showExpandButton = rows?.some((row) => row.expandable);

  return (
    <>
      {rows?.map((row, idx) => {
        const rowKey = `step-${stepIndex}-row-${idx}`;
        const rowErrors = [];
        const rowConditions = checkCondition(
          row.conditions,
          watch,
          stepData,
          isRecurring,
          data.name,
          index
        );
        if (!rowConditions) return null;

        const showRow = row.expandable ? expanded : true;
        const label = [...(row.label || [])];
        if (row.hint)
          label.push(
            <Tooltip content={row.hint} contentProps={{ fontStyle: "normal" }}>
              <Hint>
                <Icon icon="question" />
              </Hint>
            </Tooltip>
          );

        return (
          <Fragment key={rowKey}>
            <StyledRow
              errors={rowErrors}
              label={label.length > 0 ? label : null}
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
                  stepData,
                  isRecurring,
                  data.name,
                  index
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
                    recurringDisabled={recurringDisabled}
                    rowId={idx}
                    stepIndex={stepIndex}
                    stepData={stepData}
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
  stepData: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  isRecurring: PropTypes.bool.isRequired,
  recurringDisabled: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

FormRows.defaultProps = {
  recurringDisabled: false,
};
