import React from 'react';
import clamp from 'lodash.clamp';

export default React.createClass({

    displayName: 'EnlargedImage',

    getInitialState() {
        return {
            isTransitionEntering: false,
            isTransitionActive: false,
            isTransitionLeaving: false,
            isTransitionDone: false
        };
    },

    getDefaultPRops() {
        return {
            fadeDurationInMs: 0
        };
    },

    componentWillReceiveProps(nextProps) {
        const { isHovering } = nextProps;

        if (isHovering) {
            this.setState({
                isTransitionEntering: true
            });

            setTimeout(() => {
                this.setState({
                    isTransitionEntering: false,
                    isTransitionActive: true
                });
            }, 0);
        } else {
            this.setState({
                isTransitionActive: false,
                isTransitionLeaving: true
            });

            setTimeout(() => {
                this.setState({
                    isTransitionLeaving: false,
                    isTransitionDone: true
                });
            }, this.props.fadeDurationInMs);
        }
    },

    render() {
        const {
            className,
            cursorOffset,
            cursorPosition,
            fadeDurationInMs,
            isHovering,
            largeImage,
            smallImage
        } = this.props;

        const {
            isTransitionEntering,
            isTransitionActive,
            isTransitionLeaving
        } = this.state;

        const offsetRatio = {
            x: largeImage.width / smallImage.width,
            y: largeImage.height / smallImage.height
        };

        const differentiatedImageCoordinates = {
            x: (Math.round((cursorPosition.x - cursorOffset.x) * offsetRatio.x) * -1),
            y: (Math.round((cursorPosition.y - cursorOffset.y) * offsetRatio.y) * -1)
        };

        const minCoordinates = {
            x: ((largeImage.width - smallImage.width) * -1),
            y: ((largeImage.height - smallImage.height) * -1)
        };

        const maxCoordinate = 0;

        const imageCoordinates = {
            x: clamp(differentiatedImageCoordinates.x, minCoordinates.x, maxCoordinate),
            y: clamp(differentiatedImageCoordinates.y, minCoordinates.y, maxCoordinate)
        };

        const translate = `translate(${imageCoordinates.x}px, ${imageCoordinates.y}px)`;

        let isVisible;
        if (isTransitionEntering || isTransitionActive || isTransitionLeaving) {
            isVisible = true;
        } else {
            isVisible = false;
        }

        const component = (
            <div { ...{
                className,
                key: 'zoom',
                style: {
                    width: smallImage.width,
                    height: smallImage.height,
                    marginLeft: '10px',
                    position: 'absolute',
                    left: '100%',
                    top: '0px',
                    border: '1px solid #d6d6d6',
                    overflow: 'hidden',
                    opacity: this.state.isTransitionActive ? 1 : 0,
                    transition: `opacity ${fadeDurationInMs}ms ease-in`
                }
            }}>
                <img data-hover="false" { ...{
                    src: largeImage.src,
                    style: {
                        width: largeImage.width,
                        height: largeImage.height,
                        transform: translate,
                        WebkitTransform: translate,
                        msTransform: translate
                    }
                }}/>
            </div>
        );

        return isVisible ? component : null;
    }
});
