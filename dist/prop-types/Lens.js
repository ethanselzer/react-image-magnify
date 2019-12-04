'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

var _Image = require('./Image');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    cursorOffset: _Point2.default,
    fadeDurationInMs: _propTypes2.default.number,
    isActive: _propTypes2.default.bool,
    isPositionOutside: _propTypes2.default.bool,
    position: _Point2.default,
    smallImage: _Image.SmallImageShape,
    style: _propTypes2.default.object
};