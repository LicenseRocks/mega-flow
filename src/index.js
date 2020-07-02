import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import { withWrapper } from "./utils";
import { Form, Stepper, Title } from "./components";

const Wrapper = styled.div``;

const ReactJSONWizard = ({ schema }) => {
  const parsedSchema = JSON.parse(schema);
  const { steps, title, titleProps, wrapperProps } = parsedSchema;
  const [currentStep, setCurrentStep] = useState(0);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    role: yup.string().required(),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("data: ", data);
  };

  return (
    <Wrapper {...wrapperProps}>
      <Title title={title} titleProps={titleProps} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stepper
            currentStepContent={<Form data={steps[currentStep]} stepIndex={currentStep} />}
            currentStepTitle={steps[currentStep].title}
            currentStepIndex={currentStep}
            setCurrentStepIndex={setCurrentStep}
            stepCount={steps.length}
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
