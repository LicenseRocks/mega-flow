import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFieldArray } from "react-hook-form";
import { Icon, OutlineButton, TextButton } from "@licenserocks/kit";

import { FormRows } from "./FormRows";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2, 2, 2, 6)};
  background-color: ${({ theme }) => theme.palette.gray.light};
  border: 1px solid ${({ theme }) => theme.palette.gray.regular};
  border-radius: 16px;
  margin-bottom: 16px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const Form = ({ data, defaultValues, stepIndex, stepFormData }) => {
  const isRecurring = data.recurring;

  const { fields, append, remove } = useFieldArray({
    name: isRecurring ? data?.name : "",
  });

  const renderRows = (index, recurringDisabled) => (
    <FormRows
      data={data}
      index={index}
      isRecurring={isRecurring}
      recurringDisabled={recurringDisabled}
      rows={data.rows}
      stepIndex={stepIndex}
      stepData={stepFormData}
    />
  );

  const renderRecurring = () => (
    <>
      {fields.map((item, idx) => {
        const disabled = defaultValues?.[data.name]?.[idx]?.disabled;
        return (
          <Wrapper key={item.id} disabled={disabled}>
            <ButtonsWrapper>
              <OutlineButton
                color="danger"
                disabled={disabled}
                onClick={() => remove(idx)}
                size="sm"
              >
                <Icon icon="trash" prefix="fa" />
              </OutlineButton>
            </ButtonsWrapper>

            {renderRows(idx, disabled)}
          </Wrapper>
        );
      })}

      <TextButton content="+ Add item" onClick={append} size="sm" />
    </>
  );

  return isRecurring ? renderRecurring() : renderRows();
};

Form.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    recurring: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  stepIndex: PropTypes.number.isRequired,
  stepFormData: PropTypes.shape({}),
};

Form.defaultProps = {
  stepFormData: {},
};

export default Form;
