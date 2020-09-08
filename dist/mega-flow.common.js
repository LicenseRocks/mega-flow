'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styled = _interopDefault(require('styled-components'));
var reactHookForm = require('react-hook-form');
var kit = require('@licenserocks/kit');
var PropTypes = _interopDefault(require('prop-types'));
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var mapFieldTypeToComponent = function mapFieldTypeToComponent(fieldType) {
  switch (fieldType) {
    case "select":
      return kit.Select;

    case "checkbox":
      return kit.Checkbox;

    case "radio":
      return kit.Radio;

    case "toggleSwitch":
      return kit.ToggleSwitch;

    case "fileUpload":
      return kit.FileUpload;

    case "filePond":
      return kit.FilePond;

    case "reactSelect":
      return kit.ReactSelect;

    case "stepper":
      return kit.Stepper;

    case "textArea":
      return kit.TextArea;

    default:
      return kit.Input;
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
      expanded = _useState[0],
      setExpanded = _useState[1];

  var showExpandButton = rows == null ? void 0 : rows.some(function (row) {
    return row.expandable;
  });
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, rows == null ? void 0 : rows.map(function (row, idx) {
    var _row$fields;

    var rowKey = "step-" + stepIndex + "-row-" + idx;
    var rowErrors = [];
    var showRow = row.expandable ? expanded : true;
    return /*#__PURE__*/React__default.createElement(kit.FormRow, {
      errors: rowErrors,
      key: rowKey,
      label: row.label,
      show: showRow
    }, row.message && /*#__PURE__*/React__default.createElement(kit.Alert, {
      color: row.messageColor,
      content: row.message,
      style: {
        marginBottom: 8
      }
    }), (_row$fields = row.fields) == null ? void 0 : _row$fields.map(function (_ref2, fieldId) {
      var _errors$data$name$ind, _errors$name;

      var defaultValue = _ref2.defaultValue,
          name = _ref2.name,
          required = _ref2.required,
          type = _ref2.type,
          field = _objectWithoutPropertiesLoose(_ref2, ["defaultValue", "name", "required", "type"]);

      var Field = mapFieldTypeToComponent(type);
      var fieldKey = "step-" + stepIndex + "-row-" + idx + "-field-" + fieldId;
      var fieldName = isRecurring ? data.name + "[" + index + "]." + name : name;
      var error = isRecurring && errors[data.name] && errors[data.name][index] ? (_errors$data$name$ind = errors[data.name][index][name]) == null ? void 0 : _errors$data$name$ind.message : (_errors$name = errors[name]) == null ? void 0 : _errors$name.message;
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
  }), showExpandButton && /*#__PURE__*/React__default.createElement(kit.OutlineButton, {
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

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 8px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  padding: ", ";\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 16px;\n  margin-bottom: 16px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Wrapper = styled.div(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return theme.spacing(2, 2, 2, 6);
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.gray.light;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.palette.gray.regular;
});
var ButtonsWrapper = styled.div(_templateObject2());

var Form = function Form(_ref4) {
  var data = _ref4.data,
      stepIndex = _ref4.stepIndex,
      wizardData = _ref4.wizardData;
  var isRecurring = data.recurring;

  var _useFieldArray = reactHookForm.useFieldArray({
    name: isRecurring ? data == null ? void 0 : data.name : ""
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
      }, /*#__PURE__*/React__default.createElement(ButtonsWrapper, null, /*#__PURE__*/React__default.createElement(kit.OutlineButton, {
        color: "danger",
        disabled: fields.length === 1,
        onClick: function onClick() {
          return remove(idx);
        },
        size: "sm"
      }, /*#__PURE__*/React__default.createElement(kit.Icon, {
        icon: "trash",
        prefix: "fa"
      }))), renderRows(idx));
    });
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, isRecurring ? renderRecurring() : renderRows(), isRecurring && /*#__PURE__*/React__default.createElement(kit.TextButton, {
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

var MegaFlowIcons = {
  faDownload: freeSolidSvgIcons.faDownload,
  faHashtag: freeSolidSvgIcons.faHashtag,
  faTrash: freeSolidSvgIcons.faTrash
};

var MegaFlowPropTypes = {
  icons: PropTypes.arrayOf(PropTypes.shape()),
  schema: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onFinish: PropTypes.func,
  onStepSubmit: PropTypes.func,
  wizardProps: PropTypes.shape,
  wrapperProps: PropTypes.shape
};
var MegaFlowDefaultProps = {
  icons: [],
  onFinish: function onFinish() {}
};

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose([""]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Wrapper$1 = styled.div(_templateObject$1());

var MegaFlow = function MegaFlow(_ref) {
  var icons = _ref.icons,
      schema = _ref.schema,
      onFinish = _ref.onFinish,
      onStepSubmit = _ref.onStepSubmit,
      wizardProps = _ref.wizardProps,
      wrapperProps = _ref.wrapperProps,
      props = _objectWithoutPropertiesLoose(_ref, ["icons", "schema", "onFinish", "onStepSubmit", "wizardProps", "wrapperProps"]);

  // Parse if schema was type of JSON string
  var parsedSchema = typeof schema === "string" ? JSON.parse(schema) : schema;
  var steps = parsedSchema.steps;

  var _useState = React.useState(0),
      currentStep = _useState[0],
      setCurrentStep = _useState[1];

  var isCurrentLastStep = currentStep === steps.length - 1;

  var _useState2 = React.useState({}),
      wizardData = _useState2[0],
      setWizardData = _useState2[1];

  var _useForm = reactHookForm.useForm({
    defaultValues: wizardData
  }),
      handleSubmit = _useForm.handleSubmit,
      methods = _objectWithoutPropertiesLoose(_useForm, ["handleSubmit"]);

  var onSubmit = function onSubmit(data) {
    // Set step data in global wizard object
    setWizardData(function (prev) {
      return _extends({}, prev, data);
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

  return /*#__PURE__*/React__default.createElement(kit.AppContainer, {
    icons: _extends({}, kit.RocksKitIcons, MegaFlowIcons, icons),
    theme: kit.RocksKitTheme
  }, /*#__PURE__*/React__default.createElement(Wrapper$1, wrapperProps, /*#__PURE__*/React__default.createElement(reactHookForm.FormProvider, methods, /*#__PURE__*/React__default.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React__default.createElement(kit.Wizard, _extends({
    currentStepContent: renderForm(),
    currentStepIndex: currentStep,
    setCurrentStepIndex: setCurrentStep,
    steps: stepsArray
  }, wizardProps, props))))));
};

MegaFlow.propTypes = MegaFlowPropTypes;
MegaFlow.defaultProps = MegaFlowDefaultProps;

module.exports = MegaFlow;
//# sourceMappingURL=mega-flow.common.js.map
