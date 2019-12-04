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

var LensBottom = function LensBottom(_ref) {
    var cursorOffset = _ref.cursorOffset,
        position = _ref.position,
        fadeDurationInMs = _ref.fadeDurationInMs,
        isActive = _ref.isActive,
        isPositionOutside = _ref.isPositionOutside,
        smallImage = _ref.smallImage,
        parentSpecifiedStyle = _ref.style;


    var clearLensHeight = cursorOffset.y * 2;
    var computedHeight = smallImage.height - position.y - cursorOffset.y;
    var maxHeight = smallImage.height - clearLensHeight;
    var height = (0, _clamp2.default)(computedHeight, 0, maxHeight);
    var clearLensBottom = position.y + cursorOffset.y;
    var top = Math.max(clearLensBottom, clearLensHeight);
    var computedStyle = {
        height: height + 'px',
        width: '100%',
        top: top + 'px'
    };

    return _react2.default.createElement(_Lens2.default, {
        fadeDurationInMs: fadeDurationInMs,
        isActive: isActive,
        isPositionOutside: isPositionOutside,
        style: (0, _objectAssign2.default)({}, parentSpecifiedStyle, computedStyle)
    });
};

LensBottom.propTypes = _Lens4.default;

exports.default = LensBottom;