import PropTypes from "prop-types";

export const MegaFlowPropTypes = {
  icons: PropTypes.arrayOf(PropTypes.shape()),
  schema: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onFinish: PropTypes.func,
  onStepSubmit: PropTypes.func,
  theme: PropTypes.shape(),
  wizardProps: PropTypes.shape(),
  wrapperProps: PropTypes.shape(),
};

export const MegaFlowDefaultProps = {
  icons: [],
  onFinish: () => {},
};
