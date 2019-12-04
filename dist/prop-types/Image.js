'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SmallImageShape = exports.LargeImageShape = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRequiredIf = require('react-required-if');

var _reactRequiredIf2 = _interopRequireDefault(_reactRequiredIf);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseImageShape = {
    alt: _propTypes2.default.string,
    src: _propTypes2.default.string.isRequired,
    srcSet: _propTypes2.default.string,
    sizes: _propTypes2.default.string,
    onLoad: _propTypes2.default.func,
    onError: _propTypes2.default.func
};

var LargeImageShape = exports.LargeImageShape = _propTypes2.default.shape((0, _objectAssign2.default)({}, BaseImageShape, {
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired
}));

var SmallImageShape = exports.SmallImageShape = _propTypes2.default.shape((0, _objectAssign2.default)({}, BaseImageShape, {
    isFluidWidth: _propTypes2.default.bool,
    width: (0, _reactRequiredIf2.default)(_propTypes2.default.number, function (props) {
        return !props.isFluidWidth;
    }),
    height: (0, _reactRequiredIf2.default)(_propTypes2.default.number, function (props) {
        return !props.isFluidWidth;
    })
}));