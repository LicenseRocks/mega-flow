'use strict';

var React = require('react');
var styled = require('styled-components');
var kit = require('@licenserocks/kit');
var reactHookForm = require('react-hook-form');
var PropTypes = require('prop-types');
require('react-masonry-css');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

var _excluded$1 = ["conditions", "defaultValue", "name", "required", "type", "options"];

var mapFieldTypeToComponent = function mapFieldTypeToComponent(fieldType) {
  switch (fieldType) {
    case "datepicker":
      return kit.FormDatepicker;

    case "select":
      return kit.Select;

    case "borderedRadio":
      return kit.BorderedRadio;

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

    case "price":
      return kit.PriceField;

    case "reactSelect":
      return kit.ReactSelect;

    case "stepper":
      return kit.Stepper;

    case "textArea":
      return kit.TextArea;

    case "itemSelect":
      return kit.ItemSelect;

    default:
      return kit.Input;
  }
};

var FormField = function FormField(_ref) {
  var data = _ref.data,
      field = _ref.field,
      hasError = _ref.hasError,
      isRecurring = _ref.isRecurring,
      recurringIndex = _ref.recurringIndex,
      stepIndex = _ref.stepIndex,
      fieldId = _ref.fieldId,
      rowId = _ref.rowId,
      stepData = _ref.stepData;
      _ref.merchandise;

  var _useFormContext = reactHookForm.useFormContext(),
      control = _useFormContext.control,
      setValue = _useFormContext.setValue,
      register = _useFormContext.register,
      watch = _useFormContext.watch;

  field.conditions;
      var defaultValue = field.defaultValue,
      name = field.name,
      required = field.required,
      type = field.type,
      options = field.options,
      others = _objectWithoutPropertiesLoose(field, _excluded$1);

  if (type === "link") return /*#__PURE__*/React__default["default"].createElement(kit.TextButton, others);
  var Field = mapFieldTypeToComponent(type);
  var fieldKey = "step-" + stepIndex + "-row-" + rowId + "-field-" + fieldId;
  var fieldName = isRecurring ? data.name + "[" + recurringIndex + "]." + name : name;
  var prevValue = isRecurring && stepData[data.name] && stepData[data.name][recurringIndex] ? stepData[data.name][recurringIndex][name] : stepData[name];

  if ((field == null ? void 0 : field.currencies) !== undefined) {
    field.currencies = stepData == null ? void 0 : stepData.currencies;
  }

  return /*#__PURE__*/React__default["default"].createElement(Field, _extends({
    control: control,
    defaultValue: prevValue || defaultValue,
    hasError: hasError,
    isRequired: required,
    key: fieldKey,
    name: fieldName,
    register: register({
      required: required
    }),
    setValue: setValue,
    options: options,
    type: type,
    value: watch(fieldName)
  }, others));
};
FormField.propTypes = {
  data: PropTypes__default["default"].shape({
    name: PropTypes__default["default"].string,
    recurring: PropTypes__default["default"].bool,
    rows: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({}))
  }).isRequired,
  field: PropTypes__default["default"].shape({
    conditions: PropTypes__default["default"].arrayOf(PropTypes__default["default"].string),
    defaultValue: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].object]),
    name: PropTypes__default["default"].string,
    required: PropTypes__default["default"].string,
    type: PropTypes__default["default"].string
  }).isRequired,
  fieldId: PropTypes__default["default"].number.isRequired,
  hasError: PropTypes__default["default"].bool.isRequired,
  isRecurring: PropTypes__default["default"].bool.isRequired,
  recurringIndex: PropTypes__default["default"].number,
  stepIndex: PropTypes__default["default"].number.isRequired,
  stepData: PropTypes__default["default"].shape({}).isRequired,
  rowId: PropTypes__default["default"].number.isRequired
};
FormField.defaultProps = {
  recurringIndex: null
};

var getConditionValues = function getConditionValues(conditions, watch, wizardData, isRecurring, recurringName) {
  var name = conditions.map(function (c) {
    if (c.includes(":")) {
      var _c$split = c.split(":"),
          n = _c$split[0];

      return n;
    }

    return c;
  });
  return watch(isRecurring ? [recurringName] : name, wizardData);
};

var checkCondition = function checkCondition(conditions, watch, wizardData, isRecurring, recurringName, recurringIndex) {
  var hasConditions = conditions && conditions.length > 0;

  if (hasConditions) {
    var _conditionValues$recu;

    var conditionValues = getConditionValues(conditions, watch, wizardData, isRecurring, recurringName);
    var target = isRecurring ? conditionValues == null ? void 0 : (_conditionValues$recu = conditionValues[recurringName]) == null ? void 0 : _conditionValues$recu[recurringIndex] : conditionValues;

    if (conditionValues && target) {
      return conditions.some(function (c) {
        var _target$c;

        if (c.includes(":")) {
          var _target$name;

          var _c$split2 = c.split(":"),
              name = _c$split2[0],
              value = _c$split2[1],
              not = _c$split2[2];

          var isTrue = target[name] === value || Array.isArray(value) && ((_target$name = target[name]) == null ? void 0 : _target$name.includes(value)) || value === "true" && Boolean(target[name]);
          if (not) return !isTrue;
          return isTrue;
        }

        return ((_target$c = target[c]) == null ? void 0 : _target$c.length) > 0 || !!target[c];
      });
    }
  }

  return true;
};

var StyledRow = styled__default["default"](kit.FormRow).withConfig({
  displayName: "FormRows__StyledRow",
  componentId: "sc-1knzxbr-0"
})(["&&{label{:only-child{display:none;}}}background-color:", ";&&{", "}"], function (_ref) {
  var theme = _ref.theme;
  return theme.palette.gray.light;
}, function (_ref2) {
  var backgroundStyle = _ref2.backgroundStyle;
  return backgroundStyle === "primary" && styled.css(["background-color:", ";"], function (_ref3) {
    var theme = _ref3.theme;
    return theme.palette.common.white;
  });
});
var StyledDivider = styled__default["default"](kit.Divider).withConfig({
  displayName: "FormRows__StyledDivider",
  componentId: "sc-1knzxbr-1"
})(["&&{", "}"], function (_ref4) {
  var backgroundStyle = _ref4.backgroundStyle;
  return backgroundStyle === "primary" && styled.css(["background-color:", ";"], function (_ref5) {
    var theme = _ref5.theme;
    return theme.palette.common.white;
  });
});
var Hint = styled__default["default"].span.withConfig({
  displayName: "FormRows__Hint",
  componentId: "sc-1knzxbr-2"
})(["background:#f0f0f4;border-radius:100%;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;margin-left:8px;vertical-align:middle;svg{color:#8685a6;font-size:10px;}"]);
var FormRows = function FormRows(_ref6) {
  var data = _ref6.data,
      index = _ref6.index,
      isRecurring = _ref6.isRecurring,
      rows = _ref6.rows,
      stepIndex = _ref6.stepIndex,
      stepData = _ref6.stepData,
      merchandise = _ref6.merchandise;

  var _useFormContext = reactHookForm.useFormContext(),
      errors = _useFormContext.errors,
      watch = _useFormContext.watch;

  var _useState = React.useState(false),
      expanded = _useState[0],
      setExpanded = _useState[1];

  var showExpandButton = rows == null ? void 0 : rows.some(function (row) {
    return row.expandable;
  });
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, rows == null ? void 0 : rows.map(function (row, idx) {
    var _row$marginBottom, _row$fields;

    var rowKey = "step-" + stepIndex + "-row-" + idx;
    var rowErrors = [];
    var rowConditions = checkCondition(row.conditions, watch, stepData, isRecurring, data.name, index);
    if (!rowConditions) return null;
    if (row != null && row.heading) return /*#__PURE__*/React__default["default"].createElement(kit.H4, {
      content: row == null ? void 0 : row.heading,
      px: 4,
      mt: 4,
      mb: 2
    });
    var showRow = row.expandable ? expanded : true;
    var label = [].concat(row.label || []);
    if (row.hint) label.push( /*#__PURE__*/React__default["default"].createElement(kit.Tooltip, {
      content: row.hint,
      contentProps: {
        fontStyle: "normal"
      }
    }, /*#__PURE__*/React__default["default"].createElement(Hint, null, /*#__PURE__*/React__default["default"].createElement(kit.Icon, {
      icon: "question"
    }))));
    return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
      key: rowKey
    }, /*#__PURE__*/React__default["default"].createElement(StyledRow, {
      errors: rowErrors,
      label: label.length > 0 ? label : null,
      labelAlign: row.labelAlign,
      labelGutter: row.labelGutter,
      mb: 0,
      pb: (_row$marginBottom = row == null ? void 0 : row.marginBottom) != null ? _row$marginBottom : 4,
      pt: 4,
      px: 16,
      show: showRow,
      backgroundStyle: row == null ? void 0 : row.backgroundStyle
    }, row.message && /*#__PURE__*/React__default["default"].createElement(kit.Alert, {
      color: row.messageColor,
      content: row.message,
      mb: 2
    }), (_row$fields = row.fields) == null ? void 0 : _row$fields.map(function (field, fieldId) {
      var _errors$data$name$ind, _errors$field$name;

      var error = isRecurring && errors[data.name] && errors[data.name][index] ? (_errors$data$name$ind = errors[data.name][index][field.name]) == null ? void 0 : _errors$data$name$ind.message : (_errors$field$name = errors[field.name]) == null ? void 0 : _errors$field$name.message;
      if (error) rowErrors.push(error);
      var showIfHasCondition = checkCondition(field.conditions, watch, stepData, isRecurring, data.name, index);
      if (!showIfHasCondition) return null;
      return /*#__PURE__*/React__default["default"].createElement(FormField, {
        data: data,
        field: field,
        fieldId: fieldId,
        hasError: !!error,
        isRecurring: isRecurring,
        recurringIndex: index,
        rowId: idx,
        stepIndex: stepIndex,
        stepData: stepData,
        merchandise: (field == null ? void 0 : field.name) === "selectMerchIds" ? merchandise : null
      });
    })), (row == null ? void 0 : row.divider) && /*#__PURE__*/React__default["default"].createElement(StyledDivider, {
      backgroundStyle: row == null ? void 0 : row.backgroundStyle,
      py: row == null ? void 0 : row.dividerSize,
      px: 5,
      m: 0,
      pb: 4
    }));
  }), showExpandButton && /*#__PURE__*/React__default["default"].createElement(kit.OutlineButton, {
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
  data: PropTypes__default["default"].shape({
    name: PropTypes__default["default"].string,
    recurring: PropTypes__default["default"].bool,
    rows: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({}))
  }).isRequired,
  stepIndex: PropTypes__default["default"].number.isRequired,
  stepData: PropTypes__default["default"].shape({}).isRequired,
  index: PropTypes__default["default"].number.isRequired,
  isRecurring: PropTypes__default["default"].bool.isRequired,
  rows: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({})).isRequired
};
FormRows.defaultProps = {};

var Wrapper$1 = styled__default["default"].div.withConfig({
  displayName: "Form__Wrapper",
  componentId: "sc-11kuada-0"
})(["padding:", ";background-color:", ";border:1px solid ", ";border-radius:16px;margin:", ";&&{", "}"], function (_ref) {
  var theme = _ref.theme;
  return theme.spacing(2, 2, 2, 6);
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.gray.light;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.palette.gray.regular;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.spacing(5);
}, function (_ref5) {
  var disabled = _ref5.disabled;
  return disabled && styled.css(["opacity:0.5;cursor:not-allowed !important;pointer-events:none;"]);
});
var ButtonsWrapper = styled__default["default"].div.withConfig({
  displayName: "Form__ButtonsWrapper",
  componentId: "sc-11kuada-1"
})(["display:flex;align-items:center;justify-content:flex-end;margin-bottom:8px;"]);

var Form = function Form(_ref6) {
  var data = _ref6.data,
      defaultValues = _ref6.defaultValues,
      stepIndex = _ref6.stepIndex,
      stepFormData = _ref6.stepFormData,
      merchandise = _ref6.merchandise;
  var isRecurring = data.recurring;

  var _useFieldArray = reactHookForm.useFieldArray({
    name: isRecurring ? data == null ? void 0 : data.name : ""
  }),
      fields = _useFieldArray.fields,
      append = _useFieldArray.append,
      remove = _useFieldArray.remove;

  var renderRows = function renderRows(index) {
    return /*#__PURE__*/React__default["default"].createElement(FormRows, {
      data: data,
      index: index,
      isRecurring: isRecurring,
      rows: data.rows,
      stepIndex: stepIndex,
      stepData: stepFormData,
      merchandise: merchandise
    });
  };

  var renderRecurring = function renderRecurring() {
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, fields.map(function (item, idx) {
      var _defaultValues$data$n, _defaultValues$data$n2;

      var disabled = defaultValues == null ? void 0 : (_defaultValues$data$n = defaultValues[data.name]) == null ? void 0 : (_defaultValues$data$n2 = _defaultValues$data$n[idx]) == null ? void 0 : _defaultValues$data$n2.disabled;
      return /*#__PURE__*/React__default["default"].createElement(Wrapper$1, {
        key: item.id,
        disabled: disabled
      }, /*#__PURE__*/React__default["default"].createElement(ButtonsWrapper, null, disabled && /*#__PURE__*/React__default["default"].createElement(kit.Alert, {
        content: "This is a default item and can't be removed/changed.",
        mr: 2
      }), /*#__PURE__*/React__default["default"].createElement(kit.OutlineButton, {
        color: "danger",
        disabled: disabled,
        onClick: function onClick() {
          return remove(idx);
        },
        size: "sm"
      }, /*#__PURE__*/React__default["default"].createElement(kit.Icon, {
        icon: "trash",
        prefix: "fa"
      }))), renderRows(idx));
    }), /*#__PURE__*/React__default["default"].createElement(kit.TextButton, {
      content: "+ Add item",
      onClick: append,
      size: "sm"
    }));
  };

  return isRecurring ? renderRecurring() : renderRows();
};

Form.propTypes = {
  data: PropTypes__default["default"].shape({
    name: PropTypes__default["default"].string,
    recurring: PropTypes__default["default"].bool,
    rows: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({}))
  }).isRequired,
  stepIndex: PropTypes__default["default"].number.isRequired,
  stepFormData: PropTypes__default["default"].shape({})
};
Form.defaultProps = {
  stepFormData: {}
};

var MegaFlowIcons = {
  faDownload: freeSolidSvgIcons.faDownload,
  faHashtag: freeSolidSvgIcons.faHashtag,
  faTrash: freeSolidSvgIcons.faTrash
};

var MegaFlowPropTypes = {
  defaultValues: PropTypes__default["default"].shape({}),
  icons: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape()),
  schema: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].object]).isRequired,
  onFinish: PropTypes__default["default"].func,
  onStepSubmit: PropTypes__default["default"].func,
  renderActionButtons: PropTypes__default["default"].func,
  theme: PropTypes__default["default"].shape(),
  watcher: PropTypes__default["default"].func,
  watchList: PropTypes__default["default"].arrayOf(PropTypes__default["default"].string),
  wizardProps: PropTypes__default["default"].shape(),
  wrapperProps: PropTypes__default["default"].shape()
};
var MegaFlowDefaultProps = {
  defaultValues: {},
  icons: [],
  onFinish: function onFinish() {},
  renderActionButtons: function renderActionButtons() {},
  watchList: []
};

var _excluded = ["defaultValues", "icons", "schema", "onFinish", "onStepSubmit", "renderActionButtons", "theme", "watcher", "livePreview", "wizardProps", "wrapperProps"],
    _excluded2 = ["formState", "getValues", "handleSubmit"];
var Wrapper = styled__default["default"].div.withConfig({
  displayName: "src__Wrapper",
  componentId: "sc-osiobx-0"
})(["background-color:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.palette.gray.light;
});

var getOutputData = function getOutputData(output) {
  return Object.values(output).reduce(function (obj, acc) {
    return _extends({}, obj, acc);
  }, {});
};

var getHiddenValues = function getHiddenValues(array, key) {
  var initialValue = {};
  return array.reduce(function (obj, item) {
    var _extends2;

    return _extends({}, obj, (_extends2 = {}, _extends2[item["name"]] = item == null ? void 0 : item.value, _extends2));
  }, initialValue);
};

var MegaFlow = function MegaFlow(_ref2) {
  var defaultValues = _ref2.defaultValues,
      icons = _ref2.icons,
      schema = _ref2.schema,
      onFinish = _ref2.onFinish,
      onStepSubmit = _ref2.onStepSubmit,
      _renderActionButtons = _ref2.renderActionButtons,
      theme = _ref2.theme,
      watcher = _ref2.watcher,
      livePreview = _ref2.livePreview,
      wizardProps = _ref2.wizardProps,
      wrapperProps = _ref2.wrapperProps,
      props = _objectWithoutPropertiesLoose(_ref2, _excluded);

  // Parse if schema was type of JSON string
  var parsedSchema = typeof schema === "string" ? JSON.parse(schema) : schema;
  var steps = parsedSchema.steps,
      hiddenValues = parsedSchema.hiddenValues;

  var _useState = React.useState(0),
      currentStep = _useState[0],
      setCurrentStep = _useState[1];

  var isCurrentLastStep = currentStep === steps.length - 1;

  var _useState2 = React.useState({}),
      wizardData = _useState2[0],
      setWizardData = _useState2[1];

  var _useState3 = React.useState({}),
      hiddenData = _useState3[0],
      setHiddenData = _useState3[1];

  var _useForm = reactHookForm.useForm();
      _useForm.formState;
      var getValues = _useForm.getValues,
      handleSubmit = _useForm.handleSubmit,
      methods = _objectWithoutPropertiesLoose(_useForm, _excluded2);

  var stepFormData = wizardData[currentStep] || defaultValues;
  React.useEffect(function () {
    methods.reset(stepFormData); // set hidden values to include in output, without displaying

    if (hiddenValues && currentStep === 0) {
      setHiddenData(getHiddenValues(hiddenValues));
    }

    if (watcher) {
      watcher(getOutputData(wizardData));
    }
  }, [currentStep]);

  var onSubmit = function onSubmit(data) {
    var _extends3;

    var currentState = _extends({
      hiddenData: hiddenData
    }, wizardData, (_extends3 = {}, _extends3[currentStep] = data, _extends3)); // Set step data in global wizard object


    setWizardData(currentState); // Send step data to props

    if (onStepSubmit) onStepSubmit(data);

    if (!isCurrentLastStep) {
      setCurrentStep(function (prev) {
        return prev + 1;
      });
    } else {
      onFinish(getOutputData(currentState));
    }
  };

  var stepsArray = steps.map(function (st) {
    return {
      title: st.title
    };
  });

  var renderForm = function renderForm() {
    return /*#__PURE__*/React__default["default"].createElement(Form, {
      data: steps[currentStep],
      key: currentStep,
      stepIndex: currentStep,
      stepFormData: stepFormData,
      defaultValues: defaultValues,
      merchandise: props.merchandise
    });
  };

  return /*#__PURE__*/React__default["default"].createElement(kit.AppContainer, {
    icons: _extends({}, kit.RocksKitIcons, MegaFlowIcons, icons),
    theme: theme || kit.RocksKitTheme()
  }, /*#__PURE__*/React__default["default"].createElement(Wrapper, wrapperProps, /*#__PURE__*/React__default["default"].createElement("form", {
    onBlur: function onBlur(event) {
      event.preventDefault();
      var values = getValues();
      var data = Object.assign(values, hiddenData);

      if (livePreview) {
        livePreview(data);
      }
    },
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React__default["default"].createElement(reactHookForm.FormProvider, methods, /*#__PURE__*/React__default["default"].createElement(kit.Wizard, _extends({
    currentStepContent: renderForm(),
    currentStepIndex: currentStep,
    renderActionButtons: function renderActionButtons() {
      return _renderActionButtons(getOutputData(wizardData));
    },
    setCurrentStepIndex: setCurrentStep,
    steps: stepsArray,
    backgroundStyle: "primary"
  }, wizardProps, props))))));
};

MegaFlow.propTypes = MegaFlowPropTypes;
MegaFlow.defaultProps = MegaFlowDefaultProps;

module.exports = MegaFlow;
//# sourceMappingURL=mega-flow.common.js.map
