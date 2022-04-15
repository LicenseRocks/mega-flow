import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { useFormContext } from "react-hook-form";
import {
  Alert,
  Divider,
  FormRow,
  H4,
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
  && {
    ${({ backgroundStyle }) =>
      backgroundStyle === "primary" &&
      css`
        background-color: ${({ theme }) => theme.palette.common.white};
      `}
  }
`;

const StyledDivider = styled(Divider)`
  && {
    ${({ backgroundStyle }) =>
      backgroundStyle === "primary" &&
      css`
        background-color: ${({ theme }) => theme.palette.common.white};
      `}
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
  rows,
  stepIndex,
  stepData,
  merchandise,
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

        if (row?.heading)
          return <H4 content={row?.heading} px={4} mt={4} mb={2} />;

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
              mb={0}
              pb={row?.marginBottom ?? 4}
              pt={4}
              px={16}
              show={showRow}
              backgroundStyle={row?.backgroundStyle}
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
                    rowId={idx}
                    stepIndex={stepIndex}
                    stepData={stepData}
                    merchandise={
                      field?.name === "selectMerchIds" ? merchandise : null
                    }
                  />
                );
              })}
            </StyledRow>

            {row?.divider && (
              <StyledDivider
                backgroundStyle={row?.backgroundStyle}
                py={row?.dividerSize}
                px={5}
                m={0}
                pb={4}
              />
            )}
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
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

FormRows.defaultProps = {};
