'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _EnlargedImage = require('./EnlargedImage');

var _EnlargedImage2 = _interopRequireDefault(_EnlargedImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RenderEnlargedImage = function (_Component) {
    _inherits(RenderEnlargedImage, _Component);

    function RenderEnlargedImage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RenderEnlargedImage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RenderEnlargedImage.__proto__ || Object.getPrototypeOf(RenderEnlargedImage)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isMounted: false }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RenderEnlargedImage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ isMounted: true });

            if (this.isPortalRendered) {
                var portalId = this.props.portalId;

                this.portalElement = document.getElementById(portalId);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.isMounted) {
                return null;
            }

            var props = this.compositProps;

            if (this.isPortalRendered) {
                return _reactDom2.default.createPortal(_react2.default.createElement(_EnlargedImage2.default, props), this.portalElement);
            }

            return _react2.default.createElement(_EnlargedImage2.default, props);
        }
    }, {
        key: 'isPortalIdImplemented',
        get: function get() {
            return !!this.props.portalId;
        }
    }, {
        key: 'isPortalRendered',
        get: function get() {
            var _props = this.props,
                isPortalEnabledForTouch = _props.isPortalEnabledForTouch,
                isTouchDetected = _props.isTouchDetected;


            if (!this.isPortalIdImplemented) {
                return false;
            }

            if (!isTouchDetected) {
                return true;
            }

            if (isPortalEnabledForTouch) {
                return true;
            }

            return false;
        }
    }, {
        key: 'isMounted',
        get: function get() {
            return this.state.isMounted;
        }
    }, {
        key: 'compositProps',
        get: function get() {
            return (0, _objectAssign2.default)({}, this.props, { isPortalRendered: this.isPortalRendered });
        }
    }]);

    return RenderEnlargedImage;
}(_react.Component);

RenderEnlargedImage.propTypes = {
    isPortalEnabledForTouch: _propTypes2.default.bool.isRequired,
    isTouchDetected: _propTypes2.default.bool.isRequired,
    portalId: _propTypes2.default.string
};
exports.default = RenderEnlargedImage;