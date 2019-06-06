"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = require("prop-types");

var _default = {
  key: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.string, _propTypes.PropTypes.number]),
  value: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.string, _propTypes.PropTypes.number, _propTypes.PropTypes.array]),
  suggestions: _propTypes.PropTypes.arrayOf(_propTypes.PropTypes.oneOfType([_propTypes.PropTypes.string, _propTypes.PropTypes.object, _propTypes.PropTypes.number])),
  gofer: _propTypes.PropTypes.object.isRequired,
  classNames: _propTypes.PropTypes.object.isRequired,
  minsize: _propTypes.PropTypes.number.isRequired,
  loading: _propTypes.PropTypes.func,
  T: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.object, _propTypes.PropTypes.array]).isRequired
};
exports["default"] = _default;