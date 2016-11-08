import React, {
    Children,
    cloneElement,
    PropTypes
} from 'react';
import assign from 'lodash.assign';
import noop from 'lodash.noop';
import omit from 'lodash.omit';

export default React.createClass({

    displayName: 'TouchPosition',

    getInitialState() {
        return {
            isHovering: false,
            isTouchOutside: false,
            cursorPosition: {
                x: 0,
                y: 0
            }
        };
    },

    propTypes: {
        className: PropTypes.string,
        isActivatedOnTouch: PropTypes.bool,
        onActivationChanged: PropTypes.func,
        onPositionChanged: PropTypes.func,
        pressDuration: PropTypes.number,
        pressMoveThreshold: PropTypes.number,
        shouldDecorateChildren: PropTypes.bool,
        style: PropTypes.object
    },

    getDefaultProps() {
        return {
            isActivatedOnTouch: false,
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
                isHovering: true
            });

            return;
        }

        this.initPressEventCriteria(e.touches[0]);

        this.setPressEventTimer()
    },

    onTouchMove(e) {
        this.setPressEventCriteria(e.touches[0]);

        if (!this.state.isHovering) {
            return;
        }

        this.setPosition(e);

        e.preventDefault();
    },

    onTouchEnd() {
        this.clearTimers();

        this.setState({
            isHovering: false,
            isTouchOutside: false
        });

        this.props.onActivationChanged({ isHovering: false });
    },

    setPosition(e) {
        const viewportRelativeTouchPosition = this.getViewportRelativeTouchPosition(e);
        const elementOffsetRect = this.elementOffsetRect;
        const cursorPosition = this.getElementRelativeTouchPosition(viewportRelativeTouchPosition, elementOffsetRect);
        const isPositionOutside = this.getIsPositionOutside(viewportRelativeTouchPosition, elementOffsetRect);

        this.setState({
            cursorPosition,
            isPositionOutside
        });

        this.props.onPositionChanged(Object.assign({ isPositionOutside }, cursorPosition));
    },

    setPressEventTimer() {
        this.pressDurationTimerId = setTimeout(() => {
            if (Math.abs(this.currentElTop - this.initialElTop) < this.props.pressMoveThreshold) {
                this.setState({ isHovering: true });
                this.props.onActivationChanged({ isHovering: true });
            }
        }, this.props.pressDuration);
    },

    setPressEventCriteria(touch) {
        if (!this.props.isActivatedOnTouch) {
            if (!this.state.isHovering) {
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

    renderChildrenWithProps(children, props) {
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

    render() {
        const { children, className, style } = this.props;
        const { isHovering, isTouchOutside, cursorPosition } = this.state;
        const childProps = assign(
            {},
            {
                isHovering,
                isTouchOutside,
                cursorPosition
            },
            omit(this.props, [
                'children',
                'className',
                'isActivatedOnTouch',
                'onActivationChanged',
                'onPositionChanged',
                'onTouchOutside',
                'pressDuration',
                'pressMoveThreshold',
                'shouldDecorateChildren',
                'style'
            ])
        );

        return (
            <div { ...{
                onTouchStart: this.onTouchStart,
                onTouchMove: this.onTouchMove,
                onTouchEnd: this.onTouchEnd,
                className,
                style: Object.assign({}, style, {
                    WebkitUserSelect: 'none'
                })
            }}>
                { this.renderChildrenWithProps(children, childProps) }
            </div>
        );
    }
});
