import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";

import { withWrapper } from "./utils";
import { Form, Stepper, Title } from "./components";

const Wrapper = styled.div``;

const ReactJSONWizard = ({ schema }) => {
  const parsedSchema = JSON.parse(schema);
  const { steps, title, titleProps, wrapperProps } = parsedSchema;
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    mode: "onBlur"
  });

  const onSubmit = (data) => {
    console.log("data: ", data);
  };

  const stepsArray = steps.map((st) => st.title);

  return (
    <Wrapper {...wrapperProps}>
      <Title title={title} titleProps={titleProps} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stepper
            currentStepContent={
              <Form data={steps[currentStep]} stepIndex={currentStep} />
            }
            currentStepIndex={currentStep}
            setCurrentStepIndex={setCurrentStep}
            steps={stepsArray}
          />
        </form>
      </FormProvider>
    </Wrapper>
  );
};

ReactJSONWizard.propTypes = {
  schema: PropTypes.string.isRequired,
};

export default withWrapper(ReactJSONWizard);
