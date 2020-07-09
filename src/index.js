import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";

import { withWrapper } from "./utils";
import { Form, Stepper } from "./components";

const Wrapper = styled.div``;

const ReactJSONWizard = ({ schema }) => {
  const parsedSchema = JSON.parse(schema);
  const { steps, wrapperProps } = parsedSchema;
  const [currentStep, setCurrentStep] = useState(0);
  const isCurrentLastStep = currentStep === steps.length - 1;
  const [wizardData, setWizardData] = useState({});

  const methods = useForm({
    mode: "onBlur",
    defaultValues: wizardData,
  });

  const onSubmit = (data) => {
    console.log("data: ", data);
    setWizardData((prev) => ({
      ...prev,
      ...data,
    }));
    if (!isCurrentLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  console.log('wizardData: ', wizardData);

  const stepsArray = steps.map((st) => st.title);

  return (
    <Wrapper {...wrapperProps}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stepper
            currentStepContent={(
              <Form
                data={steps[currentStep]}
                stepIndex={currentStep}
                wizardData={wizardData}
              />
            )}
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
