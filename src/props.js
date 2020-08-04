import PropTypes from "prop-types";

export const MegaFlowPropTypes = {
  schema: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onFinish: PropTypes.func,
  onStepSubmit: PropTypes.func,
  wizardProps: PropTypes.shape,
  wrapperProps: PropTypes.shape,
};

export const MegaFlowDefaultProps = {
  onFinish: () => {},
};
