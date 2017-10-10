'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PureInputSuggest = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pubcoreUiText = require('pubcore-ui-text');

var _pubcoreUiText2 = _interopRequireDefault(_pubcoreUiText);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _InputSuggest = require('./InputSuggest.types');

var _InputSuggest2 = _interopRequireDefault(_InputSuggest);

var _InputSuggest3 = require('./InputSuggest.defaults');

var _InputSuggest4 = _interopRequireDefault(_InputSuggest3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputSuggest = function (_React$Component) {
	_inherits(InputSuggest, _React$Component);

	function InputSuggest(props) {
		_classCallCheck(this, InputSuggest);

		var _this = _possibleConstructorReturn(this, (InputSuggest.__proto__ || Object.getPrototypeOf(InputSuggest)).call(this, props));

		_this.state = {
			value: _this.props.value || '',
			dropdown: false,
			selected: '',
			suggestions: _this.props.suggestions
		};
		_this.handleClickOutside = _this.handleClickOutside.bind(_this);
		_this.onInput = _this.onInput.bind(_this);
		_this.onFocus = _this.onFocus.bind(_this);
		_this.selectSuggestion = _this.selectSuggestion.bind(_this);
		_this.onKeyPress = _this.onKeyPress.bind(_this);
		return _this;
	}

	_createClass(InputSuggest, [{
		key: 'handleClickOutside',
		value: function handleClickOutside(e) {
			this.setState({ dropdown: false });
			this.props.gofer.close && this.props.gofer.close(e.target.value, e);
		}
	}, {
		key: 'setValue',
		value: function setValue(newValue, dropdown) {
			var suggestions = this.props.suggestions.filter(function (val) {
				return val.toLowerCase().indexOf(newValue.toLowerCase()) >= 0;
			});
			this.setState({ value: newValue, dropdown: dropdown, suggestions: suggestions });
		}
	}, {
		key: 'onInput',
		value: function onInput(e) {
			this.setValue(e.target.value, true);
			this.props.gofer.change && this.props.gofer.change(e.target.value, e);
		}
	}, {
		key: 'onFocus',
		value: function onFocus(e) {
			this.setState({ dropdown: true });
			this.props.gofer.activate && this.props.gofer.activate(e);
		}
	}, {
		key: 'selectSuggestion',
		value: function selectSuggestion(newValue, e) {
			this.setState({ selected: newValue });
			this.props.gofer.selectSuggestion && this.props.gofer.selectSuggestion(newValue, e);
		}
	}, {
		key: 'selectNextSuggestion',
		value: function selectNextSuggestion(e) {
			this.state.dropdown && this.selectSuggestion(this.state.suggestions[this.state.suggestions.indexOf(this.state.selected) + 1] || '', e);
			this.setState({ dropdown: true });
		}
	}, {
		key: 'selectPreviousSuggestion',
		value: function selectPreviousSuggestion(e) {
			var key = this.state.suggestions.indexOf(this.state.selected) - 1;
			if (key < 0) {
				key = this.state.suggestions.length - 1;
			}
			this.state.dropdown && this.selectSuggestion(this.state.suggestions[key] || '', e);
		}
	}, {
		key: 'onKeyPress',
		value: function onKeyPress(e) {
			switch (e.key) {
				case 'Enter':
					return this.setValue(this.state.selected, false);
				case 'ArrowDown':
					return this.selectNextSuggestion(e);
				case 'ArrowUp':
					return this.selectPreviousSuggestion(e);
			}
			this.props.gofer.onKeyPress && this.props.gofer.onKeyPress(this.state.value, e);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    T = _props.T,
			    gofer = _props.gofer,
			    className = _props.className,
			    classNames = _props.classNames,
			    inputProps = _props.inputProps,
			    minsize = _props.minsize,
			    _state = this.state,
			    suggestions = _state.suggestions,
			    selected = _state.selected;


			return _react2.default.createElement(
				'div',
				{ className: classNames.container + (className || ''), onKeyDown: this.onKeyPress },
				_react2.default.createElement('input', _extends({}, inputProps, {
					type: 'text',
					value: this.state.value,
					onChange: this.onInput,
					onFocus: this.onFocus,
					onBlur: this.hideDropdown
				})),
				Array.isArray(suggestions) && suggestions.length && !(suggestions.length === 1 && suggestions[0] === this.state.value) ? _react2.default.createElement(
					'div',
					{ className: classNames.dropdown + (this.state.dropdown ? ' ' + classNames.dropdownOpen : '') },
					suggestions.map(function (val, i) {
						return _react2.default.createElement(
							'div',
							{
								key: i,
								className: classNames.dropdownValue + (selected === val ? ' ' + classNames.dropdownValueSelected : ''),
								onClick: function onClick() {
									return _this2.setValue(val);
								},
								onMouseOver: function onMouseOver(e) {
									return _this2.selectSuggestion(val, e);
								}
							},
							val
						);
					}),
					gofer.showMore && _react2.default.createElement(
						'div',
						{
							className: classNames.dropdownMore,
							onClick: function onClick() {
								return gofer.showMore(minsize);
							}
						},
						(0, _pubcoreUiText2.default)(T, 'inputSuggestShowMore', '... show {count} more', { count: minsize })
					)
				) : null
			);
		}
	}]);

	return InputSuggest;
}(_react2.default.Component);

InputSuggest.propTypes = _InputSuggest2.default;
InputSuggest.defaultProps = _InputSuggest4.default;

exports.default = (0, _reactOnclickoutside2.default)(InputSuggest);
var PureInputSuggest = exports.PureInputSuggest = InputSuggest;