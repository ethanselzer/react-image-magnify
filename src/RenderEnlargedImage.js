import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import objectAssign from 'object-assign';
import EnlargedImage from './EnlargedImage';

export default class RenderEnlargedImage extends Component {
    static propTypes = {
        isPortalEnabledForTouch: PropTypes.bool.isRequired,
        isTouchDetected: PropTypes.bool.isRequired,
        portalId: PropTypes.string
    }

    state = { isMounted: false }

    componentDidMount() {
        this.setState({ isMounted: true });

        if (this.isPortalRendered) {
            const { portalId } = this.props;
            this.portalElement = document.getElementById(portalId);
        }
    }

    get isPortalIdImplemented() {
        return !!this.props.portalId;
    }

    get isPortalRendered() {
        const {
            isPortalEnabledForTouch,
            isTouchDetected
        } = this.props;

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

    get isMounted() {
        return this.state.isMounted;
    }

    get compositProps() {
        return objectAssign(
            {},
            this.props,
            { isPortalRendered: this.isPortalRendered }
        );
    }

    render() {
        if (!this.isMounted) {
            return null;
        }

        const props = this.compositProps;

        if (this.isPortalRendered) {
            return ReactDOM.createPortal(
                <EnlargedImage {...props} />,
                this.portalElement
            );
        }

        return (
            <EnlargedImage {...props} />
        );
    }
}
