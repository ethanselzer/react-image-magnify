var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import objectAssign from 'object-assign';
import EnlargedImage from './EnlargedImage';

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
                return ReactDOM.createPortal(React.createElement(EnlargedImage, props), this.portalElement);
            }

            return React.createElement(EnlargedImage, props);
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
            return objectAssign({}, this.props, { isPortalRendered: this.isPortalRendered });
        }
    }]);

    return RenderEnlargedImage;
}(Component);

RenderEnlargedImage.propTypes = {
    isPortalEnabledForTouch: PropTypes.bool.isRequired,
    isTouchDetected: PropTypes.bool.isRequired,
    portalId: PropTypes.string
};
export default RenderEnlargedImage;