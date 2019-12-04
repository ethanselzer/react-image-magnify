'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lens = function Lens(props) {
    var fadeDurationInMs = props.fadeDurationInMs,
        isActive = props.isActive,
        isPositionOutside = props.isPositionOutside,
        parentSpecifiedStyle = props.style;


    var defaultStyle = {
        width: 'auto',
        height: 'auto',
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto',
        display: 'block'
    };

    var computedStyle = {
        position: 'absolute',
        opacity: isActive && !isPositionOutside ? 1 : 0,
        transition: 'opacity ' + fadeDurationInMs + 'ms ease-in'
    };

    var compositStyle = (0, _objectAssign2.default)({}, defaultStyle, parentSpecifiedStyle, computedStyle);

    return _react2.default.createElement('div', { style: compositStyle });
};

Lens.propTypes = {
    style: _propTypes2.default.object,
    fadeDurationInMs: _propTypes2.default.number,
    isActive: _propTypes2.default.bool,
    translateX: _propTypes2.default.number,
    translateY: _propTypes2.default.number,
    userStyle: _propTypes2.default.object
};

Lens.defaultProps = {
    isActive: false,
    fadeDurationInMs: 0,
    translateX: 0,
    translateY: 0
};

exports.default = Lens;