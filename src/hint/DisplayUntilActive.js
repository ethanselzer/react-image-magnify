import React from 'react';
import PropTypes from 'prop-types';

export default class DisplayUntilActive extends React.Component {
    constructor(props) {
        super(props);

        this.hasShown = false;
    }

    static propTypes = {
        children: PropTypes.element,
        isActive: PropTypes.bool,
        shouldHideAfterFirstActivation: PropTypes.bool
    };

    static defaultProps = {
        shouldHideAfterFirstActivation: true
    };

    setHasShown() {
        this.hasShown = true;
    }

    render () {
        const {
            props: {
                children,
                isActive,
                shouldHideAfterFirstActivation
            },
            hasShown,
        } = this;
        const shouldShow = !isActive && (!hasShown || !shouldHideAfterFirstActivation);

        if (isActive && !hasShown) {
            this.setHasShown();
        }

        return shouldShow ? children : null;
    }
}
