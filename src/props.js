import PropTypes from "prop-types";

export const MegaFlowPropTypes = {
  defaultValues: PropTypes.shape({}),
  icons: PropTypes.arrayOf(PropTypes.shape()),
  schema: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onFinish: PropTypes.func,
  onStepSubmit: PropTypes.func,
  renderActionButtons: PropTypes.func,
  theme: PropTypes.shape(),
  watcher: PropTypes.func,
  watchList: PropTypes.arrayOf(PropTypes.string),
  wizardProps: PropTypes.shape(),
  wrapperProps: PropTypes.shape(),
};

export const MegaFlowDefaultProps = {
  defaultValues: {},
  icons: [],
  onFinish: () => { },
  renderActionButtons: () => { },
  watchList: [],
};
