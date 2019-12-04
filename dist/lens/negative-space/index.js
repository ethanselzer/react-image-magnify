'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = NegativeSpaceLens;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _LensTop = require('./LensTop');

var _LensTop2 = _interopRequireDefault(_LensTop);

var _LensLeft = require('./LensLeft');

var _LensLeft2 = _interopRequireDefault(_LensLeft);

var _LensRight = require('./LensRight');

var _LensRight2 = _interopRequireDefault(_LensRight);

var _LensBottom = require('./LensBottom');

var _LensBottom2 = _interopRequireDefault(_LensBottom);

var _Lens = require('../../prop-types/Lens');

var _Lens2 = _interopRequireDefault(_Lens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NegativeSpaceLens(inputProps) {
    var userSpecifiedStyle = inputProps.style;


    var compositLensStyle = (0, _objectAssign2.default)({ backgroundColor: 'rgba(0,0,0,.4)' }, userSpecifiedStyle);

    var props = (0, _objectAssign2.default)({}, inputProps, { style: compositLensStyle });

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_LensTop2.default, props),
        _react2.default.createElement(_LensLeft2.default, props),
        _react2.default.createElement(_LensRight2.default, props),
        _react2.default.createElement(_LensBottom2.default, props)
    );
}

NegativeSpaceLens.propTypes = _Lens2.default;