var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import objectAssign from 'object-assign';
import LensPropTypes from '../../prop-types/Lens';
import clamp from 'clamp';
import dataUri from './assets/textured-lens-data-uri';

var PositiveSpaceLens = function (_Component) {
    _inherits(PositiveSpaceLens, _Component);

    function PositiveSpaceLens() {
        _classCallCheck(this, PositiveSpaceLens);

        return _possibleConstructorReturn(this, (PositiveSpaceLens.__proto__ || Object.getPrototypeOf(PositiveSpaceLens)).apply(this, arguments));
    }

    _createClass(PositiveSpaceLens, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', { style: this.compositStyle });
        }
    }, {
        key: 'dimensions',
        get: function get() {
            var _props$cursorOffset = this.props.cursorOffset,
                cursorOffsetX = _props$cursorOffset.x,
                cursorOffsetY = _props$cursorOffset.y;


            return {
                width: cursorOffsetX * 2,
                height: cursorOffsetY * 2
            };
        }
    }, {
        key: 'positionOffset',
        get: function get() {
            var _props = this.props,
                _props$cursorOffset2 = _props.cursorOffset,
                cursorOffsetX = _props$cursorOffset2.x,
                cursorOffsetY = _props$cursorOffset2.y,
                _props$position = _props.position,
                positionX = _props$position.x,
                positionY = _props$position.y,
                _props$smallImage = _props.smallImage,
                imageHeight = _props$smallImage.height,
                imageWidth = _props$smallImage.width;
            var _dimensions = this.dimensions,
                width = _dimensions.width,
                height = _dimensions.height;


            var top = positionY - cursorOffsetY;
            var left = positionX - cursorOffsetX;
            var maxTop = imageHeight - height;
            var maxLeft = imageWidth - width;
            var minOffset = 0;

            return {
                top: clamp(top, minOffset, maxTop),
                left: clamp(left, minOffset, maxLeft)
            };
        }
    }, {
        key: 'defaultStyle',
        get: function get() {
            var fadeDurationInMs = this.props.fadeDurationInMs;


            return {
                transition: 'opacity ' + fadeDurationInMs + 'ms ease-in',
                backgroundImage: 'url(' + dataUri + ')'
            };
        }
    }, {
        key: 'userSpecifiedStyle',
        get: function get() {
            var style = this.props.style;


            return style;
        }
    }, {
        key: 'isVisible',
        get: function get() {
            var _props2 = this.props,
                isActive = _props2.isActive,
                isPositionOutside = _props2.isPositionOutside;


            return isActive && !isPositionOutside;
        }
    }, {
        key: 'priorityStyle',
        get: function get() {
            var _dimensions2 = this.dimensions,
                width = _dimensions2.width,
                height = _dimensions2.height;
            var _positionOffset = this.positionOffset,
                top = _positionOffset.top,
                left = _positionOffset.left;


            return {
                position: 'absolute',
                top: top + 'px',
                left: left + 'px',
                width: width + 'px',
                height: height + 'px',
                opacity: this.isVisible ? 1 : 0
            };
        }
    }, {
        key: 'compositStyle',
        get: function get() {
            return objectAssign(this.defaultStyle, this.userSpecifiedStyle, this.priorityStyle);
        }
    }]);

    return PositiveSpaceLens;
}(Component);

PositiveSpaceLens.propTypes = LensPropTypes;
PositiveSpaceLens.defaultProps = {
    style: {}
};
export default PositiveSpaceLens;