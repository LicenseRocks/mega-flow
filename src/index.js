import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { withWrapper } from "./utils";
import { Stepper, Title } from "./components";

const Wrapper = styled.div``;

const ReactJSONWizard = ({ schema }) => {
  const parsedSchema = JSON.parse(schema);
  const { title, titleProps, wrapperProps } = parsedSchema;

  return (
    <Wrapper {...wrapperProps}>
      <Title title={title} titleProps={titleProps} />

      <Stepper stepCount={15} />
    </Wrapper>
  );
};

ReactJSONWizard.propTypes = {
  schema: PropTypes.string.isRequired,
};

export default withWrapper(ReactJSONWizard);
