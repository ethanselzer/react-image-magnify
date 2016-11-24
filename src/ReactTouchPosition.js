import React, {
    Children,
    cloneElement,
    PropTypes
} from 'react';
import noop from 'lodash.noop';
import omit from 'lodash.omit';

export default React.createClass({

    displayName: 'TouchPosition',

    getInitialState() {
        return {
            isActive: false,
            isTouchOutside: false,
            touchPosition: {
                x: 0,
                y: 0
            }
        };
    },

    propTypes: {
        children: PropTypes.any,
        className: PropTypes.string,
        isActivatedOnTouch: PropTypes.bool,
        mapPropNames: PropTypes.func,
        onActivationChanged: PropTypes.func,
        onPositionChanged: PropTypes.func,
        onTouchOutside: PropTypes.func,
        pressDuration: PropTypes.number,
        pressMoveThreshold: PropTypes.number,
        shouldDecorateChildren: PropTypes.bool,
        style: PropTypes.object
    },

    getDefaultProps() {
        return {
            isActivatedOnTouch: false,
            mapPropNames: ({ isActive, isTouchOutside, touchPosition }) => {
                return arguments[0];
            },
            onActivationChanged: noop,
            onPositionChanged: noop,
            pressDuration: 500,
            pressMoveThreshold: 5,
            shouldDecorateChildren: true
        };
    },

    onTouchStart(e) {
        this.elementOffsetRect = this.getViewportRelativeElementRect(e.currentTarget);
        this.setPosition(e);

        if (this.props.isActivatedOnTouch) {
            e.preventDefault();

            this.setState({
                isActive: true
            });

            return;
        }

        this.initPressEventCriteria(e.touches[0]);

        this.setPressEventTimer()
    },

    onTouchMove(e) {
        this.setPressEventCriteria(e.touches[0]);

        if (!this.state.isActive) {
            return;
        }

        this.setPosition(e);

        e.preventDefault();
    },

    unsetIsActive() {
        this.clearTimers();

        this.setState({
            isActive: false,
            isTouchOutside: false
        });

        this.props.onActivationChanged({ isActive: false });
    },

    setPosition(e) {
        const viewportRelativeTouchPosition = this.getViewportRelativeTouchPosition(e);
        const elementOffsetRect = this.elementOffsetRect;
        const touchPosition = this.getElementRelativeTouchPosition(viewportRelativeTouchPosition, elementOffsetRect);
        const isPositionOutside = this.getIsPositionOutside(viewportRelativeTouchPosition, elementOffsetRect);

        this.setState({
            touchPosition,
            isPositionOutside
        });

        this.props.onPositionChanged(Object.assign({ isPositionOutside }, touchPosition));
    },

    setPressEventTimer() {
        this.pressDurationTimerId = setTimeout(() => {
            if (Math.abs(this.currentElTop - this.initialElTop) < this.props.pressMoveThreshold) {
                this.setState({ isActive: true });
                this.props.onActivationChanged({ isActive: true });
            }
        }, this.props.pressDuration);
    },

    setPressEventCriteria(touch) {
        if (!this.props.isActivatedOnTouch) {
            if (!this.state.isActive) {
                this.currentElTop = touch.clientY;
            } else {
                this.initialElTop = touch.clientY;
            }
        }
    },

    initPressEventCriteria(touch) {
        const top = touch.clientY;
        this.initialElTop = top;
        this.currentElTop = top;
    },

    getViewportRelativeElementRect(el) {
        return el.getBoundingClientRect();
    },

    getIsPositionOutside(viewportRelativeTouchPosition, elementOffsetRect) {
        const { x: viewportRelativeTouchX, y: viewportRelativeTouchY } = viewportRelativeTouchPosition;
        const {
            top: offsetTop,
            right: offsetRight,
            bottom: offsetBottom,
            left: offsetLeft
        } = elementOffsetRect;
        return (
            viewportRelativeTouchX < offsetLeft ||
            viewportRelativeTouchX > offsetRight ||
            viewportRelativeTouchY < offsetTop ||
            viewportRelativeTouchY > offsetBottom
        );
    },

    getViewportRelativeTouchPosition(event) {
        const touch = event.touches[0];
        return {
            x: touch.clientX,
            y: touch.clientY
        }
    },

    getElementRelativeTouchPosition(viewportRelativetouchPosition, elementOffsetRect) {
        const { x: touchX, y: touchY } = viewportRelativetouchPosition;
        const { left: offsetX, top: offsetY } = elementOffsetRect;

        return {
            x: touchX - offsetX,
            y: touchY - offsetY
        };
    },

    isReactComponent(reactElement) {
        return typeof reactElement.type === 'function';
    },

    shouldDecorateChild(child) {
        return this.isReactComponent(child) && this.props.shouldDecorateChildren;
    },

    decorateChild(child, props) {
        return cloneElement(child, props);
    },

    decorateChildren(children, props) {
        return Children.map(children, (child) => {
            return this.shouldDecorateChild(child) ? this.decorateChild(child, props) : child;
        });
    },

    clearTimers() {
        clearTimeout(this.pressDurationTimerId);
    },

    componentWillUnmount() {
        this.clearTimers();
    },

    getPassThroughProps() {
        const ownPropNames = Object.keys(this.constructor.propTypes);
        return omit(this.props, ownPropNames)
    },

    render() {
        const { children, className, mapPropNames, style } = this.props;
        const { isActive, isTouchOutside, touchPosition } = this.state;
        const props = Object.assign(
            {},
            mapPropNames({
                isActive,
                isTouchOutside,
                touchPosition
            }),
            this.getPassThroughProps()
        );

        return (
            <div { ...{
                onTouchStart: this.onTouchStart,
                onTouchMove: this.onTouchMove,
                onTouchEnd: this.unsetIsActive,
                onTouchCancel: this.unsetIsActive,
                className,
                style: Object.assign({}, style, {
                    WebkitUserSelect: 'none'
                })
            }}>
                { this.decorateChildren(children, props) }
            </div>
        );
    }
});
