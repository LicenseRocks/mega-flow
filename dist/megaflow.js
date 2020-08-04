'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var React = require('react');
var React__default = _interopDefault(React);
var styled = _interopDefault(require('styled-components'));
var reactHookForm = require('react-hook-form');
var rockskit = require('rockskit');
var PropTypes = _interopDefault(require('prop-types'));
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');

var mapFieldTypeToComponent = function mapFieldTypeToComponent(fieldType) {
  switch (fieldType) {
    case "select":
      return rockskit.Select;

    case "checkbox":
      return rockskit.Checkbox;

    case "radio":
      return rockskit.Radio;

    case "toggleSwitch":
      return rockskit.ToggleSwitch;

    case "fileUpload":
      return rockskit.FileUpload;

    case "reactSelect":
      return rockskit.ReactSelect;

    case "stepper":
      return rockskit.Stepper;

    default:
      return rockskit.Input;
  }
};

var FormRows = function FormRows(_ref) {
  var data = _ref.data,
      index = _ref.index,
      isRecurring = _ref.isRecurring,
      rows = _ref.rows,
      stepIndex = _ref.stepIndex,
      wizardData = _ref.wizardData;

  var _useFormContext = reactHookForm.useFormContext(),
      control = _useFormContext.control,
      errors = _useFormContext.errors,
      register = _useFormContext.register;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var showExpandButton = rows === null || rows === void 0 ? void 0 : rows.some(function (row) {
    return row.expandable;
  });
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, rows === null || rows === void 0 ? void 0 : rows.map(function (row, idx) {
    var _row$fields;

    var rowKey = "step-".concat(stepIndex, "-row-").concat(idx);
    var rowErrors = [];
    var showRow = row.expandable ? expanded : true;
    return /*#__PURE__*/React__default.createElement(rockskit.FormRow, {
      errors: rowErrors,
      key: rowKey,
      label: row.label,
      show: showRow
    }, row.message && /*#__PURE__*/React__default.createElement(rockskit.Alert, {
      color: row.messageColor,
      content: row.message,
      style: {
        marginBottom: 8
      }
    }), (_row$fields = row.fields) === null || _row$fields === void 0 ? void 0 : _row$fields.map(function (_ref2, fieldId) {
      var _errors$data$name$ind, _errors$name;

      var defaultValue = _ref2.defaultValue,
          name = _ref2.name,
          required = _ref2.required,
          type = _ref2.type,
          field = _objectWithoutProperties(_ref2, ["defaultValue", "name", "required", "type"]);

      var Field = mapFieldTypeToComponent(type);
      var fieldKey = "step-".concat(stepIndex, "-row-").concat(idx, "-field-").concat(fieldId);
      var fieldName = isRecurring ? "".concat(data.name, "[").concat(index, "].").concat(name) : name;
      var error = isRecurring && errors[data.name] && errors[data.name][index] ? (_errors$data$name$ind = errors[data.name][index][name]) === null || _errors$data$name$ind === void 0 ? void 0 : _errors$data$name$ind.message : (_errors$name = errors[name]) === null || _errors$name === void 0 ? void 0 : _errors$name.message;
      if (error) rowErrors.push(error);
      var prevValue = isRecurring && wizardData[data.name] && wizardData[data.name][index] ? wizardData[data.name][index][name] : wizardData[name];
      return /*#__PURE__*/React__default.createElement(Field, _extends({
        control: control,
        defaultValue: prevValue || defaultValue,
        hasError: !!error,
        isRequired: required,
        key: fieldKey,
        name: fieldName,
        register: register({
          required: required
        }),
        type: type
      }, field));
    }));
  }), showExpandButton && /*#__PURE__*/React__default.createElement(rockskit.OutlineButton, {
    color: "secondary",
    onClick: function onClick() {
      return setExpanded(function (prev) {
        return !prev;
      });
    },
    size: "sm"
  }, expanded ? "Hide Optional Params" : "Show Optional Params"));
};
FormRows.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    recurring: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  stepIndex: PropTypes.number.isRequired,
  wizardData: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  isRecurring: PropTypes.bool.isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
FormRows.defaultProps = {};

var Wrapper = styled.div.withConfig({
  displayName: "Form__Wrapper",
  componentId: "qcwv1d-0"
})(["padding:", ";background-color:", ";border:1px solid ", ";border-radius:16px;margin-bottom:16px;"], function (_ref) {
  var theme = _ref.theme;
  return theme.spacing(2, 2, 2, 6);
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.gray.light;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.palette.gray.regular;
});
var ButtonsWrapper = styled.div.withConfig({
  displayName: "Form__ButtonsWrapper",
  componentId: "qcwv1d-1"
})(["display:flex;justify-content:flex-end;margin-bottom:8px;"]);

var Form = function Form(_ref4) {
  var data = _ref4.data,
      stepIndex = _ref4.stepIndex,
      wizardData = _ref4.wizardData;
  var isRecurring = data.recurring;

  var _useFieldArray = reactHookForm.useFieldArray({
    name: isRecurring ? data === null || data === void 0 ? void 0 : data.name : ""
  }),
      fields = _useFieldArray.fields,
      append = _useFieldArray.append,
      remove = _useFieldArray.remove;

  React.useEffect(function () {
    if (fields.length === 0) {
      append();
    }
  }, []);

  var renderRows = function renderRows(index) {
    return /*#__PURE__*/React__default.createElement(FormRows, {
      data: data,
      index: index,
      isRecurring: isRecurring,
      rows: data.rows,
      stepIndex: stepIndex,
      wizardData: wizardData
    });
  };

  var renderRecurring = function renderRecurring() {
    return fields.map(function (item, idx) {
      return /*#__PURE__*/React__default.createElement(Wrapper, {
        key: item.id
      }, /*#__PURE__*/React__default.createElement(ButtonsWrapper, null, /*#__PURE__*/React__default.createElement(rockskit.OutlineButton, {
        color: "danger",
        disabled: fields.length === 1,
        onClick: function onClick() {
          return remove(idx);
        },
        size: "sm"
      }, /*#__PURE__*/React__default.createElement(rockskit.Icon, {
        icon: "trash",
        prefix: "fa"
      }))), renderRows(idx));
    });
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, isRecurring ? renderRecurring() : renderRows(), isRecurring && /*#__PURE__*/React__default.createElement(rockskit.TextButton, {
    content: "+ Add item",
    onClick: append,
    size: "sm"
  }));
};

Form.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    recurring: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  stepIndex: PropTypes.number.isRequired,
  wizardData: PropTypes.shape({}).isRequired
};
Form.defaultProps = {};

var Icons = {
  faDownload: freeSolidSvgIcons.faDownload,
  faHashtag: freeSolidSvgIcons.faHashtag,
  faTrash: freeSolidSvgIcons.faTrash
};

var MegaFlowPropTypes = {
  schema: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onFinish: PropTypes.func,
  onStepSubmit: PropTypes.func,
  wizardProps: PropTypes.shape,
  wrapperProps: PropTypes.shape
};
var MegaFlowDefaultProps = {
  onFinish: function onFinish() {}
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Wrapper$1 = styled.div.withConfig({
  displayName: "src__Wrapper",
  componentId: "rs6qhj-0"
})([""]);

var MegaFlow = function MegaFlow(_ref) {
  var schema = _ref.schema,
      onFinish = _ref.onFinish,
      onStepSubmit = _ref.onStepSubmit,
      wizardProps = _ref.wizardProps,
      wrapperProps = _ref.wrapperProps;
  // Parse if schema was type of JSON string
  var parsedSchema = typeof schema === "string" ? JSON.parse(schema) : schema;
  var steps = parsedSchema.steps;

  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      currentStep = _useState2[0],
      setCurrentStep = _useState2[1];

  var isCurrentLastStep = currentStep === steps.length - 1;

  var _useState3 = React.useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      wizardData = _useState4[0],
      setWizardData = _useState4[1];

  var methods = reactHookForm.useForm({
    mode: "onBlur",
    defaultValues: wizardData
  });

  var onSubmit = function onSubmit(data) {
    // Set step data in global wizard object
    setWizardData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), data);
    }); // Send step data to props

    if (onStepSubmit) onStepSubmit(data);

    if (!isCurrentLastStep) {
      setCurrentStep(function (prev) {
        return prev + 1;
      });
    } else {
      onFinish(wizardData);
    }
  };

  var stepsArray = steps.map(function (st) {
    return st.title;
  });

  var renderForm = function renderForm() {
    return /*#__PURE__*/React__default.createElement(Form, {
      data: steps[currentStep],
      stepIndex: currentStep,
      wizardData: wizardData
    });
  };

  return /*#__PURE__*/React__default.createElement(rockskit.AppContainer, {
    icons: _objectSpread(_objectSpread({}, rockskit.RocksKitIcons), Icons),
    theme: rockskit.RocksKitTheme
  }, /*#__PURE__*/React__default.createElement(Wrapper$1, wrapperProps, /*#__PURE__*/React__default.createElement(reactHookForm.FormProvider, methods, /*#__PURE__*/React__default.createElement("form", {
    onSubmit: methods.handleSubmit(onSubmit)
  }, /*#__PURE__*/React__default.createElement(rockskit.Wizard, _extends({
    currentStepContent: renderForm(),
    currentStepIndex: currentStep,
    setCurrentStepIndex: setCurrentStep,
    steps: stepsArray
  }, wizardProps))))));
};

MegaFlow.propTypes = MegaFlowPropTypes;
MegaFlow.defaultProps = MegaFlowDefaultProps;

module.exports = MegaFlow;
//# sourceMappingURL=megaflow.js.map
