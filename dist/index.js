import React, { useState, useEffect, useRef, createRef } from 'react';
import PropTypes, { bool, func, oneOf } from 'prop-types';
import styled, { ThemeProvider, css } from 'styled-components';
import { Controller, useFormContext, useFieldArray, useForm, FormProvider } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import { Transition } from 'react-transition-group';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faBox, faCertificate, faCheck, faDownload, faGlobe, faHashtag, faHistory, faInfoCircle, faMinus, faParagraph, faPlus, faTimes, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var handleScroll = function handleScroll(el) {
  var slider = el;
  var isDown = false;
  var startX;
  var sl;
  slider.addEventListener("mousedown", function (e) {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    sl = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", function () {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", function () {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", function (e) {
    if (!isDown) return;
    e.preventDefault();
    slider.classList.add("active");
    var x = e.pageX - slider.offsetLeft;
    var walk = x - startX;
    slider.scrollLeft = sl - walk;
  });
};

var theme = (function () {
  return {
    colors: {
      primary: {
        main: "#AC00fC",
        light: "#F5E0FF"
      },
      gray: {
        dark: "#4D4B63",
        regular: "#CECDD9",
        medium: "#8685A6",
        light: "#F7F7F9",
        semiLight: "#F0F0F4"
      },
      alert: {
        darkRed: "#FE3118",
        lightRed: "#FFD6D1",
        darkGreen: "#6AD19C",
        lightGreen: "#DFF8E3",
        lightYellow: "#FFF3A2"
      },
      black: "#292839",
      white: "#FFFFFF"
    }
  };
});

var withWrapper = (function (WrappedComponent) {
  return function (props) {
    return /*#__PURE__*/React.createElement(ThemeProvider, {
      theme: theme
    }, /*#__PURE__*/React.createElement(WrappedComponent, props));
  };
});

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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var StyledButton = styled.button.withConfig({
  displayName: "Button__StyledButton",
  componentId: "ubs93k-0"
})(["box-sizing:border-box;font-style:normal;font-weight:bold;font-size:16px;line-height:120%;text-transform:uppercase;border-radius:12px;background-color:", ";padding:8px;color:#fff;border:none;cursor:pointer;outline:none;user-select:none;transition:all 100ms ease-in-out;min-width:40px;min-height:40px;:hover{opacity:0.7;}:disabled{opacity:0.3;cursor:not-allowed;pointer-events:none;}", " ", " ", " ", ""], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.primary.main;
}, function (_ref2) {
  var color = _ref2.color,
      theme = _ref2.theme;
  return color === "danger" && css(["background-color:", ";color:", ";"], theme.colors.alert.lightRed, theme.colors.alert.darkRed);
}, function (_ref3) {
  var size = _ref3.size;
  return size === "sm" && css(["min-width:24px;min-height:24px;padding:8px;font-size:12px;"]);
}, function (_ref4) {
  var outline = _ref4.outline;
  return outline && css(["background-color:", ";color:", ";border:1px solid ", ";"], function (_ref5) {
    var theme = _ref5.theme;
    return theme.colors.white;
  }, function (_ref6) {
    var theme = _ref6.theme;
    return theme.colors.gray.dark;
  }, function (_ref7) {
    var theme = _ref7.theme;
    return theme.colors.gray.dark;
  });
}, function (_ref8) {
  var text = _ref8.text;
  return text && css(["background-color:", ";color:", ";border:none;"], function (_ref9) {
    var theme = _ref9.theme;
    return theme.colors.white;
  }, function (_ref10) {
    var theme = _ref10.theme;
    return theme.colors.primary.main;
  });
});
var Button = function Button(_ref11) {
  var content = _ref11.content,
      children = _ref11.children,
      props = _objectWithoutProperties(_ref11, ["content", "children"]);

  return /*#__PURE__*/React.createElement(StyledButton, props, content || children);
};
Button.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node,
  color: PropTypes.oneOf(["primary", "danger"]),
  type: PropTypes.string
};
Button.defaultProps = {
  content: null,
  children: null,
  color: "primary",
  type: "button"
};

var StyledFieldset = styled.fieldset.withConfig({
  displayName: "Fieldset__StyledFieldset",
  componentId: "sc-1e8hdu4-0"
})(["border:none;padding:0%;margin:0;"]);
var Fieldset = function Fieldset(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(StyledFieldset, null, children);
};
Fieldset.propTypes = {
  children: PropTypes.node.isRequired
};
Fieldset.defaultProps = {};

var StyledWrapper = styled.div.withConfig({
  displayName: "FieldWrapper__StyledWrapper",
  componentId: "sc-69v60m-0"
})(["display:flex;align-items:center;justify-content:space-between;border-radius:12px;background-color:", ";border:1px solid ", ";padding:0 16px;color:", ";outline:none;height:40px;box-sizing:border-box;transition:all 100ms ease-in-out;:not(:last-child){margin-right:16px;}&:focus-within{border:1px solid ", ";}&:read-only{border:1px solid ", ";cursor:not-allowed;}svg{color:", ";}", " ", " ", ""], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.white;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.gray.regular;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.black;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.colors.primary.main;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.colors.gray.regular;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.colors.gray.regular;
}, function (_ref7) {
  var disabled = _ref7.disabled;
  return disabled && css(["opacity:0.3;cursor:not-allowed;pointer-events:none;"]);
}, function (_ref8) {
  var hasError = _ref8.hasError;
  return hasError && css(["border:1px solid ", ";"], function (_ref9) {
    var theme = _ref9.theme;
    return theme.colors.alert.darkRed;
  });
}, function (_ref10) {
  var block = _ref10.block;
  return block && css(["flex:1;"]);
});

var FieldWrapper = function FieldWrapper(_ref11) {
  var children = _ref11.children,
      endIcon = _ref11.endIcon,
      startIcon = _ref11.startIcon,
      props = _objectWithoutProperties(_ref11, ["children", "endIcon", "startIcon"]);

  return /*#__PURE__*/React.createElement(StyledWrapper, props, startIcon && /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: startIcon
  }), children, endIcon && /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: endIcon
  }));
};

FieldWrapper.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node.isRequired,
  endIcon: PropTypes.string,
  startIcon: PropTypes.string
};
FieldWrapper.defaultProps = {
  block: true,
  endIcon: "",
  startIcon: ""
};

var Check = "<svg width=\"16\" height=\"12\" viewBox=\"0 0 16 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M13.5938 0.625L5.375 8.84375L2.375 5.8125C2.21875 5.6875 1.96875 5.6875 1.84375 5.8125L0.9375 6.71875C0.8125 6.84375 0.8125 7.09375 0.9375 7.25L5.125 11.4062C5.28125 11.5625 5.5 11.5625 5.65625 11.4062L15.0312 2.03125C15.1562 1.90625 15.1562 1.65625 15.0312 1.5L14.125 0.625C14 0.46875 13.75 0.46875 13.5938 0.625Z\" fill=\"white\"/>\n</svg>";

var StyledInput = styled.input.withConfig({
  displayName: "RadioAndCheckboxWrapper__StyledInput",
  componentId: "sc-1rq3qaj-0"
})(["display:none;+ label{display:inline-flex;align-items:center;font-weight:600;font-size:14px;line-height:120%;margin:0 32px 0 0;cursor:pointer;transition:all 0.1s ease-in-out;", " &::before{content:\"\";display:inline-block;width:24px;height:24px;border-radius:", ";background-color:", ";border:1px solid ", ";margin-right:8px;transition:all 0.1s ease-in-out;", "}&:hover{&::before{background-color:", ";border-color:", ";}}}&:checked + label::before{background-color:", ";border-color:", ";background-image:url(", ");background-size:16px 16px;background-repeat:no-repeat;background-position:center;}&:disabled + label{opacity:0.3;&,span{cursor:default;}}"], function (_ref) {
  var stacked = _ref.stacked;
  return stacked && css(["display:flex;:not(:last-child){margin:0 0 24px 0;}"]);
}, function (_ref2) {
  var type = _ref2.type;
  return type === "radio" ? "50%" : "8px";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.white;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.colors.gray.regular;
}, function (_ref5) {
  var hasError = _ref5.hasError;
  return hasError && css(["border-color:", ";"], function (_ref6) {
    var theme = _ref6.theme;
    return theme.colors.alert.darkRed;
  });
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.colors.primary.main;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.colors.primary.main;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.colors.primary.main;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.colors.primary.main;
}, "".concat(Check));
var StyledLabel = styled.label.withConfig({
  displayName: "RadioAndCheckboxWrapper__StyledLabel",
  componentId: "sc-1rq3qaj-1"
})([""]);

var RadioAndCheckboxWrapper = function RadioAndCheckboxWrapper(_ref11) {
  var defaultValue = _ref11.defaultValue,
      hasError = _ref11.hasError,
      label = _ref11.label,
      name = _ref11.name,
      register = _ref11.register,
      stacked = _ref11.stacked,
      type = _ref11.type,
      value = _ref11.value,
      props = _objectWithoutProperties(_ref11, ["defaultValue", "hasError", "label", "name", "register", "stacked", "type", "value"]);

  var id = "".concat(name, "-").concat(value);
  var defaultChecked = type === "checkbox" ? defaultValue.includes(value) : defaultValue === value;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StyledInput, _extends({
    defaultChecked: defaultChecked,
    hasError: hasError,
    id: id,
    name: name,
    ref: register,
    stacked: stacked,
    type: type,
    value: value
  }, props)), /*#__PURE__*/React.createElement(StyledLabel, {
    htmlFor: id
  }, label));
};

RadioAndCheckboxWrapper.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  hasError: PropTypes.bool,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  stacked: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
RadioAndCheckboxWrapper.defaultProps = {
  defaultValue: "",
  hasError: false,
  stacked: true
};

var Checkbox = function Checkbox(_ref) {
  var name = _ref.name,
      options = _ref.options,
      register = _ref.register,
      stacked = _ref.stacked,
      props = _objectWithoutProperties(_ref, ["name", "options", "register", "stacked"]);

  return /*#__PURE__*/React.createElement(Fieldset, null, options.map(function (opt) {
    return /*#__PURE__*/React.createElement(RadioAndCheckboxWrapper, _extends({
      value: opt.value,
      key: opt.value,
      label: opt.label,
      name: name,
      register: register,
      stacked: stacked,
      type: "checkbox"
    }, props));
  }));
};
Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })).isRequired,
  register: PropTypes.func.isRequired,
  stacked: PropTypes.bool
};
Checkbox.defaultProps = {
  stacked: true
};

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

/* eslint-disable no-restricted-properties */
var Item = styled.div.withConfig({
  displayName: "DropzonePreview__Item",
  componentId: "sc-1yz5mg-0"
})(["display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background-color:", ";color:", ";font-size:12px;margin-bottom:8px;border-radius:8px;"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.alert.darkGreen;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.white;
});
var RemoveIcon = styled.button.attrs(function () {
  return {
    type: "button"
  };
}).withConfig({
  displayName: "DropzonePreview__RemoveIcon",
  componentId: "sc-1yz5mg-1"
})(["background:unset;border:none;cursor:pointer;outline:none;user-select:none;color:", ";"], function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.white;
});

function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return "".concat(Math.round(bytes / Math.pow(1024, i), 2), " ").concat(sizes[i]);
}

var DropzonePreview = function DropzonePreview(_ref4) {
  var files = _ref4.files,
      onRemoveClick = _ref4.onRemoveClick;
  return files.map(function (file) {
    return /*#__PURE__*/React.createElement(Item, {
      key: file.name
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, file.name), /*#__PURE__*/React.createElement("div", null, bytesToSize(file.size))), /*#__PURE__*/React.createElement(RemoveIcon, {
      onClick: onRemoveClick
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: "times"
    })));
  });
};
DropzonePreview.propTypes = {
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  onRemoveClick: PropTypes.func.isRequired
};
DropzonePreview.defaultProps = {
  files: []
};

var StyledContainer = styled.div.withConfig({
  displayName: "Dropzone__StyledContainer",
  componentId: "cg1gjg-0"
})(["width:100%;height:100%;"]);
var DropzoneArea = styled.div.withConfig({
  displayName: "Dropzone__DropzoneArea",
  componentId: "cg1gjg-1"
})(["background-color:", ";border-color:", ";border-radius:16px;border-style:dashed;border-width:2px;cursor:pointer;min-height:125px;outline:none;transition:all 100ms ease-in-out;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:", ";margin-bottom:8px;&:hover{border-color:", ";}", " ", " ", ""], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.gray.semiLight;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.gray.regular;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.black;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.colors.gray.medium;
}, function (_ref5) {
  var hasError = _ref5.hasError;
  return hasError && css(["border-color:", ";background-color:", ";"], function (_ref6) {
    var theme = _ref6.theme;
    return theme.colors.alert.darkRed;
  }, function (_ref7) {
    var theme = _ref7.theme;
    return theme.colors.alert.lightRed;
  });
}, function (_ref8) {
  var disabled = _ref8.disabled;
  return disabled && css(["opacity:0.3;cursor:not-allowed;pointer-events:none;"]);
}, function (_ref9) {
  var dragActive = _ref9.dragActive,
      theme = _ref9.theme;
  return dragActive && css(["border-color:", ";"], theme.colors.gray.medium);
});
var Dropzone = function Dropzone(_ref10) {
  var accept = _ref10.accept,
      disabled = _ref10.disabled,
      defaultValue = _ref10.defaultValue,
      hasError = _ref10.hasError,
      multiple = _ref10.multiple,
      onChange = _ref10.onChange;

  var _useState = useState(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      files = _useState2[0],
      setFiles = _useState2[1];

  useEffect(function () {
    return function () {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(function (file) {
        return URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  var _useDropzone = useDropzone({
    accept: accept,
    disabled: disabled,
    multiple: multiple,
    onDrop: function onDrop(acceptedFiles) {
      var accepted = acceptedFiles.map(function (file) {
        return Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
      });
      setFiles(accepted);

      if (onChange) {
        onChange(accepted);
      }
    }
  }),
      getRootProps = _useDropzone.getRootProps,
      getInputProps = _useDropzone.getInputProps,
      isDragActive = _useDropzone.isDragActive,
      isDragAccept = _useDropzone.isDragAccept,
      isDragReject = _useDropzone.isDragReject;

  var removeFile = function removeFile(file) {
    var newFiles = _toConsumableArray(files);

    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);

    if (onChange) {
      onChange(newFiles);
    }
  };

  return /*#__PURE__*/React.createElement(StyledContainer, null, /*#__PURE__*/React.createElement(DropzoneArea, _extends({
    dragActive: isDragActive,
    dragAccept: isDragAccept,
    dragReject: isDragReject,
    disabled: disabled,
    hasError: hasError
  }, getRootProps()), /*#__PURE__*/React.createElement("input", getInputProps()), isDragAccept && /*#__PURE__*/React.createElement("p", null, "Accepted"), isDragReject && /*#__PURE__*/React.createElement("p", null, "Rejected"), isDragActive ? /*#__PURE__*/React.createElement("p", null, "Drop here") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "Drop, or click to select"), multiple ? /*#__PURE__*/React.createElement("p", null, "Accepts multiple files") : /*#__PURE__*/React.createElement("p", null, "Single file only"))), /*#__PURE__*/React.createElement(DropzonePreview, {
    files: files,
    onRemoveClick: removeFile
  }));
};
Dropzone.propTypes = {
  accept: PropTypes.string,
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  disabled: PropTypes.bool,
  hasError: PropTypes.bool,
  multiple: PropTypes.bool,
  onChange: PropTypes.func
};
Dropzone.defaultProps = {
  accept: "image/*",
  defaultValue: [],
  disabled: false,
  hasError: false,
  multiple: true,
  onChange: function onChange() {}
};

var FileUpload = function FileUpload(_ref) {
  var control = _ref.control,
      defaultValue = _ref.defaultValue,
      isRequired = _ref.isRequired,
      name = _ref.name,
      props = _objectWithoutProperties(_ref, ["control", "defaultValue", "isRequired", "name"]);

  return /*#__PURE__*/React.createElement(Controller, {
    as: /*#__PURE__*/React.createElement(Dropzone, _extends({
      defaultValue: defaultValue
    }, props)),
    control: control,
    defaultValue: defaultValue,
    name: name,
    rules: {
      required: isRequired
    }
  });
};
FileUpload.propTypes = {
  control: PropTypes.shape({}).isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  isRequired: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
FileUpload.defaultProps = {
  defaultValue: undefined
};

var StyledInput$1 = styled.input.withConfig({
  displayName: "Input__StyledInput",
  componentId: "sc-18vh4ab-0"
})(["flex:1;font-weight:600;font-size:14px;line-height:120%;padding:8px;color:", ";outline:none;border:none;height:100%;box-sizing:border-box;transition:all 100ms ease-in-out;::placeholder{font-weight:normal;}&:read-only{cursor:not-allowed;}", " ", ""], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.black;
}, function (_ref2) {
  var hasError = _ref2.hasError;
  return hasError && css(["::placeholder{color:", ";}color:", ";"], function (_ref3) {
    var theme = _ref3.theme;
    return theme.colors.alert.darkRed;
  }, function (_ref4) {
    var theme = _ref4.theme;
    return theme.colors.alert.darkRed;
  });
}, function (_ref5) {
  var block = _ref5.block;
  return block && css(["width:100%;"]);
});

var Input = function Input(_ref6) {
  var block = _ref6.block,
      endIcon = _ref6.endIcon,
      disabled = _ref6.disabled,
      hasError = _ref6.hasError,
      register = _ref6.register,
      startIcon = _ref6.startIcon,
      props = _objectWithoutProperties(_ref6, ["block", "endIcon", "disabled", "hasError", "register", "startIcon"]);

  return /*#__PURE__*/React.createElement(FieldWrapper, {
    disabled: disabled,
    endIcon: endIcon,
    hasError: hasError,
    startIcon: startIcon
  }, /*#__PURE__*/React.createElement(StyledInput$1, _extends({
    block: block,
    hasError: hasError,
    ref: register
  }, props)));
};

Input.propTypes = {
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  endIcon: PropTypes.string,
  hasError: PropTypes.bool,
  register: PropTypes.func.isRequired,
  startIcon: PropTypes.string
};
Input.defaultProps = {
  block: true,
  disabled: false,
  endIcon: "",
  hasError: false,
  startIcon: ""
};

var StyledLabel$1 = styled.label.withConfig({
  displayName: "Label__StyledLabel",
  componentId: "sc-637dl9-0"
})(["font-size:14px;line-height:120%;color:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.gray.medium;
});
var Label = function Label(props) {
  return /*#__PURE__*/React.createElement(StyledLabel$1, props);
};
Label.propTypes = {};
Label.defaultProps = {};

var Radio = function Radio(_ref) {
  var name = _ref.name,
      options = _ref.options,
      register = _ref.register,
      stacked = _ref.stacked,
      props = _objectWithoutProperties(_ref, ["name", "options", "register", "stacked"]);

  return /*#__PURE__*/React.createElement(Fieldset, null, options.map(function (opt) {
    return /*#__PURE__*/React.createElement(RadioAndCheckboxWrapper, _extends({
      value: opt.value,
      key: opt.value,
      label: opt.label,
      name: name,
      register: register,
      stacked: stacked,
      type: "radio"
    }, props));
  }));
};
Radio.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })).isRequired,
  register: PropTypes.func.isRequired,
  stacked: PropTypes.bool
};
Radio.defaultProps = {
  stacked: true
};

var StyledSelect = styled.select.withConfig({
  displayName: "Select__StyledSelect",
  componentId: "sc-12nwnw9-0"
})(["flex:1;font-weight:600;font-size:14px;line-height:120%;padding:0 8px;color:", ";background-color:", ";outline:none;border:none;height:100%;box-sizing:border-box;transition:all 100ms ease-in-out;", " ", ""], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.black;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.white;
}, function (_ref3) {
  var hasError = _ref3.hasError;
  return hasError && css(["::placeholder{color:", ";}color:", ";"], function (_ref4) {
    var theme = _ref4.theme;
    return theme.colors.alert.darkRed;
  }, function (_ref5) {
    var theme = _ref5.theme;
    return theme.colors.alert.darkRed;
  });
}, function (_ref6) {
  var block = _ref6.block;
  return block && css(["width:100%;"]);
});

var renderOptions = function renderOptions(options) {
  return options.map(function (opt) {
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  });
};

var Select = function Select(_ref7) {
  var block = _ref7.block,
      children = _ref7.children,
      disabled = _ref7.disabled,
      endIcon = _ref7.endIcon,
      hasError = _ref7.hasError,
      options = _ref7.options,
      register = _ref7.register,
      startIcon = _ref7.startIcon,
      props = _objectWithoutProperties(_ref7, ["block", "children", "disabled", "endIcon", "hasError", "options", "register", "startIcon"]);

  return /*#__PURE__*/React.createElement(FieldWrapper, {
    disabled: disabled,
    endIcon: endIcon,
    hasError: hasError,
    startIcon: startIcon
  }, /*#__PURE__*/React.createElement(StyledSelect, _extends({
    block: block,
    hasError: hasError,
    ref: register
  }, props), renderOptions(options) || children));
};

Select.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  endIcon: PropTypes.string,
  hasError: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })).isRequired,
  register: PropTypes.func.isRequired,
  startIcon: PropTypes.string
};
Select.defaultProps = {
  block: true,
  children: null,
  disabled: false,
  endIcon: "",
  hasError: false,
  startIcon: ""
};

var Switch = function Switch(_ref) {
  var disabled = _ref.disabled,
      handleToggle = _ref.handleToggle,
      size = _ref.size,
      toggled = _ref.toggled,
      props = _objectWithoutProperties(_ref, ["disabled", "handleToggle", "size", "toggled"]);

  return /*#__PURE__*/React.createElement(StyledSwitchContainer, _extends({
    disabled: disabled,
    onClick: handleToggle,
    size: size,
    toggled: toggled
  }, props), /*#__PURE__*/React.createElement(StyledSwitch, {
    size: size,
    toggled: toggled
  }, toggled ? "Yes" : "No"));
};

var StyledSwitchContainer = styled.div.withConfig({
  displayName: "Switch__StyledSwitchContainer",
  componentId: "sc-1y6zhds-0"
})(["align-items:center;background-color:", ";cursor:pointer;display:flex;justify-content:space-between;position:relative;transition:background-color 0.2s;", " ", " ", " ", " ", ""], function (_ref2) {
  var theme = _ref2.theme,
      toggled = _ref2.toggled;
  return toggled ? theme.colors.primary.main : theme.colors.gray.regular;
}, function (_ref3) {
  var disabled = _ref3.disabled;
  return disabled && css(["opacity:0.3;cursor:not-allowed;pointer-events:none;"]);
}, function (_ref4) {
  var hasError = _ref4.hasError;
  return hasError && css(["border:1px solid ", ";"], function (_ref5) {
    var theme = _ref5.theme;
    return theme.colors.alert.darkRed;
  });
}, function (_ref6) {
  var size = _ref6.size;
  return size === "sm" && css(["border-radius:40px;height:20px;width:40px;"]);
}, function (_ref7) {
  var size = _ref7.size;
  return size === "md" && css(["border-radius:35px;height:32px;width:56px;"]);
}, function (_ref8) {
  var size = _ref8.size;
  return size === "lg" && css(["border-radius:100px;height:50px;width:100px;"]);
});
var StyledSwitch = styled.span.withConfig({
  displayName: "Switch__StyledSwitch",
  componentId: "sc-1y6zhds-1"
})(["background:#fff;box-shadow:0 0 2px 0 rgba(10,10,10,0.29);left:2px;position:absolute;top:2px;transition:left 0.2s,transform 0.2s;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:10px;color:", ";text-transform:uppercase;user-select:none;", ";", " ", " ", ""], function (_ref9) {
  var theme = _ref9.theme;
  return theme.colors.gray.medium;
}, function (_ref10) {
  var theme = _ref10.theme,
      toggled = _ref10.toggled;
  return toggled && css(["left:calc(100% - 2px);transform:translateX(-100%);color:", ";"], theme.colors.primary.main);
}, function (_ref11) {
  var size = _ref11.size;
  return size === "sm" && css(["border-radius:16px;height:16px;width:16px;"]);
}, function (_ref12) {
  var size = _ref12.size;
  return size === "md" && css(["border-radius:37px;height:28px;width:28px;"]);
}, function (_ref13) {
  var size = _ref13.size;
  return size === "lg" && css(["border-radius:46px;height:46px;width:46px;"]);
});
Switch.propTypes = {
  disabled: bool,
  handleToggle: func,
  size: oneOf(["sm", "md", "lg"]),
  toggled: bool
};
Switch.defaultProps = {
  disabled: false,
  handleToggle: null,
  size: "md",
  toggled: false
};

var StyledToggle = styled.div.withConfig({
  displayName: "Toggle__StyledToggle",
  componentId: "sc-17mu9um-0"
})(["display:inline-block;position:relative;"]);
var Toggle = function Toggle(_ref) {
  var disabled = _ref.disabled,
      onChange = _ref.onChange,
      size = _ref.size,
      value = _ref.value,
      props = _objectWithoutProperties(_ref, ["disabled", "onChange", "size", "value"]);

  var handleToggle = function handleToggle() {
    onChange(!value);
  };

  return /*#__PURE__*/React.createElement(StyledToggle, null, /*#__PURE__*/React.createElement(Switch, _extends({
    disabled: disabled,
    handleToggle: !disabled ? handleToggle : undefined,
    size: size,
    toggled: value
  }, props)));
};
Toggle.propTypes = {
  disabled: bool,
  onChange: func,
  size: oneOf(["sm", "md", "lg"]),
  value: bool
};
Toggle.defaultProps = {
  disabled: false,
  onChange: null,
  size: "md",
  value: false
};

var ToggleSwitch = function ToggleSwitch(_ref) {
  var control = _ref.control,
      defaultValue = _ref.defaultValue,
      isRequired = _ref.isRequired,
      name = _ref.name,
      props = _objectWithoutProperties(_ref, ["control", "defaultValue", "isRequired", "name"]);

  return /*#__PURE__*/React.createElement(Controller, {
    render: function render(events) {
      return /*#__PURE__*/React.createElement(Toggle, _extends({
        defaultValue: defaultValue
      }, props, events));
    },
    control: control,
    defaultValue: defaultValue,
    name: name,
    rules: {
      required: isRequired
    }
  });
};
ToggleSwitch.propTypes = {
  control: PropTypes.shape({}).isRequired,
  defaultValue: PropTypes.bool,
  isRequired: PropTypes.string,
  name: PropTypes.string.isRequired
};
ToggleSwitch.defaultProps = {
  defaultValue: undefined,
  isRequired: ""
};

var mapFieldTypeToComponent = function mapFieldTypeToComponent(fieldType) {
  switch (fieldType) {
    case "select":
      return Select;

    case "checkbox":
      return Checkbox;

    case "radio":
      return Radio;

    case "toggleSwitch":
      return ToggleSwitch;

    case "fileUpload":
      return FileUpload;

    default:
      return Input;
  }
};

var FormRows = function FormRows(_ref) {
  var data = _ref.data,
      index = _ref.index,
      isRecurring = _ref.isRecurring,
      rows = _ref.rows,
      stepIndex = _ref.stepIndex,
      wizardData = _ref.wizardData;

  var _useFormContext = useFormContext(),
      control = _useFormContext.control,
      errors = _useFormContext.errors,
      register = _useFormContext.register;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var showExpandButton = rows === null || rows === void 0 ? void 0 : rows.some(function (row) {
    return row.expandable;
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, rows === null || rows === void 0 ? void 0 : rows.map(function (row, idx) {
    var _row$fields;

    var rowKey = "step-".concat(stepIndex, "-row-").concat(idx);
    var rowErrors = [];
    var showRow = row.expandable ? expanded : true;
    return /*#__PURE__*/React.createElement(FormRow, {
      errors: rowErrors,
      key: rowKey,
      label: row.label,
      show: showRow
    }, row.message && /*#__PURE__*/React.createElement(Message, {
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
      return /*#__PURE__*/React.createElement(Field, _extends({
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
  }), showExpandButton && /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick() {
      return setExpanded(function (prev) {
        return !prev;
      });
    },
    size: "sm",
    outline: true
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
  componentId: "sc-17ur9xo-0"
})(["padding:8px 8px 8px 24px;background-color:", ";border:1px solid ", ";border-radius:16px;margin-bottom:16px;"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.gray.light;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.gray.regular;
});
var ButtonsWrapper = styled.div.withConfig({
  displayName: "Form__ButtonsWrapper",
  componentId: "sc-17ur9xo-1"
})(["display:flex;justify-content:flex-end;margin-bottom:8px;"]);

var Form = function Form(_ref3) {
  var data = _ref3.data,
      stepIndex = _ref3.stepIndex,
      wizardData = _ref3.wizardData;
  var isRecurring = data.recurring;

  var _useFieldArray = useFieldArray({
    name: isRecurring ? data === null || data === void 0 ? void 0 : data.name : ""
  }),
      fields = _useFieldArray.fields,
      append = _useFieldArray.append,
      remove = _useFieldArray.remove;

  useEffect(function () {
    if (fields.length === 0) {
      append();
    }
  }, []);

  var renderRows = function renderRows(index) {
    return /*#__PURE__*/React.createElement(FormRows, {
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
      return /*#__PURE__*/React.createElement(Wrapper, {
        key: item.id
      }, /*#__PURE__*/React.createElement(ButtonsWrapper, null, /*#__PURE__*/React.createElement(Button, {
        color: "danger",
        disabled: fields.length === 1,
        onClick: function onClick() {
          return remove(idx);
        },
        size: "sm"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: "trash"
      }))), renderRows(idx));
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, isRecurring ? renderRecurring() : renderRows(), isRecurring && /*#__PURE__*/React.createElement(Button, {
    onClick: append,
    size: "sm",
    text: true
  }, "+ Add item"));
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

var Error = styled.div.withConfig({
  displayName: "Error",
  componentId: "sc-1qe4p3u-0"
})(["font-weight:600;font-size:12px;line-height:120%;color:", ";margin-top:8px;"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.alert.darkRed;
});
var FormError = function FormError(_ref2) {
  var message = _ref2.message;
  return /*#__PURE__*/React.createElement(Error, null, message);
};
FormError.propTypes = {
  message: PropTypes.node.isRequired
};
FormError.defaultProps = {};

var Wrapper$1 = styled.div.withConfig({
  displayName: "Row__Wrapper",
  componentId: "lnv3h7-0"
})(["display:flex;align-items:center;min-height:40px;margin-bottom:8px;", ";"], function (_ref) {
  var show = _ref.show;
  return !show && "display: none";
});
var StyledLabel$2 = styled(Label).withConfig({
  displayName: "Row__StyledLabel",
  componentId: "lnv3h7-1"
})(["flex:30% 0;"]);
var FieldsAndErrorsWrapper = styled.div.withConfig({
  displayName: "Row__FieldsAndErrorsWrapper",
  componentId: "lnv3h7-2"
})(["flex:", " 0;"], function (_ref2) {
  var fullWidth = _ref2.fullWidth;
  return fullWidth ? "100%" : "50%";
});
var Fields = styled.div.withConfig({
  displayName: "Row__Fields",
  componentId: "lnv3h7-3"
})(["display:flex;align-items:center;flex-wrap:wrap;width:100%;"]);
var FormRow = function FormRow(_ref3) {
  var children = _ref3.children,
      errors = _ref3.errors,
      label = _ref3.label,
      show = _ref3.show;
  return /*#__PURE__*/React.createElement(Wrapper$1, {
    show: show
  }, label && /*#__PURE__*/React.createElement(StyledLabel$2, null, label), /*#__PURE__*/React.createElement(FieldsAndErrorsWrapper, {
    fullWidth: !label
  }, /*#__PURE__*/React.createElement(Fields, null, children), errors.map(function (err) {
    return /*#__PURE__*/React.createElement(FormError, {
      key: err,
      message: err
    });
  })));
};
FormRow.propTypes = {
  children: PropTypes.node.isRequired,
  errors: PropTypes.arrayOf(PropTypes.node).isRequired,
  label: PropTypes.node,
  show: PropTypes.bool.isRequired
};
FormRow.defaultProps = {
  label: ""
};

var StyledMessage = styled.div.withConfig({
  displayName: "Message__StyledMessage",
  componentId: "uq0ecw-0"
})(["width:100%;box-sizing:border-box;min-height:40px;padding:8px;font-size:14px;border-radius:8px;background-color:", ";color:", ";transition:all 100ms ease-in-out;display:flex;align-items:center;svg{color:", ";margin-right:8px;font-size:16px;}", " ", ""], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.gray.semiLight;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.black;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.primary.main;
}, function (_ref4) {
  var color = _ref4.color,
      theme = _ref4.theme;
  return color === "danger" && css(["background-color:", ";color:", ";svg{color:", ";}"], theme.colors.alert.lightRed, theme.colors.alert.darkRed, theme.colors.alert.darkRed);
}, function (_ref5) {
  var color = _ref5.color,
      theme = _ref5.theme;
  return color === "warning" && css(["background-color:", ";color:", ";"], theme.colors.primary.light, theme.colors.primary.main);
});
var Message = function Message(_ref6) {
  var content = _ref6.content,
      children = _ref6.children,
      props = _objectWithoutProperties(_ref6, ["content", "children"]);

  return /*#__PURE__*/React.createElement(StyledMessage, props, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: "info-circle"
  }), content || children);
};
Message.propTypes = {
  content: PropTypes.node,
  children: PropTypes.node,
  color: PropTypes.oneOf(["info", "danger", "warning"])
};
Message.defaultProps = {
  content: null,
  children: null,
  color: "info"
};

var stepBorderAndTitleColor = function stepBorderAndTitleColor(_ref) {
  var isActive = _ref.isActive,
      isPassed = _ref.isPassed,
      theme = _ref.theme;
  if (isActive) return theme.colors.primary.main;
  if (isPassed) return theme.colors.gray.dark;
  return theme.colors.gray.medium;
};
var stepFlagColor = function stepFlagColor(_ref2) {
  var isActive = _ref2.isActive,
      isPassed = _ref2.isPassed,
      theme = _ref2.theme;
  if (isActive || isPassed) return theme.colors.white;
  return theme.colors.gray.medium;
};
var stepFlagBackgroundColor = function stepFlagBackgroundColor(_ref3) {
  var isActive = _ref3.isActive,
      isPassed = _ref3.isPassed,
      theme = _ref3.theme;
  if (isActive) return theme.colors.primary.main;
  if (isPassed) return theme.colors.gray.dark;
  return theme.colors.gray.regular;
};

var StyledTitle = styled.div.withConfig({
  displayName: "StepTitle__StyledTitle",
  componentId: "sc-8z72c6-0"
})(["display:flex;align-items:center;text-overflow:ellipsis;overflow:hidden;white-space:normal;", " ", ""], function (_ref) {
  var isPassed = _ref.isPassed;
  return isPassed && css(["cursor:pointer;"]);
}, function (_ref2) {
  var isHorizontal = _ref2.isHorizontal;
  return isHorizontal && css(["flex-direction:column;align-items:flex-start;"]);
});
var Flag = styled.div.withConfig({
  displayName: "StepTitle__Flag",
  componentId: "sc-8z72c6-1"
})(["width:32px;height:32px;display:flex;align-items:center;justify-content:center;background-color:", ";color:", ";border-radius:100%;font-weight:600;font-size:14px;line-height:120%;z-index:1;transition:all ", " ease-in-out;"], function (props) {
  return stepFlagBackgroundColor(props);
}, function (props) {
  return stepFlagColor(props);
}, function (_ref3) {
  var transitionDuration = _ref3.transitionDuration;
  return "".concat(transitionDuration, "ms");
});
var Label$1 = styled.span.withConfig({
  displayName: "StepTitle__Label",
  componentId: "sc-8z72c6-2"
})(["font-weight:600;font-size:16px;line-height:120%;color:", ";padding-left:8px;transition:all ", " ease-in-out;", ""], function (props) {
  return stepBorderAndTitleColor(props);
}, function (_ref4) {
  var transitionDuration = _ref4.transitionDuration;
  return "".concat(transitionDuration, "ms");
}, function (_ref5) {
  var isHorizontal = _ref5.isHorizontal;
  return isHorizontal && css(["font-size:12px;padding:4px 4px 0 0;"]);
});

var StepTitle = function StepTitle(_ref6) {
  var isActive = _ref6.isActive,
      isHorizontal = _ref6.isHorizontal,
      isPassed = _ref6.isPassed,
      label = _ref6.label,
      flag = _ref6.flag,
      onClick = _ref6.onClick,
      transitionDuration = _ref6.transitionDuration;
  return /*#__PURE__*/React.createElement(StyledTitle, {
    onClick: onClick,
    isHorizontal: isHorizontal,
    isPassed: isPassed
  }, /*#__PURE__*/React.createElement(Flag, {
    isActive: isActive,
    isPassed: isPassed,
    transitionDuration: transitionDuration
  }, isPassed ? /*#__PURE__*/React.createElement("img", {
    src: Check,
    alt: "passed-step"
  }) : flag), /*#__PURE__*/React.createElement(Label$1, {
    isActive: isActive,
    isHorizontal: isHorizontal,
    isPassed: isPassed,
    transitionDuration: transitionDuration
  }, label));
};

StepTitle.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isHorizontal: PropTypes.bool.isRequired,
  isPassed: PropTypes.bool.isRequired,
  label: PropTypes.node.isRequired,
  flag: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  transitionDuration: PropTypes.number.isRequired
};
StepTitle.defaultProps = {
  onClick: function onClick() {}
};

var StyledContent = styled.div.withConfig({
  displayName: "StepContent__StyledContent",
  componentId: "sc-16rg1br-0"
})(["width:100%;height:100%;flex:1;padding:24px 24px 24px 40px;transition:all ", "ms ease-in-out;", ";"], function (_ref) {
  var duration = _ref.duration;
  return duration / 2;
}, function (_ref2) {
  var state = _ref2.state;

  switch (state) {
    case "entering":
    case "exited":
      return css(["-webkit-filter:blur(1rem);filter:blur(1rem);"]);

    default:
      return css(["-webkit-filter:blur(0);filter:blur(0);"]);
  }
});
var ActionWrapper = styled.div.withConfig({
  displayName: "StepContent__ActionWrapper",
  componentId: "sc-16rg1br-1"
})(["display:flex;justify-content:space-between;align-items:center;padding:16px 0;"]);
var StepHint = styled.span.withConfig({
  displayName: "StepContent__StepHint",
  componentId: "sc-16rg1br-2"
})(["font-style:italic;font-weight:normal;font-size:14px;color:", ";margin-left:8px;"], function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.gray.medium;
});
var duration = 500;

var StepContent = function StepContent(_ref4) {
  var children = _ref4.children,
      content = _ref4.content,
      currentStep = _ref4.currentStep,
      handlePrev = _ref4.handlePrev,
      isFirstStep = _ref4.isFirstStep,
      isLastStep = _ref4.isLastStep,
      stepCount = _ref4.stepCount,
      props = _objectWithoutProperties(_ref4, ["children", "content", "currentStep", "handlePrev", "isFirstStep", "isLastStep", "stepCount"]);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      mounted = _useState2[0],
      setMounted = _useState2[1];

  useEffect(function () {
    setMounted(true);
    return function () {
      setMounted(false);
    };
  }, []);
  return /*#__PURE__*/React.createElement(Transition, {
    "in": mounted,
    timeout: duration,
    unmountOnExit: true
  }, function (state) {
    return /*#__PURE__*/React.createElement(StyledContent, _extends({
      duration: duration,
      state: state
    }, props), children || content, /*#__PURE__*/React.createElement(ActionWrapper, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
      disabled: isFirstStep,
      onClick: handlePrev,
      outline: true
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: "arrow-left"
    })), /*#__PURE__*/React.createElement(StepHint, null, "".concat(currentStep, " of ").concat(stepCount, " steps"))), /*#__PURE__*/React.createElement(Button, {
      content: isLastStep ? "Finish" : "Next",
      type: "submit" // disabled

    })));
  });
};

StepContent.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  currentStep: PropTypes.number.isRequired,
  handlePrev: PropTypes.func.isRequired,
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  stepCount: PropTypes.number.isRequired
};
StepContent.defaultProps = {
  children: null,
  content: null
};

var Wrapper$2 = styled.div.withConfig({
  displayName: "Stepper__Wrapper",
  componentId: "k0wdau-0"
})(["max-width:680px;margin:auto;"]);
var StepsWrapper = styled.div.withConfig({
  displayName: "Stepper__StepsWrapper",
  componentId: "k0wdau-1"
})(["", ""], function (_ref) {
  var isHorizontal = _ref.isHorizontal;
  return isHorizontal && css(["position:relative;::before{content:\"\";display:inline-block;width:80px;height:100%;background:linear-gradient( 270deg,#ffffff 0%,rgba(255,255,255,0) 100% );transform:rotate(-180deg);position:absolute;top:0;left:0;z-index:2;}::after{content:\"\";display:inline-block;width:80px;height:100%;background:linear-gradient( 270deg,#ffffff 0%,rgba(255,255,255,0) 100% );position:absolute;top:0;right:0;z-index:2;}"]);
});
var Steps = styled.div.withConfig({
  displayName: "Stepper__Steps",
  componentId: "k0wdau-2"
})(["", ""], function (_ref2) {
  var isHorizontal = _ref2.isHorizontal;
  return isHorizontal && css(["display:flex;align-items:center;justify-content:flex-start;white-space:nowrap;overflow-y:hidden;overflow-x:scroll;padding:0 64px;user-select:none;-ms-overflow-style:none;&&::-webkit-scrollbar{display:none;}&.active{cursor:grabbing;cursor:-webkit-grabbing;}"]);
});
var StepConnector = styled.div.withConfig({
  displayName: "Stepper__StepConnector",
  componentId: "k0wdau-3"
})(["border-width:0;border-style:dashed;border-color:", ";border-left-width:2px;transition:all ", " ease-in-out;position:absolute;top:0;left:15px;bottom:0;::before{content:\"\";width:2px;height:100%;display:inline-block;}", ""], function (props) {
  return stepBorderAndTitleColor(props);
}, function (_ref3) {
  var transitionDuration = _ref3.transitionDuration;
  return "".concat(transitionDuration, "ms");
}, function (_ref4) {
  var isHorizontal = _ref4.isHorizontal;
  return isHorizontal && css(["width:100%;border-left-width:0;border-top-width:2px;top:15px;left:8px;::before{content:\"\";width:100%;height:2px;display:inline-block;}"]);
});
var Step = styled.div.withConfig({
  displayName: "Stepper__Step",
  componentId: "k0wdau-4"
})(["box-sizing:border-box;position:relative;min-height:60px;:last-child{", "{", ";}}", ""], StepConnector, function (_ref5) {
  var isActive = _ref5.isActive,
      isHorizontal = _ref5.isHorizontal;
  return (!isActive || isHorizontal) && "border: none";
}, function (_ref6) {
  var isHorizontal = _ref6.isHorizontal;
  return isHorizontal && css(["width:100px;min-width:100px;"]);
});

var Stepper = function Stepper(_ref7) {
  var currentStepContent = _ref7.currentStepContent,
      currentStepIndex = _ref7.currentStepIndex,
      orientation = _ref7.orientation,
      setCurrentStepIndex = _ref7.setCurrentStepIndex,
      steps = _ref7.steps,
      transitionDuration = _ref7.transitionDuration;
  var stepRef = useRef(null);
  var isHorizontal = orientation === "horizontal";
  var wrapperRef = /*#__PURE__*/createRef();
  var stepCount = steps.length;
  var isLastStep = currentStepIndex === stepCount - 1;
  var isFirstStep = currentStepIndex === 0;
  useEffect(function () {
    if (isHorizontal) {
      handleScroll(wrapperRef.current);
    }
  }, []);
  useEffect(function () {
    if (isHorizontal && stepRef.current) stepRef.current.scrollIntoView({
      block: "end",
      behavior: "smooth"
    });
  }, [currentStepIndex]);

  var handlePrev = function handlePrev() {
    if (!isFirstStep) {
      setCurrentStepIndex(function (prev) {
        return prev - 1;
      });
    }
  };

  var handleStepClick = function handleStepClick(isPassed, stepIdx) {
    if (isPassed) {
      setCurrentStepIndex(stepIdx);
    }
  };

  var content = /*#__PURE__*/React.createElement(StepContent, {
    content: currentStepContent,
    currentStep: currentStepIndex + 1,
    isHorizontal: isHorizontal,
    isLastStep: isLastStep,
    isFirstStep: isFirstStep,
    handlePrev: handlePrev,
    transitionDuration: transitionDuration,
    stepCount: stepCount
  });
  return /*#__PURE__*/React.createElement(Wrapper$2, null, /*#__PURE__*/React.createElement(StepsWrapper, {
    isHorizontal: isHorizontal
  }, /*#__PURE__*/React.createElement(Steps, {
    isHorizontal: isHorizontal,
    ref: wrapperRef
  }, steps.map(function (step, idx) {
    var isActive = idx === currentStepIndex;
    var isPassed = idx < currentStepIndex;
    var stepKey = "step-".concat(idx);
    return /*#__PURE__*/React.createElement(Step, {
      isActive: isActive,
      isHorizontal: isHorizontal,
      isPassed: isPassed,
      key: stepKey,
      ref: isActive ? stepRef : null
    }, /*#__PURE__*/React.createElement(StepTitle, {
      label: step,
      flag: idx + 1,
      isActive: isActive,
      isHorizontal: isHorizontal,
      isPassed: isPassed,
      onClick: function onClick() {
        return handleStepClick(isPassed, idx);
      },
      transitionDuration: transitionDuration
    }), !isHorizontal && isActive && content, /*#__PURE__*/React.createElement(StepConnector, {
      isActive: isActive,
      isHorizontal: isHorizontal,
      isPassed: isPassed,
      transitionDuration: transitionDuration
    }));
  }))), isHorizontal && content);
};

Stepper.propTypes = {
  currentStepContent: PropTypes.node.isRequired,
  currentStepIndex: PropTypes.number.isRequired,
  orientation: PropTypes.string,
  setCurrentStepIndex: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  transitionDuration: PropTypes.number
};
Stepper.defaultProps = {
  orientation: "horizontal",
  transitionDuration: 250
};

library.add(faArrowLeft, faBox, faCertificate, faCheck, faDownload, faGlobe, faHashtag, faHistory, faInfoCircle, faMinus, faParagraph, faPlus, faTimes, faTrash, faUser);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Wrapper$3 = styled.div.withConfig({
  displayName: "src__Wrapper",
  componentId: "sc-1s2bagj-0"
})([""]);

var ReactJSONWizard = function ReactJSONWizard(_ref) {
  var schema = _ref.schema,
      onFinish = _ref.onFinish;
  var parsedSchema = JSON.parse(schema);
  var steps = parsedSchema.steps,
      stepperProps = parsedSchema.stepperProps,
      wrapperProps = parsedSchema.wrapperProps;

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      currentStep = _useState2[0],
      setCurrentStep = _useState2[1];

  var isCurrentLastStep = currentStep === steps.length - 1;

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      wizardData = _useState4[0],
      setWizardData = _useState4[1];

  var methods = useForm({
    mode: "onBlur",
    defaultValues: wizardData
  });

  var onSubmit = function onSubmit(data) {
    console.log("data: ", data);
    setWizardData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), data);
    });

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
    return /*#__PURE__*/React.createElement(Form, {
      data: steps[currentStep],
      stepIndex: currentStep,
      wizardData: wizardData
    });
  };

  return /*#__PURE__*/React.createElement(Wrapper$3, wrapperProps, /*#__PURE__*/React.createElement(FormProvider, methods, /*#__PURE__*/React.createElement("form", {
    onSubmit: methods.handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement(Stepper, _extends({
    currentStepContent: renderForm(),
    currentStepIndex: currentStep,
    setCurrentStepIndex: setCurrentStep,
    steps: stepsArray
  }, stepperProps)))));
};

ReactJSONWizard.propTypes = {
  schema: PropTypes.string.isRequired,
  onFinish: PropTypes.func
};
ReactJSONWizard.defaultProps = {
  onFinish: function onFinish() {}
};
var index = withWrapper(ReactJSONWizard);

export default index;
//# sourceMappingURL=index.js.map
