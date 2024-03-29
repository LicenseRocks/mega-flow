import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AppContainer,
  RocksKitIcons,
  RocksKitTheme,
  Wizard,
} from "@licenserocks/kit";
import { FormProvider, useForm } from "react-hook-form";

import { Form } from "./components";
import { MegaFlowIcons } from "./theme";
import { MegaFlowPropTypes, MegaFlowDefaultProps } from "./props";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.gray.light};
`;

const getOutputData = (output) =>
  Object.values(output).reduce((obj, acc) => ({ ...obj, ...acc }), {});

const getHiddenValues = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item["name"]]: item?.value,
    };
  }, initialValue);
};

const MegaFlow = ({
  defaultValues,
  icons,
  schema,
  onFinish,
  onStepSubmit,
  renderActionButtons,
  theme,
  watcher,
  livePreview,
  wizardProps,
  wrapperProps,
  ...props
}) => {
  // Parse if schema was type of JSON string
  const parsedSchema = typeof schema === "string" ? JSON.parse(schema) : schema;

  const { steps, hiddenValues } = parsedSchema;
  const [currentStep, setCurrentStep] = useState(0);
  const isCurrentLastStep = currentStep === steps.length - 1;
  const [wizardData, setWizardData] = useState({});
  const [hiddenData, setHiddenData] = useState({});
  const { formState, getValues, handleSubmit, ...methods } = useForm();

  const stepFormData = wizardData[currentStep] || defaultValues;
  useEffect(() => {
    methods.reset(stepFormData);
    // set hidden values to include in output, without displaying
    if (hiddenValues && currentStep === 0) {
      setHiddenData(getHiddenValues(hiddenValues));
    }
    if (watcher) {
      watcher(getOutputData(wizardData));
    }
  }, [currentStep]);

  const onSubmit = (data) => {
    const currentState = {
      hiddenData,
      ...wizardData,
      [currentStep]: data,
    };

    // Set step data in global wizard object
    setWizardData(currentState);

    // Send step data to props
    if (onStepSubmit) onStepSubmit(data);

    if (!isCurrentLastStep) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onFinish(getOutputData(currentState));
    }
  };

  const stepsArray = steps.map((st) => ({
    title: st.title,
  }));

  const renderForm = () => (
    <Form
      data={steps[currentStep]}
      key={currentStep}
      stepIndex={currentStep}
      stepFormData={stepFormData}
      defaultValues={defaultValues}
      merchandise={props.merchandise}
    />
  );

  return (
    <AppContainer
      icons={{ ...RocksKitIcons, ...MegaFlowIcons, ...icons }}
      theme={theme || RocksKitTheme()}
    >
      <Wrapper {...wrapperProps}>
        <form
          onBlur={(event) => {
            event.preventDefault();
            const values = getValues();

            const data = Object.assign(values, hiddenData);
            if (livePreview) {
              livePreview(data);
            }
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormProvider {...methods}>
            <Wizard
              currentStepContent={renderForm()}
              currentStepIndex={currentStep}
              renderActionButtons={() =>
                renderActionButtons(getOutputData(wizardData))
              }
              setCurrentStepIndex={setCurrentStep}
              steps={stepsArray}
              backgroundStyle="primary"
              {...wizardProps}
              {...props}
            />
          </FormProvider>
        </form>
      </Wrapper>
    </AppContainer>
  );
};

MegaFlow.propTypes = MegaFlowPropTypes;

MegaFlow.defaultProps = MegaFlowDefaultProps;

export default MegaFlow;
