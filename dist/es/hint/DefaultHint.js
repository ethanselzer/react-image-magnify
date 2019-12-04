import React from 'react';
import PropTypes from 'prop-types';

function DefaultHint(_ref) {
    var isTouchDetected = _ref.isTouchDetected,
        hintTextMouse = _ref.hintTextMouse,
        hintTextTouch = _ref.hintTextTouch;

    return React.createElement(
        'div',
        { style: {
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                bottom: '25px'
            } },
        React.createElement(
            'div',
            { style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px 10px',
                    backgroundColor: '#333',
                    borderRadius: '10px',
                    opacity: '0.90'
                } },
            React.createElement('img', {
                style: {
                    width: '25px',
                    height: '25px'
                },
                src: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MC4yIDQ5MC4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OTAuMiA0OTAuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQxOC41LDQxOC41Yzk1LjYtOTUuNiw5NS42LTI1MS4yLDAtMzQ2LjhzLTI1MS4yLTk1LjYtMzQ2LjgsMHMtOTUuNiwyNTEuMiwwLDM0Ni44UzMyMi45LDUxNC4xLDQxOC41LDQxOC41eiBNODksODkgICAgYzg2LjEtODYuMSwyMjYuMS04Ni4xLDMxMi4yLDBzODYuMSwyMjYuMSwwLDMxMi4ycy0yMjYuMSw4Ni4xLTMxMi4yLDBTMywxNzUuMSw4OSw4OXoiIGZpbGw9IiNGRkZGRkYiLz4KCQk8cGF0aCBkPSJNMjQ1LjEsMzM2LjljMy40LDAsNi40LTEuNCw4LjctMy42YzIuMi0yLjIsMy42LTUuMywzLjYtOC43di02Ny4zaDY3LjNjMy40LDAsNi40LTEuNCw4LjctMy42YzIuMi0yLjIsMy42LTUuMywzLjYtOC43ICAgIGMwLTYuOC01LjUtMTIuMy0xMi4yLTEyLjJoLTY3LjN2LTY3LjNjMC02LjgtNS41LTEyLjMtMTIuMi0xMi4yYy02LjgsMC0xMi4zLDUuNS0xMi4yLDEyLjJ2NjcuM2gtNjcuM2MtNi44LDAtMTIuMyw1LjUtMTIuMiwxMi4yICAgIGMwLDYuOCw1LjUsMTIuMywxMi4yLDEyLjJoNjcuM3Y2Ny4zQzIzMi44LDMzMS40LDIzOC4zLDMzNi45LDI0NS4xLDMzNi45eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=',
                alt: ''
            }),
            React.createElement(
                'span',
                { style: {
                        padding: '2px 0 0 5px',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                        color: 'white'
                    } },
                isTouchDetected ? hintTextTouch : hintTextMouse
            )
        )
    );
}

DefaultHint.displayName = 'DefaultHint';

DefaultHint.propTypes = {
    isTouchDetected: PropTypes.bool,
    hintTextMouse: PropTypes.string,
    hintTextTouch: PropTypes.string
};

export default DefaultHint;