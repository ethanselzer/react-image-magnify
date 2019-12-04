'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContainerDimensions = exports.EnlargedImageContainerDimensions = exports.EnlargedImagePosition = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnlargedImagePosition = exports.EnlargedImagePosition = _propTypes2.default.oneOf([_constants.ENLARGED_IMAGE_POSITION.beside, _constants.ENLARGED_IMAGE_POSITION.over]);

var EnlargedImageContainerDimensions = exports.EnlargedImageContainerDimensions = _propTypes2.default.shape({
    width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
});

var ContainerDimensions = exports.ContainerDimensions = _propTypes2.default.shape({
    width: _propTypes2.default.number,
    height: _propTypes2.default.number
});