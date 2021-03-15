import React, { useState } from "react";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import {
  AppContainer,
  RocksKitIcons,
  RocksKitTheme,
  Wizard,
} from "@licenserocks/kit";

import { Form } from "./components";
import { MegaFlowIcons } from "./theme";
import { MegaFlowPropTypes, MegaFlowDefaultProps } from "./props";

const Wrapper = styled.div``;

const MegaFlow = ({
  defaultValues,
  icons,
  schema,
  onFinish,
  onStepSubmit,
  theme,
  watcher,
  watchList,
  wizardProps,
  wrapperProps,
  ...props
}) => {
  // Parse if schema was type of JSON string
  const parsedSchema = typeof schema === "string" ? JSON.parse(schema) : schema;

  const { steps } = parsedSchema;
  const [currentStep, setCurrentStep] = useState(0);
  const isCurrentLastStep = currentStep === steps.length - 1;
  const [wizardData, setWizardData] = useState(defaultValues);

  const { handleSubmit, ...methods } = useForm({
    defaultValues: wizardData,
  });

  if (watcher && watchList.length > 0) {
    watcher(methods.watch(watchList));
  }

  const onSubmit = (data) => {
    const currentState = {
      ...wizardData,
      ...data,
    };
    // Set step data in global wizard object
    setWizardData(currentState);

    // Send step data to props
    if (onStepSubmit) onStepSubmit(data);

    if (!isCurrentLastStep) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onFinish(currentState);
    }
  };

  const stepsArray = steps.map((st) => ({
    title: st.title,
  }));

  const renderForm = () => (
    <Form
      data={steps[currentStep]}
      stepIndex={currentStep}
      wizardData={wizardData}
    />
  );

  return (
    <AppContainer
      icons={{ ...RocksKitIcons, ...MegaFlowIcons, ...icons }}
      theme={theme || RocksKitTheme}
    >
      <Wrapper {...wrapperProps}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Wizard
              currentStepContent={renderForm()}
              currentStepIndex={currentStep}
              setCurrentStepIndex={setCurrentStep}
              steps={stepsArray}
              {...wizardProps}
              {...props}
            />
          </form>
        </FormProvider>
      </Wrapper>
    </AppContainer>
  );
};

MegaFlow.propTypes = MegaFlowPropTypes;

MegaFlow.defaultProps = MegaFlowDefaultProps;

export default MegaFlow;
