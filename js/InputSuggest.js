"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PureInputSuggest = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _pubcoreUiText = _interopRequireDefault(require("pubcore-ui-text"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

var _InputSuggest = _interopRequireDefault(require("./InputSuggest.types"));

var _InputSuggest2 = _interopRequireDefault(require("./InputSuggest.defaults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var InputSuggest =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputSuggest, _React$Component);

  function InputSuggest(props) {
    var _this;

    _classCallCheck(this, InputSuggest);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputSuggest).call(this, props));
    _this.state = {
      value: _this.props.value || '',
      dropdown: false,
      selected: '',
      suggestions: _this.props.suggestions
    };
    _this.handleClickOutside = _this.handleClickOutside.bind(_assertThisInitialized(_this));
    _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.selectSuggestion = _this.selectSuggestion.bind(_assertThisInitialized(_this));
    _this.onKeyPress = _this.onKeyPress.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InputSuggest, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var newState = {
        suggestions: props.suggestions
      };

      if (typeof props.value == 'string') {
        newState['value'] = props.value;
      }

      this.setState(newState);
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside(e) {
      this.setState({
        dropdown: false
      });
      this.props.gofer.close && this.props.gofer.close(e.target.value, e);
    }
  }, {
    key: "setValue",
    value: function setValue(newValue, dropdown) {
      var suggestions = this.props.suggestions.filter(function (val) {
        return val.toLowerCase().indexOf(newValue.toLowerCase()) >= 0;
      });
      this.setState({
        value: newValue,
        dropdown: dropdown,
        suggestions: suggestions,
        selected: ''
      });
      this.props.gofer.change && this.props.gofer.change(newValue);
    }
  }, {
    key: "onInput",
    value: function onInput(e) {
      this.setValue(e.target.value, true);
    }
  }, {
    key: "onFocus",
    value: function onFocus(e) {
      this.setState({
        dropdown: true,
        selected: ''
      });
      this.props.gofer.activate && this.props.gofer.activate(e);
    }
  }, {
    key: "useSuggestion",
    value: function useSuggestion(newValue) {
      this.setState({
        selected: newValue
      });
    }
  }, {
    key: "selectSuggestion",
    value: function selectSuggestion(newValue, e) {
      this.setValue(newValue);
      this.props.gofer.selectSuggestion && this.props.gofer.selectSuggestion(newValue, e);
    }
  }, {
    key: "selectNextSuggestion",
    value: function selectNextSuggestion() {
      this.state.dropdown && this.useSuggestion(this.state.suggestions[this.state.suggestions.indexOf(this.state.selected) + 1] || '');
      this.setState({
        dropdown: true
      });
    }
  }, {
    key: "selectPreviousSuggestion",
    value: function selectPreviousSuggestion() {
      var key = this.state.suggestions.indexOf(this.state.selected) - 1;

      if (key < 0) {
        key = this.state.suggestions.length - 1;
      }

      this.state.dropdown && this.useSuggestion(this.state.suggestions[key] || '');
    }
  }, {
    key: "onKeyPress",
    value: function onKeyPress(e) {
      switch (e.key) {
        case 'Enter':
          this.state.dropdown && e.preventDefault();
          this.state.selected && this.selectSuggestion(this.state.selected);
          break;

        case 'ArrowDown':
          this.selectNextSuggestion(e);
          break;

        case 'ArrowUp':
          this.selectPreviousSuggestion(e);
          break;
      }

      this.props.gofer.onKeyPress && this.props.gofer.onKeyPress(e, this.state.selected);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          T = _this$props.T,
          gofer = _this$props.gofer,
          className = _this$props.className,
          classNames = _this$props.classNames,
          inputProps = _this$props.inputProps,
          minsize = _this$props.minsize,
          _this$state = this.state,
          suggestions = _this$state.suggestions,
          selected = _this$state.selected;
      return _react["default"].createElement("div", {
        className: classNames.container + (className || ''),
        onKeyDown: this.onKeyPress
      }, _react["default"].createElement("input", _extends({}, inputProps, {
        type: "text",
        value: this.state.value,
        onChange: this.onInput,
        onFocus: this.onFocus
      })), this.props.loading && this.props.loading(), Array.isArray(suggestions) && suggestions.length && !(suggestions.length === 1 && suggestions[0] === this.state.value) ? _react["default"].createElement("div", {
        className: classNames.dropdown + (this.state.dropdown ? ' ' + classNames.dropdownOpen : '')
      }, suggestions.map(function (val, i) {
        return _react["default"].createElement("div", {
          key: i,
          className: classNames.dropdownValue + (selected === val ? ' ' + classNames.dropdownValueSelected : ''),
          onClick: function onClick() {
            return _this2.selectSuggestion(val);
          },
          onMouseOver: function onMouseOver(e) {
            return _this2.useSuggestion(val, e);
          }
        }, val);
      }), gofer.showMore && _react["default"].createElement("div", {
        className: classNames.dropdownMore,
        onClick: function onClick() {
          return gofer.showMore(minsize);
        }
      }, (0, _pubcoreUiText["default"])(T, 'inputSuggestShowMore', '... show {count} more', {
        count: minsize
      }))) : null);
    }
  }]);

  return InputSuggest;
}(_react["default"].Component);

InputSuggest.propTypes = _InputSuggest["default"];
InputSuggest.defaultProps = _InputSuggest2["default"];

var _default = (0, _reactOnclickoutside["default"])(InputSuggest);

exports["default"] = _default;
var PureInputSuggest = InputSuggest;
exports.PureInputSuggest = PureInputSuggest;