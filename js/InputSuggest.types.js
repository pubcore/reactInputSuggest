'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

exports.default = {
	key: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.array]),
	suggestions: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object, _react.PropTypes.number])),
	gofer: _react.PropTypes.object.isRequired,
	classNames: _react.PropTypes.object.isRequired,
	minsize: _react.PropTypes.number.isRequired,
	loading: _react.PropTypes.func,
	T: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]).isRequired
};