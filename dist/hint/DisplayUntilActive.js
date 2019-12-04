'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisplayUntilActive = function (_React$Component) {
    _inherits(DisplayUntilActive, _React$Component);

    function DisplayUntilActive(props) {
        _classCallCheck(this, DisplayUntilActive);

        var _this = _possibleConstructorReturn(this, (DisplayUntilActive.__proto__ || Object.getPrototypeOf(DisplayUntilActive)).call(this, props));

        _this.hasShown = false;
        return _this;
    }

    _createClass(DisplayUntilActive, [{
        key: 'setHasShown',
        value: function setHasShown() {
            this.hasShown = true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                isActive = _props.isActive,
                shouldHideAfterFirstActivation = _props.shouldHideAfterFirstActivation,
                hasShown = this.hasShown;

            var shouldShow = !isActive && (!hasShown || !shouldHideAfterFirstActivation);

            if (isActive && !hasShown) {
                this.setHasShown();
            }

            return shouldShow ? children : null;
        }
    }]);

    return DisplayUntilActive;
}(_react2.default.Component);

DisplayUntilActive.propTypes = {
    children: _propTypes2.default.element,
    isActive: _propTypes2.default.bool,
    shouldHideAfterFirstActivation: _propTypes2.default.bool
};
DisplayUntilActive.defaultProps = {
    shouldHideAfterFirstActivation: true
};
exports.default = DisplayUntilActive;