import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { AppContainer, theme, Wizard } from "rockskit";

import { Form } from "./components";
import "./utils/faLibrary";

const Wrapper = styled.div``;

const ReactJSONWizard = ({ schema, onFinish }) => {
  const parsedSchema = JSON.parse(schema);
  const { steps, stepperProps, wrapperProps } = parsedSchema;
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
    } else {
      onFinish(wizardData);
    }
  };

  const stepsArray = steps.map((st) => st.title);

  const renderForm = () => (
    <Form
      data={steps[currentStep]}
      stepIndex={currentStep}
      wizardData={wizardData}
    />
  );

  return (
    <AppContainer theme={theme}>
      <Wrapper {...wrapperProps}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Wizard
              currentStepContent={renderForm()}
              currentStepIndex={currentStep}
              setCurrentStepIndex={setCurrentStep}
              steps={stepsArray}
              {...stepperProps}
            />
          </form>
        </FormProvider>
      </Wrapper>
    </AppContainer>
  );
};

ReactJSONWizard.propTypes = {
  schema: PropTypes.string.isRequired,
  onFinish: PropTypes.func,
};

ReactJSONWizard.defaultProps = {
  onFinish: () => {},
};

export default ReactJSONWizard;
