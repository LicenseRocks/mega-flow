import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "..";
import { FormRows } from "./FormRows";

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

const Form = ({ data, stepIndex, wizardData }) => {
  const isRecurring = data.recurring;

  const { fields, append, remove } = useFieldArray({
    name: isRecurring ? data?.name : "",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append();
    }
  }, []);

  const renderRows = (index) => (
    <FormRows
      data={data}
      index={index}
      isRecurring={isRecurring}
      rows={data.rows}
      stepIndex={stepIndex}
      wizardData={wizardData}
    />
  );

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
