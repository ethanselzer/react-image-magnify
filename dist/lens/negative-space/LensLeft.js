'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _clamp = require('clamp');

var _clamp2 = _interopRequireDefault(_clamp);

var _Lens = require('./Lens');

var _Lens2 = _interopRequireDefault(_Lens);

var _Lens3 = require('../../prop-types/Lens');

var _Lens4 = _interopRequireDefault(_Lens3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LensLeft = function LensLeft(_ref) {
    var cursorOffset = _ref.cursorOffset,
        position = _ref.position,
        fadeDurationInMs = _ref.fadeDurationInMs,
        isActive = _ref.isActive,
        isPositionOutside = _ref.isPositionOutside,
        smallImage = _ref.smallImage,
        parentSpecifiedStyle = _ref.style;

    var clearLensHeight = cursorOffset.y * 2;
    var clearLensWidth = cursorOffset.x * 2;
    var maxHeight = smallImage.height - clearLensHeight;
    var maxWidth = smallImage.width - clearLensWidth;
    var height = clearLensHeight;
    var width = (0, _clamp2.default)(position.x - cursorOffset.x, 0, maxWidth);
    var top = (0, _clamp2.default)(position.y - cursorOffset.y, 0, maxHeight);
    var computedStyle = {
        height: height + 'px',
        width: width + 'px',
        top: top + 'px',
        left: '0px'
    };

    return _react2.default.createElement(_Lens2.default, {
        fadeDurationInMs: fadeDurationInMs,
        isActive: isActive,
        isPositionOutside: isPositionOutside,
        style: (0, _objectAssign2.default)({}, parentSpecifiedStyle, computedStyle)
    });
};

LensLeft.propTypes = _Lens4.default;

exports.default = LensLeft;